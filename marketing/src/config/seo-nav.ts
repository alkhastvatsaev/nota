import type { Locale } from "../i18n/types";

type NavLink = { to: string; label: string };

const SEO_NAV_FR: NavLink[] = [
  { to: "/logiciel-interventions-terrain", label: "Interventions terrain" },
  { to: "/interventions-terrain", label: "Gestion terrain" },
  { to: "/gestion-interventions", label: "Gestion interventions" },
  { to: "/planning-techniciens", label: "Planning technicien" },
  { to: "/facturation-interventions", label: "Facturation" },
  { to: "/pour-qui", label: "Pour qui" },
  { to: "/excel-vs-logiciel-interventions", label: "Excel vs logiciel" },
  { to: "/guides/excel-vers-logiciel-interventions", label: "Guide Excel → logiciel" },
  { to: "/crm-sans-inscription", label: "CRM sans inscription" },
  { to: "/alternative-excel-commercial", label: "Alternative Excel" },
  { to: "/installer-nota", label: "Installer l’app" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
  { to: "/ressources/checklist-interventions-terrain", label: "Checklist terrain" },
];

const SEO_NAV_EN: NavLink[] = [
  { to: "/logiciel-interventions-terrain", label: "Field software" },
  { to: "/interventions-terrain", label: "Field jobs" },
  { to: "/gestion-interventions", label: "Job management" },
  { to: "/planning-techniciens", label: "Technician planning" },
  { to: "/facturation-interventions", label: "Billing" },
  { to: "/pour-qui", label: "Who it’s for" },
  { to: "/excel-vs-logiciel-interventions", label: "Excel vs software" },
  { to: "/guides/excel-vers-logiciel-interventions", label: "Excel → software guide" },
  { to: "/crm-sans-inscription", label: "CRM without sign-up" },
  { to: "/alternative-excel-commercial", label: "Spreadsheet alternative" },
  { to: "/installer-nota", label: "Install the app" },
  { to: "/a-propos", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/ressources/checklist-interventions-terrain", label: "Field checklist" },
];

export function getSeoNavLinks(locale: Locale): NavLink[] {
  return locale === "en" ? SEO_NAV_EN : SEO_NAV_FR;
}

/** @deprecated Prefer getSeoNavLinks(locale). */
export const SEO_NAV_LINKS = SEO_NAV_FR;
