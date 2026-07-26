import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FAQ_ITEMS } from "../content/faq";
import {
  absoluteUrl,
  ALL_PAGES,
  APP_URL,
  HOME_SEO,
  SITE_NAME,
  SITE_URL,
  type PageSeo,
} from "../config/pages";
import { GOOGLE_SITE_VERIFICATION } from "../config/site";

const GRAPH_SCRIPT_ID = "nota-jsonld";

const NOT_FOUND_SEO: PageSeo = {
  path: "/404",
  title: "Page introuvable — Nota",
  description: "Cette page n’existe pas. Revenez à l’accueil Nota ou ouvrez l’application.",
  priority: 0,
};

function resolvePage(pathname: string): { page: PageSeo; known: boolean } {
  const clean = pathname.replace(/\/$/, "") || "/";
  const found = ALL_PAGES.find((p) => (p.path === "/" ? clean === "/" : p.path === clean));
  if (found) return { page: found, known: true };
  return { page: NOT_FOUND_SEO, known: false };
}

function setMeta(property: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function buildJsonLd(page: PageSeo, known: boolean) {
  if (!known) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
      ],
    };
  }

  const dateModified = new Date().toISOString().slice(0, 10);
  const url = absoluteUrl(page.path);
  const isHome = page.path === "/";

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: "Suivi client simple : notes, affaires, rappels.",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/apple-touch-icon.png`,
        width: 180,
        height: 180,
      },
      image: `${SITE_URL}/og-image.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: HOME_SEO.description,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "fr-FR",
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      description: page.description,
      inLanguage: "fr-FR",
      dateModified,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Customer Relationship Management",
      operatingSystem: "Web",
      url: APP_URL,
      description:
        "Nota rassemble clients, notes et rappels. Voyez où en est chaque affaire. Sans compte.",
      inLanguage: "fr-FR",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: APP_URL,
        description: "Accès direct à Nota, sans inscription",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: isHome
        ? [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: `${SITE_URL}/`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: `${SITE_URL}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: page.title.split(" — ")[0] ?? page.title,
              item: url,
            },
          ],
    },
  ];

  if (isHome) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function SeoHead() {
  const { pathname } = useLocation();
  const { page, known } = resolvePage(pathname);

  useEffect(() => {
    document.documentElement.lang = "fr";
    document.title = page.title;

    setMeta("description", page.description);
    setMeta(
      "robots",
      known
        ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        : "noindex, follow"
    );
    setMeta("og:title", page.title, "property");
    setMeta("og:description", page.description, "property");
    setMeta("og:url", known ? absoluteUrl(page.path) : `${SITE_URL}/`, "property");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);

    if (GOOGLE_SITE_VERIFICATION) {
      setMeta("google-site-verification", GOOGLE_SITE_VERIFICATION);
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = known ? absoluteUrl(page.path) : `${SITE_URL}/`;

    let script = document.getElementById(GRAPH_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = GRAPH_SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildJsonLd(page, known));
  }, [page, known]);

  return null;
}
