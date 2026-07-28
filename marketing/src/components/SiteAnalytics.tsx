import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllPages } from "../config/pages-data";
import { useLocale } from "../i18n/LocaleContext";
import { initAnalytics, trackPageView } from "../lib/analytics";

export function SiteAnalytics() {
  const { pathname } = useLocation();
  const { locale } = useLocale();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const clean = pathname.replace(/\/$/, "") || "/";
    const page = getAllPages(locale).find((p) =>
      p.path === "/" ? clean === "/" : p.path === clean
    );
    trackPageView(pathname, page?.title ?? document.title);
  }, [pathname, locale]);

  return null;
}
