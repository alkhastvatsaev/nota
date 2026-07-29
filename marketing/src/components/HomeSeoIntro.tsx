import { Link } from "react-router-dom";
import { OpenNotaLink } from "./OpenNotaLink";
import { ProductProofGallery } from "./ProductProofGallery";
import { FOUNDER_FULL_NAME, PORTFOLIO_URL } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";
import { getFaqItems } from "../content/faq";

/** Contenu indexable de la home : valeur, features, pour qui, FAQ, CTA. */
export function HomeSeoIntro() {
  const { locale, t } = useLocale();
  const faq = getFaqItems(locale);
  const isEn = locale === "en";

  const features = isEn
    ? [
        {
          title: "Live job map",
          body: "See every intervention on a map: who is assigned, where the job is, and what status it has — without chasing WhatsApp threads.",
          img: "/product/carte.png",
          alt: "Nota job map — live field missions",
        },
        {
          title: "Mobile technician hub",
          body: "Technicians open missions on their phone, add before/after photos, capture signatures and keep working offline until the network returns.",
          img: "/product/interventions.png",
          alt: "Nota intervention list and case files",
        },
        {
          title: "Billing tied to jobs",
          body: "Quotes and invoices follow closed interventions — less re-typing, fewer forgotten invoices, one thread from site visit to payment.",
          img: "/product/facturation.png",
          alt: "Nota billing hub linked to jobs",
        },
      ]
    : [
        {
          title: "Carte des missions",
          body: "Visualisez chaque intervention sur une carte : qui est assigné, où se trouve le chantier, quel est le statut — sans chasser les fils WhatsApp.",
          img: "/product/carte.png",
          alt: "Carte des interventions Nota — vue des missions sur le terrain",
        },
        {
          title: "Hub technicien mobile",
          body: "Les techniciens ouvrent leurs missions sur téléphone, ajoutent photos avant/après, capturent la signature et continuent hors-ligne jusqu’au retour réseau.",
          img: "/product/interventions.png",
          alt: "Liste et dossiers d’interventions Nota",
        },
        {
          title: "Facturation liée aux missions",
          body: "Devis et factures suivent les interventions closes — moins de ressaisie, moins d’oublis, un fil continu de la visite au paiement.",
          img: "/product/facturation.png",
          alt: "Hub facturation Nota lié aux interventions",
        },
      ];

  const audience = isEn
    ? {
        heading: "Who Nota is for",
        body: "Maintenance, install, repair, recurring services, on-site IT, property management — any TPE/PME that sends technicians to customers and is tired of Excel + messaging chaos.",
      }
    : {
        heading: "Pour qui c’est fait",
        body: "Maintenance, installation, dépannage, services récurrents, IT sur site, property management — toute TPE/PME qui envoie des techniciens chez ses clients et en a assez d’Excel + messagerie.",
      };

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
            {isEn ? "Three pillars of Nota CRM" : "Trois piliers de Nota CRM"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-mute">
            {isEn
              ? "Real product surfaces — not stock illustrations."
              : "Surfaces produit réelles — pas des illustrations génériques."}
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {features.map((feature) => (
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
            {audience.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mute">{audience.body}</p>
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
        id="faq-accueil"
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
          <div className="mt-6 flex justify-center">
            <OpenNotaLink
              variant="primary"
              utmContent="home_seo_intro"
              className="rounded-full bg-accent px-8 py-4 text-sm text-on-accent transition hover:bg-accent-deep"
            />
          </div>
        </div>
      </section>
    </>
  );
}
