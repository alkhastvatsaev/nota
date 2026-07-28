import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { FAQ_ITEMS } from "./src/content/faq";
import { ALL_PAGES, HOME_SEO } from "./src/config/pages-data";
import { FOUNDER_PROFILE_PATH } from "./src/config/founder";
import { buildFounderPersonNode, organizationFounderFields } from "./src/config/jsonLdFounder";

function siteUrlFromEnv(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  return (env.VITE_SITE_URL || "https://heynota.app").replace(/\/$/, "");
}

function appUrlFromEnv(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  return (env.VITE_APP_URL || "https://app.heynota.app").replace(/\/$/, "");
}

function gaSnippetFromEnv(mode: string) {
  const id = loadEnv(mode, process.cwd(), "").VITE_GA_MEASUREMENT_ID?.trim();
  if (!id) return "";
  return (
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>` +
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
    `gtag("js",new Date());gtag("config","${id}",{send_page_view:false});</script>`
  );
}

function locFor(siteUrl: string, path: string) {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

function buildStaticJsonLd(siteUrl: string, appUrl: string) {
  const dateModified = new Date().toISOString().slice(0, 10);
  const description = HOME_SEO.description;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Nota",
        description: "Nota CRM — interventions terrain : carte, techniciens, facturation.",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/apple-touch-icon.png`,
          width: 180,
          height: 180,
        },
        image: `${siteUrl}/og-image.png`,
        ...organizationFounderFields(siteUrl),
      },
      buildFounderPersonNode(siteUrl),
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Nota CRM",
        alternateName: "Nota",
        description,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "fr-FR",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: HOME_SEO.title,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#software` },
        author: { "@id": `${siteUrl}${FOUNDER_PROFILE_PATH}#person` },
        description,
        inLanguage: "fr-FR",
        dateModified,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "Nota",
        alternateName: "Nota CRM",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Customer Relationship Management",
        operatingSystem: "Web",
        url: appUrl,
        description:
          "Nota CRM : carte des interventions, hub technicien mobile, dossiers et facturation. Accès direct.",
        inLanguage: "fr-FR",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: appUrl,
          description: "Accès direct à Nota, sans inscription",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

function seoFilesPlugin(mode: string) {
  const siteUrl = siteUrlFromEnv(mode);
  const appUrl = appUrlFromEnv(mode);
  const gaSnippet = gaSnippetFromEnv(mode);
  const today = new Date().toISOString().slice(0, 10);

  const writeSeoFiles = () => {
    writeFileSync(
      resolve("public/robots.txt"),
      `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    );

    const urls = ALL_PAGES.map(
      (page) =>
        `  <url>\n` +
        `    <loc>${locFor(siteUrl, page.path)}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `  </url>`
    ).join("\n");

    writeFileSync(
      resolve("public/sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `${urls}\n` +
        `</urlset>\n`
    );
  };

  return {
    name: "nota-seo-files",
    buildStart() {
      writeSeoFiles();
    },
    configureServer() {
      writeSeoFiles();
    },
    closeBundle() {
      const src = resolve("public/404.html");
      if (!existsSync(src)) return;
      const outDir = resolve("dist");
      mkdirSync(outDir, { recursive: true });
      const raw = readFileSync(src, "utf8").replaceAll("%SITE_URL%", siteUrl);
      writeFileSync(resolve(outDir, "404.html"), raw);
    },
    transformIndexHtml: {
      order: "pre",
      handler(html: string) {
        const withUrls = html
          .replaceAll("%SITE_URL%", siteUrl)
          .replaceAll("%APP_URL%", appUrl)
          .replaceAll("%SITE_TITLE%", HOME_SEO.title)
          .replaceAll("%SITE_DESCRIPTION%", HOME_SEO.description)
          .replaceAll("%GA_SNIPPET%", gaSnippet);
        const jsonLd = JSON.stringify(buildStaticJsonLd(siteUrl, appUrl));
        return withUrls.replace(
          /<script type="application\/ld\+json" id="nota-jsonld">[\s\S]*?<\/script>/,
          `<script type="application/ld+json" id="nota-jsonld">${jsonLd}</script>`
        );
      },
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), seoFilesPlugin(mode)],
  build: {
    cssCodeSplit: true,
    modulePreload: true,
  },
  preview: {
    // SPA fallback pour tester les routes en local
  },
  appType: "spa",
}));
