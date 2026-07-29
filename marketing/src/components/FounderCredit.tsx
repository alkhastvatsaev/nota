import { FOUNDER_FULL_NAME, PORTFOLIO_URL } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";
import { cn } from "../lib/utils";

type FounderCreditProps = {
  className?: string;
  size?: "header" | "footer";
};

/** Une seule mention naturelle — lien vers le portfolio, pas une page satellite. */
export function FounderCredit({ className, size = "header" }: FounderCreditProps) {
  const { t } = useLocale();
  const compact = size === "header";

  return (
    <a
      href={PORTFOLIO_URL}
      title={`${t.builtBy} ${FOUNDER_FULL_NAME}`}
      aria-label={`${t.builtBy} ${FOUNDER_FULL_NAME}`}
      rel="noopener noreferrer author"
      className={cn(
        "inline-flex items-center gap-1.5 font-normal text-mute underline-offset-2 transition hover:text-ink hover:underline",
        compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm",
        className
      )}
    >
      <span className="font-mono text-accent" aria-hidden>
        {"</>"}
      </span>
      <span className="sm:hidden">{FOUNDER_FULL_NAME}</span>
      <span className="hidden sm:inline">
        {t.builtBy} {FOUNDER_FULL_NAME}
      </span>
    </a>
  );
}
