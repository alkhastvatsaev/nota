import { Link } from "react-router-dom";
import { SiteHeader } from "../components/SiteHeader";
import { OpenNotaLink } from "../components/OpenNotaLink";
import { StickyCta } from "../components/StickyCta";
import { APP_URL } from "../config/site";
import { useLocale } from "../i18n/LocaleContext";

export function NotFoundPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-svh bg-void pb-20 text-ink md:pb-0">
      <a href={APP_URL} className="skip-link" rel="noopener noreferrer">
        {t.openNota}
      </a>
      <SiteHeader />
      <main className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center sm:px-10">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">{t.notFoundEyebrow}</p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.5rem)] tracking-tight text-ink">
          {t.notFoundTitle}
        </h1>
        <p className="mt-4 text-base text-mute">{t.notFoundLead}</p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-mist px-6 py-3 text-sm text-ink transition hover:border-accent"
          >
            {t.home}
          </Link>
          <OpenNotaLink className="rounded-full bg-accent px-6 py-3 text-sm text-on-accent transition hover:bg-accent-deep" />
        </div>
      </main>
      <StickyCta disabled />
    </div>
  );
}
