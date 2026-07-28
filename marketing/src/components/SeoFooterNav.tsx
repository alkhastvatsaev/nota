import { Link } from "react-router-dom";
import { getSeoNavLinks } from "../config/seo-nav";
import { useLocale } from "../i18n/LocaleContext";
import { buildAppUrl } from "../lib/app-link";

type SeoFooterNavProps = {
  currentPath?: string;
  className?: string;
  linkClassName?: string;
};

export function SeoFooterNav({
  currentPath,
  className = "flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute",
  linkClassName = "inline-flex min-h-11 items-center transition hover:text-ink",
}: SeoFooterNavProps) {
  const { locale, t } = useLocale();
  const appHref = buildAppUrl({ content: "footer_nav" });
  const links = getSeoNavLinks(locale);

  return (
    <nav className={className} aria-label="Nota">
      <Link to="/" className={linkClassName}>
        {t.home}
      </Link>
      {links
        .filter((l) => l.to !== currentPath)
        .map((link) => (
          <Link key={link.to} to={link.to} className={linkClassName}>
            {link.label}
          </Link>
        ))}
      <a href={appHref} rel="noopener noreferrer" className={linkClassName}>
        {t.openNota}
      </a>
    </nav>
  );
}
