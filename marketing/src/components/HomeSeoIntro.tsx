import { Link } from "react-router-dom";
import { ProductProofGallery } from "./ProductProofGallery";
import { FOUNDER_FULL_NAME, PORTFOLIO_URL } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";
import { getFaqItems } from "../content/faq";

/** Contenu indexable de la home : empathie, features, pour qui, FAQ. */
export function HomeSeoIntro() {
  const { locale, t } = useLocale();
  const faq = getFaqItems(locale);

  const links = [
    { to: "/logiciel-interventions-terrain", label: t.linkFieldSoftware },
    { to: "/gestion-interventions", label: t.linkJobMgmt },
    { to: "/pour-qui", label: t.linkSectors },
    { to: "/guides/excel-vers-logiciel-interventions", label: t.linkExcelGuide },
    { to: "/ressources/checklist-interventions-terrain", label: t.linkChecklist },
  ];

  return (
    <>
      <section
        className="border-t border-line bg-void px-6 py-16 sm:px-10"
        aria-labelledby="seo-intro-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="seo-intro-heading"
            className="font-display text-[clamp(1.5rem,4vw,2rem)] tracking-tight text-ink"
          >
            {t.seoIntroHeading}
          </h2>
          <p className="mt-4 text-base font-normal leading-relaxed text-mute">
            <strong className="font-semibold text-ink">{t.seoIntroBodyBefore}</strong>
            {t.seoIntroBodyAfter}
          </p>
          <p className="mt-3 text-sm font-normal text-mute">
            {t.siteLabel} : heynota.app · {t.appLabel} : app.heynota.app
          </p>
        </div>
      </section>

      <section
        className="border-t border-line bg-mist px-6 py-16 sm:px-10"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id="features-heading"
            className="text-center font-display text-[clamp(1.5rem,4vw,2rem)] tracking-tight text-ink"
          >
            {t.featuresHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-mute">
            {t.featuresLead}
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {t.featureCards.map((feature) => (
              <article key={feature.title} className="text-left">
                <img
                  src={feature.img}
                  alt={feature.alt}
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full rounded-2xl border border-line object-cover object-top"
                />
                <h3 className="mt-4 font-display text-lg text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-line bg-void px-6 py-16 sm:px-10"
        aria-labelledby="audience-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="audience-heading"
            className="font-display text-[clamp(1.5rem,4vw,2rem)] tracking-tight text-ink"
          >
            {t.audienceHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mute">{t.audienceBody}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-mist px-3.5 py-2 text-xs font-medium text-ink transition hover:border-accent hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ProductProofGallery id="apercu-accueil" title={t.galleryTitle} />
        </div>
      </section>

      <section
        className="border-t border-line bg-mist px-6 py-16 sm:px-10"
        aria-labelledby="home-faq-heading"
        id="faq"
      >
        <div className="mx-auto max-w-2xl">
          <h2
            id="home-faq-heading"
            className="text-center font-display text-[clamp(1.5rem,4vw,2rem)] tracking-tight text-ink"
          >
            {t.faqHeading}
          </h2>
          <div className="mt-8 space-y-5">
            {faq.map((item) => (
              <div key={item.question} className="border-b border-line pb-5 last:border-0">
                <h3 className="text-sm font-semibold text-ink">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-mute">
            {t.builtBy}{" "}
            <a
              href={PORTFOLIO_URL}
              className="font-medium text-accent underline-offset-2 hover:underline"
              rel="noopener noreferrer author"
            >
              {FOUNDER_FULL_NAME}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
