import { Link } from "react-router-dom";
import { SEO_NAV_LINKS } from "../config/seo-nav";
import { buildAppUrl } from "../lib/app-link";

type SeoFooterNavProps = {
  /** Exclure la page courante du maillage */
  currentPath?: string;
  className?: string;
  linkClassName?: string;
};

export function SeoFooterNav({
  currentPath,
  className = "flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute",
  linkClassName = "min-h-11 inline-flex items-center transition hover:text-ink",
}: SeoFooterNavProps) {
  const appHref = buildAppUrl({ content: "footer_nav" });

  return (
    <nav className={className} aria-label="Pages Nota">
      <Link to="/" className={linkClassName}>
        Accueil
      </Link>
      {SEO_NAV_LINKS.filter((l) => l.to !== currentPath).map((link) => (
        <Link key={link.to} to={link.to} className={linkClassName}>
          {link.label}
        </Link>
      ))}
      <a href={appHref} rel="noopener noreferrer" className={linkClassName}>
        Ouvrir Nota
      </a>
    </nav>
  );
}
