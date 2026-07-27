import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { CTA_LABEL } from "../config/site";
import { trackOpenNotaClick } from "../lib/analytics";
import { buildAppUrl } from "../lib/app-link";
import { cn } from "../lib/utils";

type OpenNotaLinkProps = {
  className?: string;
  children?: ReactNode;
  showIcon?: boolean;
  /** Variante pour analytics / style */
  variant?: "primary" | "secondary" | "nav";
  /** Valeur utm_content (sinon chemin de page) */
  utmContent?: string;
};

/** Lien unique vers l’app CRM (accès direct + UTM). */
export function OpenNotaLink({
  className,
  children = CTA_LABEL,
  showIcon = true,
  variant = "primary",
  utmContent,
}: OpenNotaLinkProps) {
  const { pathname } = useLocation();
  const isDefaultLabel = children === CTA_LABEL;
  const href = buildAppUrl({
    content: utmContent ?? (pathname.replace(/^\//, "") || "home"),
  });

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      data-cta={variant}
      onClick={() => trackOpenNotaClick({ variant, pagePath: pathname })}
      aria-label={isDefaultLabel ? undefined : `${CTA_LABEL} — ouvrir l’application CRM`}
      title={isDefaultLabel ? "Ouvrir l’application CRM Nota" : undefined}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 touch-manipulation",
        className
      )}
    >
      {children}
      {showIcon ? <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden /> : null}
    </a>
  );
}
