import type { Locale } from "../i18n/types";
import { FAQ_ITEMS_EN, FAQ_ITEMS_FR } from "./faq-i18n";

export type FaqItem = {
  question: string;
  answer: string;
};

export function getFaqItems(locale: Locale): FaqItem[] {
  return locale === "en" ? FAQ_ITEMS_EN : FAQ_ITEMS_FR;
}

/** @deprecated Prefer getFaqItems(locale). */
export const FAQ_ITEMS = FAQ_ITEMS_FR;
