"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { writeLocaleCookie, resolveInitialLocale } from "./cookie";
import type { Locale } from "./types";
import { UI } from "./ui";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof UI)["fr"];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const initial = resolveInitialLocale();
    if (typeof document !== "undefined") {
      document.documentElement.lang = initial;
      document.documentElement.dataset.locale = initial;
    }
    return initial;
  });

  const setLocale = useCallback((next: Locale) => {
    writeLocaleCookie(next);
    document.documentElement.lang = next;
    document.documentElement.dataset.locale = next;
    setLocaleState(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url.toString());
  }, []);

  const value = useMemo(
    (): LocaleContextValue => ({
      locale,
      setLocale,
      t: UI[locale],
    }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
