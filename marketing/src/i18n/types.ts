export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];

export const DEFAULT_LOCALE: Locale = "fr";

export const LANG_COOKIE = "nota_lang";

export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Pays → français (IP). Le reste → anglais. */
export function localeFromCountry(countryCode: string | null | undefined): Locale {
  const c = (countryCode || "").toUpperCase();
  return c === "FR" ? "fr" : "en";
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "fr" || value === "en";
}
