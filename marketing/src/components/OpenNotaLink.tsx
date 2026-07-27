import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { APP_URL, CTA_LABEL } from "../config/site";
import { cn } from "../lib/utils";

type OpenNotaLinkProps = {
  className?: string;
  children?: ReactNode;
  showIcon?: boolean;
  /** Variante pour analytics / style */
  variant?: "primary" | "secondary" | "nav";
};

/** Lien unique vers l’app CRM (accès direct). */
export function OpenNotaLink({
  className,
  children = CTA_LABEL,
  showIcon = true,
  variant = "primary",
}: OpenNotaLinkProps) {
  const isDefaultLabel = children === CTA_LABEL;

  return (
    <a
      href={APP_URL}
      rel="noopener noreferrer"
      data-cta={variant}
      // Évite le double annonce lecteur d’écran quand le libellé visible = CTA.
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
