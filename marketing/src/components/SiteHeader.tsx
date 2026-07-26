import { Link } from "react-router-dom";
import { OpenNotaLink } from "./OpenNotaLink";

type SiteHeaderProps = {
  homeHref?: string;
  /** Accueil marketing = ancre #top ; pages = Link / */
  brandIsLink?: boolean;
};

export function SiteHeader({ homeHref = "/", brandIsLink = true }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between border-b border-line/50 bg-void/90 px-6 py-4 backdrop-blur-md sm:px-10"
      style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
    >
      {brandIsLink ? (
        <Link
          to={homeHref}
          className="font-display min-h-11 min-w-11 inline-flex items-center text-sm tracking-[0.12em] text-ink"
        >
          NOTA
        </Link>
      ) : (
        <a
          href="#top"
          className="font-display inline-flex min-h-11 min-w-11 items-center text-sm tracking-[0.12em] text-ink"
        >
          NOTA
        </a>
      )}
      <OpenNotaLink
        variant="nav"
        className="rounded-full bg-accent px-5 py-2.5 text-sm text-on-accent transition hover:bg-accent-deep"
      />
    </header>
  );
}
