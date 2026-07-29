import { Link } from "react-router-dom";
import { getChecklistContent } from "../content/asset-checklist";
import { CONTACT_PATH } from "../config/contact";
import { useLocale } from "../i18n/LocaleContext";
import { OpenNotaLink } from "../components/OpenNotaLink";
import { SeoFooterNav } from "../components/SeoFooterNav";
import { SiteHeader } from "../components/SiteHeader";
import { StickyCta } from "../components/StickyCta";

export function ChecklistAssetPage() {
  const { locale, t } = useLocale();
  const content = getChecklistContent(locale);

  return (
    <div className="min-h-svh bg-void pb-28 text-ink md:pb-0">
      <a href="#main" className="skip-link">
        {t.skipToContent}
      </a>
      <SiteHeader />

      <main id="main" className="mx-auto max-w-2xl px-6 pb-16 pt-8 sm:px-10">
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
          {content.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-tight tracking-tight text-ink">
          {content.title}
        </h1>
        <p className="mt-4 text-lg font-normal leading-relaxed text-mute">{content.lead}</p>
        <p className="mt-3 text-sm font-normal text-mute">{content.whyUnique}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-mist px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent"
          >
            {locale === "en" ? "Print / Save PDF" : "Imprimer / PDF"}
          </button>
          <OpenNotaLink
            variant="primary"
            utmContent="checklist_top"
            className="rounded-full bg-accent px-5 py-2.5 text-sm text-on-accent transition hover:bg-accent-deep"
          />
        </div>

        <div className="mt-12 space-y-10">
          {content.sections.map((section) => (
            <section key={section.h2}>
              <h2 className="font-display text-xl tracking-tight text-ink">{section.h2}</h2>
              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl border border-line bg-mist px-4 py-3 text-sm font-normal text-ink"
                  >
                    <span className="mt-0.5 font-mono text-accent" aria-hidden>
                      ☐
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-3xl border border-line bg-sky-soft px-6 py-7">
          <h2 className="font-display text-lg tracking-tight text-ink">
            {locale === "en" ? "How to use" : "Comment l’utiliser"}
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-normal text-mute">
            {content.howToUse.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <p className="mt-8 text-sm font-normal text-mute">
          {content.ctaNote}{" "}
          <Link to={CONTACT_PATH} className="text-accent underline-offset-2 hover:underline">
            {t.contact}
          </Link>
        </p>

        <div className="mt-10 flex justify-center">
          <OpenNotaLink
            variant="primary"
            utmContent="checklist_bottom"
            className="rounded-full bg-ink px-8 py-4 text-sm text-void transition hover:bg-accent"
          />
        </div>

        <nav aria-label="Nota" className="mt-12 border-t border-line pt-8">
          <SeoFooterNav
            currentPath={content.path}
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-normal text-mute"
          />
        </nav>
      </main>

      <StickyCta />
    </div>
  );
}
