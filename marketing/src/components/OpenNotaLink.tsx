import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { trackOpenNotaClick } from "../lib/analytics";
import { buildAppUrl } from "../lib/app-link";
import { cn } from "../lib/utils";

type OpenNotaLinkProps = {
  className?: string;
  children?: ReactNode;
  showIcon?: boolean;
  variant?: "primary" | "secondary" | "nav";
  utmContent?: string;
};

export function OpenNotaLink({
  className,
  children,
  showIcon = true,
  variant = "primary",
  utmContent,
}: OpenNotaLinkProps) {
  const { t } = useLocale();
  const { pathname } = useLocation();
  const label = children ?? t.openNota;
  const isDefaultLabel = children == null || children === t.openNota;
  const href = buildAppUrl({
    content: utmContent ?? (pathname.replace(/^\//, "") || "home"),
  });

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      data-cta={variant}
      onClick={() => trackOpenNotaClick({ variant, pagePath: pathname })}
      aria-label={isDefaultLabel ? undefined : t.openNotaAria}
      title={isDefaultLabel ? t.openNotaTitle : undefined}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 touch-manipulation",
        className
      )}
    >
      {label}
      {showIcon ? <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden /> : null}
    </a>
  );
}
