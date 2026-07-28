import { SeoPageLayout } from "../components/SeoPageLayout";
import { getCrmSansInscriptionContent } from "../content/special-pages";
import { useLocale } from "../i18n/LocaleContext";

export function CrmSansInscriptionPage() {
  const { locale } = useLocale();
  const content = getCrmSansInscriptionContent(locale);

  return (
    <SeoPageLayout eyebrow={content.eyebrow} title={content.title} lead={content.lead}>
      {content.sections.map((section) => (
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
      ))}
    </SeoPageLayout>
  );
}
