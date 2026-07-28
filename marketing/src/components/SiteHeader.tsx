import { Link } from "react-router-dom";
import { FounderCredit } from "./FounderCredit";
import { LanguageSwitch } from "./LanguageSwitch";
import { OpenNotaLink } from "./OpenNotaLink";

type SiteHeaderProps = {
  homeHref?: string;
  brandIsLink?: boolean;
};

export function SiteHeader({ homeHref = "/", brandIsLink = true }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-line/50 bg-void/90 px-6 py-3 backdrop-blur-md sm:px-10 sm:py-4"
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {brandIsLink ? (
          <Link
            to={homeHref}
            className="font-display inline-flex shrink-0 items-center text-sm tracking-[0.12em] text-ink"
          >
            NOTA
          </Link>
        ) : (
          <a
            href="#top"
            className="font-display inline-flex shrink-0 items-center text-sm tracking-[0.12em] text-ink"
          >
            NOTA
          </a>
        )}
        <FounderCredit size="header" className="min-w-0 truncate" />
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <LanguageSwitch />
        <OpenNotaLink
          variant="nav"
          className="rounded-full bg-accent px-5 py-2.5 text-sm text-on-accent transition hover:bg-accent-deep"
        />
      </div>
    </header>
  );
}
