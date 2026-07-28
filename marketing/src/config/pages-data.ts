import { GUIDE_PAGES } from "../content/guides";
import { LANDING_PAGES } from "../content/landing-pages";
import { FOUNDER_PROFILE_PATH } from "./founder";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  priority: number;
};

export const HOME_SEO: PageSeo = {
  path: "/",
  title: "Nota — CRM interventions terrain (carte, mobile, facturation)",
  description:
    "Carte, mobile technicien, dossiers et facturation pour entreprises en intervention. Accès direct à l’app Nota. Par Alkhast Vatsaev.",
  priority: 1,
};

export const FOUNDER_PROFILE_SEO: PageSeo = {
  path: FOUNDER_PROFILE_PATH,
  title: "Alkhast Vatsaev — Fondateur de Nota (CRM interventions)",
  description:
    "Alkhast Vatsaev conçoit Nota, CRM carte et mobile pour interventions terrain. Profil fondateur, produit heynota.app et app Nota.",
  priority: 0.92,
};

export const CRM_SANS_INSCRIPTION_SEO: PageSeo = {
  path: "/crm-sans-inscription",
  title: "CRM sans inscription — Ouvrir Nota immédiatement",
  description:
    "Suivez interventions et clients sans créer de compte sur heynota.app. Notes, étapes et rappels — ouverture directe de l’app Nota.",
  priority: 0.9,
};

export const ALTERNATIVE_EXCEL_SEO: PageSeo = {
  path: "/alternative-excel-commercial",
  title: "Alternative Excel commercial — Nota pour le terrain",
  description:
    "Remplacez le tableur pour vos interventions : carte, techniciens et dossiers au même endroit. Essai via accès direct Nota.",
  priority: 0.85,
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

const LANDING_SEO: PageSeo[] = LANDING_PAGES.filter(
  (page) => page.path !== FOUNDER_PROFILE_PATH
).map((page) =>
  seoFromContent(
    page.path,
    page.title,
    page.lead,
    page.path === "/logiciel-interventions-terrain" ? 0.95 : 0.8
  )
);

const GUIDE_SEO: PageSeo[] = GUIDE_PAGES.map((page) =>
  seoFromContent(page.path, page.title, page.lead, 0.75)
);

export const ALL_PAGES: PageSeo[] = [
  HOME_SEO,
  FOUNDER_PROFILE_SEO,
  ...LANDING_SEO,
  ...GUIDE_SEO,
  CRM_SANS_INSCRIPTION_SEO,
  ALTERNATIVE_EXCEL_SEO,
];
