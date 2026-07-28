import { Link } from "react-router-dom";
import { FOUNDER_FULL_NAME, FOUNDER_PROFILE_PATH } from "../config/founder";
import { useLocale } from "../i18n/LocaleContext";
import { cn } from "../lib/utils";

type FounderCreditProps = {
  className?: string;
  /** Plus visible dans le hero ; plus discret en footer. */
  size?: "hero" | "footer";
};

export function FounderCredit({ className, size = "hero" }: FounderCreditProps) {
  const { t } = useLocale();
  const isHero = size === "hero";

  return (
    <p
      className={cn(
        isHero ? "mt-4 text-sm text-mute sm:text-base" : "text-sm text-mute",
        className
      )}
    >
      <span className="font-mono text-accent" aria-hidden>
        {"</>"}
      </span>{" "}
      <Link
        to={FOUNDER_PROFILE_PATH}
        className={cn(
          "underline-offset-2 transition hover:text-ink hover:underline",
          isHero ? "text-ink" : "text-mute"
        )}
        title={FOUNDER_FULL_NAME}
      >
        {t.builtBy} {FOUNDER_FULL_NAME}
      </Link>
    </p>
  );
}
