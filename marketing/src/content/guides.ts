import type { Locale } from "../i18n/types";
import { GUIDE_PAGES_EN, GUIDE_PAGES_FR, type GuidePageContent } from "./guides-i18n";

export type { GuidePageContent, GuideSection } from "./guides-i18n";

export function getGuidePages(locale: Locale): GuidePageContent[] {
  return locale === "en" ? GUIDE_PAGES_EN : GUIDE_PAGES_FR;
}

export function getGuideByPath(locale: Locale): Map<string, GuidePageContent> {
  return new Map(getGuidePages(locale).map((g) => [g.path, g]));
}

/** @deprecated Prefer getGuidePages(locale). */
export const GUIDE_PAGES = GUIDE_PAGES_FR;
export const GUIDE_BY_PATH = new Map(GUIDE_PAGES_FR.map((g) => [g.path, g]));
