import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFaqItems } from "../content/faq";
import { getGuideByPath } from "../content/guides";
import { getLandingByPath } from "../content/landing-pages";
import {
  absoluteUrl,
  getAllPages,
  getHomeSeo,
  APP_URL,
  SITE_NAME,
  SITE_URL,
  type PageSeo,
} from "../config/pages";
import { GOOGLE_SITE_VERIFICATION } from "../config/site";
import { FOUNDER_FULL_NAME, FOUNDER_PERSON_ID, NOTA_SAME_AS } from "../config/founder";
import { buildFounderPersonNode, organizationFounderFields } from "../config/jsonLdFounder";
import { useLocale } from "../i18n/LocaleContext";
import type { Locale } from "../i18n/types";
import { UI } from "../i18n/ui";

const GRAPH_SCRIPT_ID = "nota-jsonld";
const HREFLANG_SELECTOR = "link[data-nota-hreflang]";

function resolvePage(pathname: string, locale: Locale): { page: PageSeo; known: boolean } {
  const clean = pathname.replace(/\/$/, "") || "/";
  const found = getAllPages(locale).find((p) =>
    p.path === "/" ? clean === "/" : p.path === clean
  );
  if (found) return { page: found, known: true };
  const t = UI[locale];
  return {
    page: {
      path: "/404",
      title: t.notFoundSeoTitle,
      description: t.notFoundSeoDesc,
      priority: 0,
    },
    known: false,
  };
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

function upsertHreflang(known: boolean, path: string) {
  document.querySelectorAll(HREFLANG_SELECTOR).forEach((el) => el.remove());
  if (!known) return;

  const href = absoluteUrl(path);
  const tags: { hreflang: string; href: string }[] = [
    { hreflang: "fr", href: `${href}${href.includes("?") ? "&" : "?"}lang=fr` },
    { hreflang: "en", href: `${href}${href.includes("?") ? "&" : "?"}lang=en` },
    { hreflang: "x-default", href },
  ];

  for (const tag of tags) {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = tag.hreflang;
    link.href = tag.href;
    link.setAttribute("data-nota-hreflang", tag.hreflang);
    document.head.appendChild(link);
  }
}

function buildJsonLd(page: PageSeo, known: boolean, locale: Locale) {
  const t = UI[locale];
  const inLanguage = locale === "en" ? "en" : "fr-FR";
  const homeSeo = getHomeSeo(locale);

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
      alternateName: ["Nota CRM", "HeyNota"],
      url: `${SITE_URL}/`,
      description: t.orgDescription,
      sameAs: NOTA_SAME_AS,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/apple-touch-icon.png`,
        width: 180,
        height: 180,
      },
      image: `${SITE_URL}/og-image.png`,
      ...organizationFounderFields(SITE_URL),
    },
    buildFounderPersonNode(SITE_URL),
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: "Nota CRM",
      description: homeSeo.description,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage,
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      description: page.description,
      inLanguage,
      dateModified,
      ...(isHome
        ? {
            author: { "@id": FOUNDER_PERSON_ID },
            about: { "@id": `${SITE_URL}/#software` },
          }
        : {}),
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
      name: "Nota",
      alternateName: ["Nota CRM", "HeyNota", "heynota"],
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Customer Relationship Management",
      operatingSystem: "Web",
      url: SITE_URL,
      downloadUrl: APP_URL,
      description: t.softwareDescription,
      inLanguage,
      sameAs: NOTA_SAME_AS,
      author: { "@id": FOUNDER_PERSON_ID },
      creator: { "@id": FOUNDER_PERSON_ID },
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: APP_URL,
        description: t.offerDescription,
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
              name: t.homeBreadcrumb,
              item: `${SITE_URL}/`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 1,
              name: t.homeBreadcrumb,
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

  const cleanPath = page.path === "/" ? "/" : page.path;
  const faqItems = getFaqItems(locale);
  const landingFaq =
    getLandingByPath(locale).get(cleanPath)?.faq ??
    getGuideByPath(locale).get(cleanPath)?.faq ??
    [];
  const faqEntities =
    isHome && faqItems.length > 0 ? faqItems : landingFaq.length > 0 ? landingFaq : null;

  if (faqEntities) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqEntities.map((item) => ({
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
  const { locale } = useLocale();
  const { page, known } = resolvePage(pathname, locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    document.title = page.title;

    setMeta("description", page.description);
    setMeta("author", `${FOUNDER_FULL_NAME} · ${SITE_NAME}`);
    setMeta(
      "robots",
      known
        ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        : "noindex, follow"
    );
    setMeta("og:title", page.title, "property");
    setMeta("og:description", page.description, "property");
    setMeta("og:url", known ? absoluteUrl(page.path) : `${SITE_URL}/`, "property");
    setMeta("og:locale", locale === "en" ? "en_US" : "fr_FR", "property");
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

    upsertHreflang(known, page.path);

    let script = document.getElementById(GRAPH_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = GRAPH_SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildJsonLd(page, known, locale));
  }, [page, known, locale]);

  return null;
}
