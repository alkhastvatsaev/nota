import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { FAQ_ITEMS } from "./src/content/faq";
import { ALL_PAGES, HOME_SEO } from "./src/config/pages-data";
import { FOUNDER_PROFILE_PATH } from "./src/config/founder";
import { buildFounderPersonNode, organizationFounderFields } from "./src/config/jsonLdFounder";
import { LANDING_PAGES_FR } from "./src/content/landing-pages.fr";
import { GUIDE_PAGES_FR } from "./src/content/guides-i18n";
import {
  getCrmSansInscriptionContent,
  getAlternativeExcelContent,
} from "./src/content/special-pages";
import { getChecklistContent } from "./src/content/asset-checklist";

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

function blocksFromSections(
  sections: { h2: string; paragraphs?: string[]; bullets?: string[]; ordered?: string[] }[]
) {
  return sections.flatMap((s) => [
    s.h2,
    ...(s.paragraphs ?? []),
    ...(s.bullets ?? []),
    ...(s.ordered ?? []),
  ]);
}

function buildPrerenderSnapshot() {
  return ALL_PAGES.map((page) => {
    let h1 = page.title.split(" — ")[0] ?? page.title;
    let lead = page.description;
    let blocks: string[] = [];

    if (page.path === "/") {
      h1 = "Nota CRM — interventions terrain";
      lead =
        "Nota CRM : carte des missions, hub technicien mobile et facturation. Développé par Alkhast Vatsaev.";
      blocks = [
        "Ouvrez l’app sur app.heynota.app — sans inscription sur heynota.app.",
        "Alkhast Vatsaev a développé Nota CRM.",
      ];
    } else {
      const landing = LANDING_PAGES_FR.find((p) => p.path === page.path);
      const guide = GUIDE_PAGES_FR.find((p) => p.path === page.path);
      if (landing) {
        h1 = landing.title;
        lead = landing.lead;
        blocks = blocksFromSections(landing.sections);
      } else if (guide) {
        h1 = guide.title;
        lead = guide.lead;
        blocks = blocksFromSections(guide.sections);
      } else if (page.path === "/crm-sans-inscription") {
        const c = getCrmSansInscriptionContent("fr");
        h1 = c.title;
        lead = c.lead;
        blocks = blocksFromSections(c.sections);
      } else if (page.path === "/alternative-excel-commercial") {
        const c = getAlternativeExcelContent("fr");
        h1 = c.title;
        lead = c.lead;
        blocks = blocksFromSections(c.sections);
      } else if (page.path === "/contact") {
        h1 = "Contact Alkhast Vatsaev — fondateur de Nota CRM";
        lead =
          "Contactez Alkhast Vatsaev, qui a développé Nota CRM. Email : alkhastvatsaev@icloud.com";
        blocks = ["Formulaire sur heynota.app/contact", "Nota CRM — app.heynota.app"];
      } else if (page.path === "/ressources/checklist-interventions-terrain") {
        const c = getChecklistContent("fr");
        h1 = c.title;
        lead = c.lead;
        blocks = c.sections.flatMap((s) => [s.h2, ...s.items]);
      }
    }

    return {
      path: page.path,
      title: page.title,
      description: page.description,
      h1,
      lead,
      blocks,
    };
  });
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
      const outDir = resolve("dist");
      mkdirSync(outDir, { recursive: true });
      writeFileSync(
        resolve(outDir, "prerender-pages.json"),
        JSON.stringify(buildPrerenderSnapshot(), null, 2)
      );
      const src = resolve("public/404.html");
      if (existsSync(src)) {
        const raw = readFileSync(src, "utf8").replaceAll("%SITE_URL%", siteUrl);
        writeFileSync(resolve(outDir, "404.html"), raw);
      }
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
