import { Link } from "react-router-dom";
import { CONTACT_PATH } from "../config/contact";
import { useLocale } from "../i18n/LocaleContext";
import { FounderCredit } from "./FounderCredit";
import { OpenNotaLink } from "./OpenNotaLink";

type SiteHeaderProps = {
  homeHref?: string;
  brandIsLink?: boolean;
};

export function SiteHeader({ homeHref = "/", brandIsLink = true }: SiteHeaderProps) {
  const { t } = useLocale();

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-line/50 bg-void/90 px-4 py-3 backdrop-blur-md sm:gap-3 sm:px-10 sm:py-4"
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {brandIsLink ? (
          <Link
            to={homeHref}
            className="font-display inline-flex shrink-0 items-center overflow-visible pr-[0.12em] text-sm tracking-[0.12em] text-ink"
          >
            NOTA
          </Link>
        ) : (
          <a
            href="#top"
            className="font-display inline-flex shrink-0 items-center overflow-visible pr-[0.12em] text-sm tracking-[0.12em] text-ink"
          >
            NOTA
          </a>
        )}
        <FounderCredit size="header" className="min-w-0 truncate" />
      </div>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Link
          to={CONTACT_PATH}
          className="hidden px-1 text-sm font-normal text-mute transition hover:text-ink min-[400px]:inline"
        >
          {t.contact}
        </Link>
        <OpenNotaLink
          variant="nav"
          className="rounded-full bg-accent px-3.5 py-2 text-xs text-on-accent transition hover:bg-accent-deep sm:px-5 sm:py-2.5 sm:text-sm"
        />
      </div>
    </header>
  );
}
