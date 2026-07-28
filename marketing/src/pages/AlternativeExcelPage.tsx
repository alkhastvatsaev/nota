import { Link } from "react-router-dom";
import { SeoPageLayout } from "../components/SeoPageLayout";
import { getAlternativeExcelContent } from "../content/special-pages";
import { useLocale } from "../i18n/LocaleContext";

export function AlternativeExcelPage() {
  const { locale, t } = useLocale();
  const content = getAlternativeExcelContent(locale);

  return (
    <SeoPageLayout eyebrow={content.eyebrow} title={content.title} lead={content.lead}>
      {content.sections.map((section) => {
        const isNotaInstead = section.h2 === content.sections[1]?.h2;
        const isLowFriction = section.h2 === content.sections[3]?.h2;

        return (
          <section key={section.h2}>
            <h2 className="font-display text-xl tracking-tight text-ink">{section.h2}</h2>
            {section.bullets ? (
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.paragraphs?.map((p, i) => (
              <p key={p.slice(0, 40)} className="mt-3">
                {p}
                {isNotaInstead && i === 0 ? (
                  <>
                    {" "}
                    <Link
                      to="/logiciel-interventions-terrain"
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      {t.linkFieldJobs}
                    </Link>
                    .
                  </>
                ) : null}
                {isLowFriction && i === 0 ? (
                  <>
                    {" "}
                    <Link
                      to="/crm-sans-inscription"
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      {t.linkCrmNoSignup}
                    </Link>
                    .
                  </>
                ) : null}
              </p>
            ))}
          </section>
        );
      })}
    </SeoPageLayout>
  );
}
