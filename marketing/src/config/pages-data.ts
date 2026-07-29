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
    "Nota CRM : carte des missions, hub technicien mobile et facturation pour les entreprises qui interviennent chez leurs clients. App sur app.heynota.app.",
  priority: 1,
};

const HOME_EN: PageSeo = {
  path: "/",
  title: "Nota CRM — field service (map, mobile, billing)",
  description:
    "Nota CRM: live job map, mobile technician hub and billing for companies with on-site work. App at app.heynota.app.",
  priority: 1,
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

const CONTACT_FR: PageSeo = {
  path: "/contact",
  title: "Contact Nota CRM",
  description: "Contactez l’équipe Nota CRM. Formulaire ou email : alkhastvatsaev@icloud.com.",
  priority: 0.9,
};

const CONTACT_EN: PageSeo = {
  path: "/contact",
  title: "Contact Nota CRM",
  description: "Contact the Nota CRM team. Form or email: alkhastvatsaev@icloud.com.",
  priority: 0.9,
};

const CHECKLIST_FR: PageSeo = {
  path: "/ressources/checklist-interventions-terrain",
  title: "Checklist interventions terrain 2026 — Excel vs Nota CRM",
  description:
    "Grille pour décider si un tableur suffit encore : avant, pendant, après mission + signaux qu’Excel ne suffit plus. Imprimable / PDF.",
  priority: 0.92,
};

const CHECKLIST_EN: PageSeo = {
  path: "/ressources/checklist-interventions-terrain",
  title: "2026 field-job checklist — Spreadsheet vs Nota CRM",
  description:
    "Grid to decide if a spreadsheet still works: before, during, after jobs + signs you need field software. Printable / PDF.",
  priority: 0.92,
};

function buildAllPages(locale: Locale): PageSeo[] {
  const landings = locale === "en" ? LANDING_PAGES_EN : LANDING_PAGES_FR;
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
    ...landingSeo,
    ...guideSeo,
    locale === "en" ? CRM_EN : CRM_FR,
    locale === "en" ? EXCEL_EN : EXCEL_FR,
    locale === "en" ? CONTACT_EN : CONTACT_FR,
    locale === "en" ? CHECKLIST_EN : CHECKLIST_FR,
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
export const CRM_SANS_INSCRIPTION_SEO = CRM_FR;
export const ALTERNATIVE_EXCEL_SEO = EXCEL_FR;
export const ALL_PAGES = buildAllPages("fr");
