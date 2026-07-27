import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { GUIDE_BY_PATH } from "../content/guides";
import { ProductProofGallery } from "../components/ProductProofGallery";
import { SeoPageLayout } from "../components/SeoPageLayout";
import { NotFoundPage } from "./NotFoundPage";

function renderSection(section: {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
}) {
  return (
    <section key={section.h2}>
      <h2 className="font-display text-xl tracking-tight text-ink">{section.h2}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p.slice(0, 40)} className="mt-3">
          {p}
        </p>
      ))}
      {section.bullets ? (
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.ordered ? (
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          {section.ordered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export function GuidePage() {
  const { pathname } = useLocation();
  const clean = pathname.replace(/\/$/, "") || "/";
  const content = GUIDE_BY_PATH.get(clean);

  if (!content) {
    return <NotFoundPage />;
  }

  return (
    <SeoPageLayout eyebrow={content.eyebrow} title={content.title} lead={content.lead}>
      {content.sections.map((section) => renderSection(section))}
      <ProductProofGallery title="À quoi ressemble Nota" />
      <p className="text-sm">
        Aller plus loin :{" "}
        <Link
          to="/logiciel-interventions-terrain"
          className="text-accent underline-offset-2 hover:underline"
        >
          logiciel interventions terrain
        </Link>
        .
      </p>
      {content.faq.length > 0 ? (
        <section aria-labelledby="guide-faq">
          <h2 id="guide-faq" className="font-display text-xl tracking-tight text-ink">
            Questions fréquentes
          </h2>
          <div className="mt-4 space-y-4">
            {content.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-normal text-ink">{item.question}</h3>
                <p className="mt-1 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </SeoPageLayout>
  );
}
