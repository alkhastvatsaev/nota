import { FOUNDER_PROFILE_PATH } from "./founder";
import type { Locale } from "../i18n/types";
import { GUIDE_PAGES_EN, GUIDE_PAGES_FR } from "../content/guides-i18n";
import { LANDING_PAGES_EN } from "../content/landing-pages.en";
import { LANDING_PAGES_FR } from "../content/landing-pages.fr";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  priority: number;
};

function seoFromContent(path: string, title: string, lead: string, priority: number): PageSeo {
  const shortTitle = title.length > 58 ? `${title.slice(0, 55)}…` : title;
  const description = lead.length > 158 ? `${lead.slice(0, 155)}…` : lead;
  return {
    path,
    title: `${shortTitle} — Nota`,
    description,
    priority,
  };
}

const HOME_FR: PageSeo = {
  path: "/",
  title: "Nota CRM — interventions terrain (carte, mobile, facturation)",
  description:
    "Nota CRM : carte des missions, mobile technicien et facturation. App sur app.heynota.app. Développé par Alkhast Vatsaev.",
  priority: 1,
};

const HOME_EN: PageSeo = {
  path: "/",
  title: "Nota CRM — field service (map, mobile, billing)",
  description:
    "Nota CRM: live job map, technician mobile and billing. App at app.heynota.app. Built by Alkhast Vatsaev.",
  priority: 1,
};

const FOUNDER_FR: PageSeo = {
  path: FOUNDER_PROFILE_PATH,
  title: "Alkhast Vatsaev — a développé Nota CRM",
  description:
    "Alkhast Vatsaev a développé Nota CRM (heynota.app) : carte des missions, hub technicien mobile et facturation pour les interventions terrain.",
  priority: 0.95,
};

const FOUNDER_EN: PageSeo = {
  path: FOUNDER_PROFILE_PATH,
  title: "Alkhast Vatsaev — built Nota CRM",
  description:
    "Alkhast Vatsaev built Nota CRM (heynota.app): job map, mobile technician hub and billing for field service teams.",
  priority: 0.95,
};

const CRM_FR: PageSeo = {
  path: "/crm-sans-inscription",
  title: "CRM sans inscription — Ouvrir Nota immédiatement",
  description:
    "Suivez interventions et clients sans créer de compte sur heynota.app. Notes, étapes et rappels — ouverture directe de l’app Nota.",
  priority: 0.9,
};

const CRM_EN: PageSeo = {
  path: "/crm-sans-inscription",
  title: "CRM without sign-up — Open Nota now",
  description:
    "Track jobs and clients without creating an account on heynota.app. Notes, steps and reminders — open the Nota app directly.",
  priority: 0.9,
};

const EXCEL_FR: PageSeo = {
  path: "/alternative-excel-commercial",
  title: "Alternative Excel commercial — Nota pour le terrain",
  description:
    "Remplacez le tableur pour vos interventions : carte, techniciens et dossiers au même endroit. Essai via accès direct Nota.",
  priority: 0.85,
};

const EXCEL_EN: PageSeo = {
  path: "/alternative-excel-commercial",
  title: "Spreadsheet alternative — Nota for the field",
  description:
    "Replace the spreadsheet for field jobs: map, technicians and cases in one place. Try via direct Nota access.",
  priority: 0.85,
};

function buildAllPages(locale: Locale): PageSeo[] {
  const landings = (locale === "en" ? LANDING_PAGES_EN : LANDING_PAGES_FR).filter(
    (page) => page.path !== FOUNDER_PROFILE_PATH
  );
  const guides = locale === "en" ? GUIDE_PAGES_EN : GUIDE_PAGES_FR;
  const landingSeo = landings.map((page) =>
    seoFromContent(
      page.path,
      page.title,
      page.lead,
      page.path === "/logiciel-interventions-terrain" ? 0.95 : 0.8
    )
  );
  const guideSeo = guides.map((page) => seoFromContent(page.path, page.title, page.lead, 0.75));
  return [
    locale === "en" ? HOME_EN : HOME_FR,
    locale === "en" ? FOUNDER_EN : FOUNDER_FR,
    ...landingSeo,
    ...guideSeo,
    locale === "en" ? CRM_EN : CRM_FR,
    locale === "en" ? EXCEL_EN : EXCEL_FR,
  ];
}

export function getHomeSeo(locale: Locale): PageSeo {
  return locale === "en" ? HOME_EN : HOME_FR;
}

export function getAllPages(locale: Locale): PageSeo[] {
  return buildAllPages(locale);
}

/** Build / sitemap — FR canonique pour crawl Google FR. */
export const HOME_SEO = HOME_FR;
export const FOUNDER_PROFILE_SEO = FOUNDER_FR;
export const CRM_SANS_INSCRIPTION_SEO = CRM_FR;
export const ALTERNATIVE_EXCEL_SEO = EXCEL_FR;
export const ALL_PAGES = buildAllPages("fr");
