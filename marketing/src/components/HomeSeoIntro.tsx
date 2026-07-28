import { Link } from "react-router-dom";
import { OpenNotaLink } from "./OpenNotaLink";
import { ProductProofGallery } from "./ProductProofGallery";
import { FOUNDER_FULL_NAME, FOUNDER_PROFILE_PATH } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";

/** Bloc texte indexable : métier + maillage interne sans casser le hero visuel. */
export function HomeSeoIntro() {
  const { t } = useLocale();

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
        <p className="mt-4 text-base leading-relaxed text-mute">
          <strong className="font-normal text-ink">{t.seoIntroBodyBefore}</strong>
          {t.seoIntroBodyAfter}
        </p>
        <p className="mt-3 text-sm text-mute">
          {t.siteLabel} : heynota.app · {t.appLabel} : app.heynota.app · {t.founderLabel} :{" "}
          <Link
            to={FOUNDER_PROFILE_PATH}
            className="text-accent underline-offset-2 hover:underline"
          >
            {FOUNDER_FULL_NAME}
          </Link>
          .
        </p>
        <p className="mt-3 text-sm text-mute">
          <Link
            to="/logiciel-interventions-terrain"
            className="text-accent underline-offset-2 hover:underline"
          >
            {t.linkFieldSoftware}
          </Link>
          {" · "}
          <Link
            to="/gestion-interventions"
            className="text-accent underline-offset-2 hover:underline"
          >
            {t.linkJobMgmt}
          </Link>
          {" · "}
          <Link to="/pour-qui" className="text-accent underline-offset-2 hover:underline">
            {t.linkSectors}
          </Link>
          {" · "}
          <Link
            to="/guides/excel-vers-logiciel-interventions"
            className="text-accent underline-offset-2 hover:underline"
          >
            {t.linkExcelGuide}
          </Link>
        </p>
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
