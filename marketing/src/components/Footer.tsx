import { Link } from "react-router-dom";
import { FAQ_ITEMS } from "../content/faq";
import { APP_URL } from "../config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-mist px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-display tracking-[0.22em] text-ink">NOTA</p>
          <nav
            aria-label="Pied de page"
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-mute"
          >
            <a href="#voyage" className="transition hover:text-ink">
              Parcours
            </a>
            <a href="#produit" className="transition hover:text-ink">
              Produit
            </a>
            <Link to="/crm-sans-inscription" className="transition hover:text-ink">
              CRM sans inscription
            </Link>
            <Link to="/alternative-excel-commercial" className="transition hover:text-ink">
              Alternative Excel
            </Link>
            <a href={APP_URL} rel="noopener noreferrer" className="transition hover:text-ink">
              Ouvrir Nota
            </a>
          </nav>
        </div>

        <details id="faq" className="group mt-8 border-t border-line pt-6">
          <summary className="cursor-pointer list-none text-sm text-ink marker:content-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            <span className="flex min-h-11 items-center justify-between gap-3">
              Une question ?
              <span aria-hidden className="text-accent transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <div className="mt-4 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                <p className="text-sm text-ink">{item.question}</p>
                <p className="mt-1 text-xs leading-relaxed text-mute">{item.answer}</p>
              </div>
            ))}
          </div>
        </details>

        <p id="confidentialite" className="mt-8 text-[11px] leading-relaxed text-mute">
          <span id="mentions">
            Pas d’email collecté sur ce site. Accès direct à l’app. © {year} Nota.
          </span>
        </p>
      </div>
    </footer>
  );
}
