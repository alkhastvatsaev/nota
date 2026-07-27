import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../lib/analytics";
import { ALL_PAGES } from "../config/pages-data";

function titleForPath(pathname: string): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  const page = ALL_PAGES.find((p) => (p.path === "/" ? clean === "/" : p.path === clean));
  return page?.title ?? document.title;
}

export function SiteAnalytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(pathname, titleForPath(pathname));
  }, [pathname]);

  return null;
}
