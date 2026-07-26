export type PageSeo = {
  path: string;
  title: string;
  description: string;
  priority: number;
};

export const HOME_SEO: PageSeo = {
  path: "/",
  title: "Nota — Suivi client simple, sans inscription",
  description:
    "Nota rassemble vos clients, notes et rappels. Voyez où en est chaque affaire. Sans compte, accès immédiat.",
  priority: 1,
};

export const CRM_SANS_INSCRIPTION_SEO: PageSeo = {
  path: "/crm-sans-inscription",
  title: "CRM sans inscription — Ouvrir Nota immédiatement",
  description:
    "Suivez vos clients sans créer de compte. Notes, étapes d’affaire et rappels dans Nota — en un clic.",
  priority: 0.9,
};

export const ALTERNATIVE_EXCEL_SEO: PageSeo = {
  path: "/alternative-excel-commercial",
  title: "Alternative Excel commercial — Nota, le suivi client simple",
  description:
    "Fatigué du tableur pour clients et rappels ? Nota les rassemble, étape par étape. Sans inscription.",
  priority: 0.9,
};

export const ALL_PAGES: PageSeo[] = [HOME_SEO, CRM_SANS_INSCRIPTION_SEO, ALTERNATIVE_EXCEL_SEO];
