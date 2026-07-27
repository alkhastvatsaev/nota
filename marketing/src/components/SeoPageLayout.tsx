import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { OpenNotaLink } from "./OpenNotaLink";
import { SiteHeader } from "./SiteHeader";
import { StickyCta } from "./StickyCta";
import { APP_URL } from "../config/site";

type SeoPageLayoutProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export function SeoPageLayout({ eyebrow, title, lead, children }: SeoPageLayoutProps) {
  return (
    <div className="min-h-svh bg-void pb-24 text-ink md:pb-0">
      <a href="#main" className="skip-link">
        Aller au contenu
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
          <p className="mt-3 text-xs text-mute">Sans compte · Accès immédiat</p>
        </div>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-mute sm:mt-14">
          {children}
        </div>

        <div className="mt-14 rounded-3xl bg-mist px-6 py-8 text-center sm:px-10">
          <p className="font-display text-xl tracking-tight text-ink">Ouvrez Nota maintenant</p>
          <p className="mt-2 text-sm text-mute">Sans inscription. Sans attente.</p>
          <div className="mt-6 hidden justify-center md:flex">
            <OpenNotaLink
              variant="primary"
              className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
            />
          </div>
        </div>

        <nav
          className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute"
          aria-label="Autres pages"
        >
          <Link to="/" className="min-h-11 inline-flex items-center transition hover:text-ink">
            Accueil
          </Link>
          <Link
            to="/crm-sans-inscription"
            className="min-h-11 inline-flex items-center transition hover:text-ink"
          >
            CRM sans inscription
          </Link>
          <Link
            to="/alternative-excel-commercial"
            className="min-h-11 inline-flex items-center transition hover:text-ink"
          >
            Alternative Excel
          </Link>
          <a
            href={APP_URL}
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center transition hover:text-ink"
          >
            Ouvrir Nota
          </a>
        </nav>
      </main>

      <StickyCta />
    </div>
  );
}
