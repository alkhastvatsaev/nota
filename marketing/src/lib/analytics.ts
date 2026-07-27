import { GA_MEASUREMENT_ID } from "../config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;
let loading = false;
const queue: Array<() => void> = [];

function flushQueue() {
  while (queue.length > 0) {
    const fn = queue.shift();
    fn?.();
  }
}

function whenReady(run: () => void) {
  if (loaded && window.gtag) {
    run();
    return;
  }
  queue.push(run);
}

export function initAnalytics() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || loaded) return;

  if (window.gtag) {
    loaded = true;
    flushQueue();
    return;
  }

  if (loading) return;
  loading = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = () => {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
    loaded = true;
    loading = false;
    flushQueue();
  };
  script.onerror = () => {
    loading = false;
    queue.length = 0;
  };
  document.head.appendChild(script);
}

export function trackPageView(path: string, title: string) {
  if (!GA_MEASUREMENT_ID) return;
  whenReady(() => {
    window.gtag?.("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: `${window.location.origin}${path}`,
    });
  });
}

export type CtaEvent = {
  variant: string;
  pagePath: string;
};

export function trackOpenNotaClick({ variant, pagePath }: CtaEvent) {
  if (!GA_MEASUREMENT_ID) return;
  whenReady(() => {
    window.gtag?.("event", "click_open_nota", {
      cta_variant: variant,
      page_path: pagePath,
    });
  });
}
