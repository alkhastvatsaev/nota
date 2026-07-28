import { Link } from "react-router-dom";
import { getFaqItems } from "../content/faq";
import { useLocale } from "../i18n/LocaleContext";
import { FounderCredit } from "./FounderCredit";
import { SeoFooterNav } from "./SeoFooterNav";

export function Footer() {
  const year = new Date().getFullYear();
  const { locale, t } = useLocale();
  const faq = getFaqItems(locale);

  return (
    <footer className="border-t border-line bg-mist px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <p className="font-display shrink-0 tracking-[0.22em] text-ink">NOTA</p>
            <FounderCredit size="footer" className="min-w-0" />
          </div>
          <SeoFooterNav
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-mute"
            linkClassName="transition hover:text-ink"
          />
        </div>

        <details id="faq" className="group mt-8 border-t border-line pt-6">
          <summary className="cursor-pointer list-none text-sm text-ink marker:content-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            <span className="flex min-h-11 items-center justify-between gap-3">
              {t.faqTitle}
              <span aria-hidden className="text-accent transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <div className="mt-4 space-y-4">
            {faq.map((item) => (
              <div key={item.question}>
                <p className="text-sm text-ink">{item.question}</p>
                <p className="mt-1 text-xs leading-relaxed text-mute">{item.answer}</p>
              </div>
            ))}
          </div>
        </details>

        <p id="confidentialite" className="mt-8 text-[11px] leading-relaxed text-mute">
          <span id="mentions">
            {t.footerNoEmail}{" "}
            <Link to="/a-propos" className="underline-offset-2 hover:underline">
              {t.about}
            </Link>
            . {t.footerAccess} © {year} Nota.
          </span>
        </p>
      </div>
    </footer>
  );
}
