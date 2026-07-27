import { GA_MEASUREMENT_ID } from "../config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

export function initAnalytics() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || loaded) return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path: string, title: string) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: `${window.location.origin}${path}`,
  });
}

export type CtaEvent = {
  variant: string;
  pagePath: string;
};

export function trackOpenNotaClick({ variant, pagePath }: CtaEvent) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "click_open_nota", {
    cta_variant: variant,
    page_path: pagePath,
  });
}
