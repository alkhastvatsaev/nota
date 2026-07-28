import { DEFAULT_LOCALE, LANG_COOKIE, LANG_COOKIE_MAX_AGE, isLocale, type Locale } from "./types";

export function readLocaleCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=(fr|en)`));
  return isLocale(match?.[1]) ? match[1] : null;
}

export function writeLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LANG_COOKIE}=${locale}; Path=/; Max-Age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function readLocaleFromUrl(): Locale | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search).get("lang");
  return isLocale(q) ? q : null;
}

/** Ordre : ?lang= → cookie → défaut FR (avant géo middleware). */
export function resolveInitialLocale(): Locale {
  return readLocaleFromUrl() ?? readLocaleCookie() ?? DEFAULT_LOCALE;
}
