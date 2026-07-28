import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { OpenNotaLink } from "./OpenNotaLink";
import { SeoFooterNav } from "./SeoFooterNav";
import { SiteHeader } from "./SiteHeader";
import { StickyCta } from "./StickyCta";

type SeoPageLayoutProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export function SeoPageLayout({ eyebrow, title, lead, children }: SeoPageLayoutProps) {
  const { pathname } = useLocation();
  const { t } = useLocale();

  return (
    <div className="min-h-svh bg-void pb-24 text-ink md:pb-0">
      <a href="#main" className="skip-link">
        {t.skipToContent}
      </a>

      <SiteHeader />

      <main id="main" className="mx-auto max-w-2xl px-6 pb-16 pt-8 sm:px-10">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">{eyebrow}</p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-tight tracking-tight text-ink">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-mute">{lead}</p>

        <div className="mt-8 hidden md:block">
          <OpenNotaLink
            variant="primary"
            className="rounded-full bg-ink px-8 py-4 text-sm text-void transition hover:bg-accent"
          />
          <p className="mt-3 text-xs text-mute">{t.noAccountAccess}</p>
        </div>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-mute sm:mt-14">
          {children}
        </div>

        <div className="mt-14 rounded-3xl bg-mist px-6 py-8 text-center sm:px-10">
          <p className="font-display text-xl tracking-tight text-ink">{t.openNotaNow}</p>
          <p className="mt-2 text-sm text-mute">{t.noSignupNoWait}</p>
          <div className="mt-6 hidden justify-center md:flex">
            <OpenNotaLink
              variant="primary"
              utmContent="seo_page_bottom"
              className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
            />
          </div>
        </div>

        <SeoFooterNav
          currentPath={pathname}
          className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute"
        />
      </main>

      <StickyCta />
    </div>
  );
}
