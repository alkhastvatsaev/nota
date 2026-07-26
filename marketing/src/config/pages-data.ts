export type PageSeo = {
  path: string;
  title: string;
  description: string;
  priority: number;
};

export const HOME_SEO: PageSeo = {
  path: "/",
  title: "Nota — CRM pour clients, notes et relances",
  description:
    "Nota est un CRM simple : suivez vos clients, votre pipeline et vos relances. Sans compte, accès immédiat.",
  priority: 1,
};

export const CRM_SANS_INSCRIPTION_SEO: PageSeo = {
  path: "/crm-sans-inscription",
  title: "CRM sans inscription — Ouvrir Nota immédiatement",
  description:
    "Un CRM sans compte ni formulaire : clients, pipeline et relances. Ouvrez Nota en un clic.",
  priority: 0.9,
};

export const ALTERNATIVE_EXCEL_SEO: PageSeo = {
  path: "/alternative-excel-commercial",
  title: "Alternative Excel commercial — Nota, le suivi client simple",
  description:
    "Remplacez le tableur : pipeline commercial, notes client et relances dans Nota. Sans inscription.",
  priority: 0.9,
};

export const ALL_PAGES: PageSeo[] = [HOME_SEO, CRM_SANS_INSCRIPTION_SEO, ALTERNATIVE_EXCEL_SEO];
