/** URL canonique du site marketing (Search Console / sitemap / Open Graph). */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://heynota.app").replace(/\/$/, "");

/** URL de l’app CRM (accès direct, sans inscription sur le site). */
export const APP_URL = (import.meta.env.VITE_APP_URL ?? "https://app.heynota.app").replace(
  /\/$/,
  ""
);

export const SITE_NAME = "Nota";

export const CTA_LABEL = "Ouvrir Nota";

export const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION ?? "";

/** ID mesure GA4 (ex. G-XXXXXXXX). Vide = pas de script analytics. */
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? "";
