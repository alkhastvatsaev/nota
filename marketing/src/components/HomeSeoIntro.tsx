import { Link } from "react-router-dom";
import { OpenNotaLink } from "./OpenNotaLink";
import { ProductProofGallery } from "./ProductProofGallery";
import { FOUNDER_FULL_NAME, FOUNDER_PROFILE_PATH } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";

/** Bloc texte indexable : métier + maillage interne sans casser le hero visuel. */
export function HomeSeoIntro() {
  const { t } = useLocale();

  const links = [
    { to: "/logiciel-interventions-terrain", label: t.linkFieldSoftware },
    { to: "/gestion-interventions", label: t.linkJobMgmt },
    { to: "/pour-qui", label: t.linkSectors },
    { to: "/guides/excel-vers-logiciel-interventions", label: t.linkExcelGuide },
    { to: "/ressources/checklist-interventions-terrain", label: t.linkChecklist },
  ];

  return (
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
          {t.siteLabel} : heynota.app · {t.appLabel} : app.heynota.app · {t.founderLabel} :{" "}
          <Link
            to={FOUNDER_PROFILE_PATH}
            className="font-medium text-accent underline-offset-2 hover:underline"
          >
            {FOUNDER_FULL_NAME}
          </Link>
          .
        </p>
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
        <div className="mt-8 flex justify-center">
          <OpenNotaLink
            variant="primary"
            utmContent="home_seo_intro"
            className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
          />
        </div>
      </div>
    </section>
  );
}
