export type PageSeo = {
  path: string;
  title: string;
  description: string;
  priority: number;
};

export const HOME_SEO: PageSeo = {
  path: "/",
  title: "Nota — Ce qui compte pour vous, en clair",
  description:
    "Vos relations, votre temps, la suite au bon moment. Ouvrez Nota — sans compte, tout de suite.",
  priority: 1,
};

export const CRM_SANS_INSCRIPTION_SEO: PageSeo = {
  path: "/crm-sans-inscription",
  title: "CRM sans inscription — À vous, tout de suite",
  description:
    "Vous voulez suivre vos clients sans formulaire ? Ouvrez Nota en un clic. C’est à vous.",
  priority: 0.9,
};

export const ALTERNATIVE_EXCEL_SEO: PageSeo = {
  path: "/alternative-excel-commercial",
  title: "Alternative Excel commercial — Nota, simple pour vous",
  description:
    "Vous méritez mieux qu’un tableur perdu. Nota met vos affaires sous les yeux — sans inscription.",
  priority: 0.9,
};

export const ALL_PAGES: PageSeo[] = [HOME_SEO, CRM_SANS_INSCRIPTION_SEO, ALTERNATIVE_EXCEL_SEO];
