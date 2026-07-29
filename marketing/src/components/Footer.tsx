import { Link } from "react-router-dom";
import { getFaqItems } from "../content/faq";
import { CONTACT_EMAIL, CONTACT_MAILTO, CONTACT_PATH } from "../config/contact";
import { getHomeFooterLinks } from "../config/seo-nav";
import { useLocale } from "../i18n/LocaleContext";
import { FounderCredit } from "./FounderCredit";
import { SeoFooterNav } from "./SeoFooterNav";

type FooterProps = {
  /** Sur la home, la FAQ est déjà dans le corps — évite le doublon. */
  hideFaq?: boolean;
  /** Nav courte (home) pour ne pas saturer l’attention en bas de page. */
  compactNav?: boolean;
};

export function Footer({ hideFaq = false, compactNav = false }: FooterProps) {
  const year = new Date().getFullYear();
  const { locale, t } = useLocale();
  const faq = getFaqItems(locale);
  const compactLinks = getHomeFooterLinks(locale);

  return (
    <footer className="border-t border-line bg-mist px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <p className="font-display shrink-0 tracking-[0.22em] text-ink">NOTA</p>
            <FounderCredit size="footer" className="min-w-0" />
          </div>
          {compactNav ? (
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-mute" aria-label="Nota">
              {compactLinks.map((link) => (
                <Link key={link.to} to={link.to} className="transition hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : (
            <SeoFooterNav
              className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-mute"
              linkClassName="transition hover:text-ink"
            />
          )}
        </div>

        <p className="mt-6 text-sm text-mute">
          <Link to={CONTACT_PATH} className="text-ink underline-offset-2 hover:underline">
            {t.contact}
          </Link>
          {" · "}
          <a href={CONTACT_MAILTO} className="underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>

        {!hideFaq ? (
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
        ) : null}

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
