import { Link } from "react-router-dom";
import { FOUNDER_FULL_NAME, FOUNDER_PROFILE_PATH } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";
import { cn } from "../lib/utils";

type FounderCreditProps = {
  className?: string;
  size?: "header" | "footer";
};

/** Mobile = courte (`</> Alkhast Vatsaev`). Desktop = phrase complète. */
export function FounderCredit({ className, size = "header" }: FounderCreditProps) {
  const { t } = useLocale();
  const compact = size === "header";

  return (
    <Link
      to={FOUNDER_PROFILE_PATH}
      title={`${t.builtBy} ${FOUNDER_FULL_NAME}`}
      aria-label={`${t.builtBy} ${FOUNDER_FULL_NAME}`}
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
    </Link>
  );
}
