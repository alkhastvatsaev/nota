import type { Locale } from "../i18n/types";
import { LANDING_PAGES_EN } from "./landing-pages.en";
import { LANDING_PAGES_FR } from "./landing-pages.fr";
import type { LandingPageContent } from "./landing-types";

export type { LandingPageContent, LandingSection } from "./landing-types";

export function getLandingPages(locale: Locale): LandingPageContent[] {
  return locale === "en" ? LANDING_PAGES_EN : LANDING_PAGES_FR;
}

export function getLandingByPath(locale: Locale): Map<string, LandingPageContent> {
  return new Map(getLandingPages(locale).map((p) => [p.path, p]));
}

/** @deprecated Prefer getLandingPages(locale). */
export const LANDING_PAGES = LANDING_PAGES_FR;
export const LANDING_BY_PATH = new Map(LANDING_PAGES_FR.map((p) => [p.path, p]));

export const LEGACY_PATH_REDIRECTS: Record<string, string> = {
  "/al-khast-vatsaev": "/alkhast-vatsaev",
  "/logiciel-serrurier": "/logiciel-interventions-terrain",
  "/depannage-interventions": "/interventions-terrain",
  "/facturation-depannage": "/facturation-interventions",
};
