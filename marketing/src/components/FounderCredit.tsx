import { Link } from "react-router-dom";
import { FOUNDER_FULL_NAME, FOUNDER_PROFILE_PATH } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";
import { cn } from "../lib/utils";

type FounderCreditProps = {
  className?: string;
  size?: "header" | "footer";
};

export function FounderCredit({ className, size = "header" }: FounderCreditProps) {
  const { t } = useLocale();
  const compact = size === "header";

  return (
    <p
      className={cn(
        compact ? "text-[11px] leading-tight text-mute sm:text-xs" : "text-sm text-mute",
        className
      )}
    >
      <span className="font-mono text-accent" aria-hidden>
        {"</>"}
      </span>{" "}
      <Link
        to={FOUNDER_PROFILE_PATH}
        className="text-mute underline-offset-2 transition hover:text-ink hover:underline"
        title={FOUNDER_FULL_NAME}
      >
        {t.builtBy} {FOUNDER_FULL_NAME}
      </Link>
    </p>
  );
}
