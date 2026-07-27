"use client";

import AppBootLoadingScreen from "@/core/ui/AppBootLoadingScreen";
import { useCompanyWorkspaceOptional } from "@/context/CompanyWorkspaceContext";
import {
  isFrictionlessAuthEnabled,
  isOpenAccessCompanyConfigured,
} from "@/features/auth/frictionlessAuth";

/**
 * Visiteurs depuis heynota.app : rattachement société (join-default) visible
 * au lieu d’un dashboard vide sans message.
 */
export default function CompanyWorkspaceBootstrapOverlay() {
  const workspace = useCompanyWorkspaceOptional();
  const frictionless = isFrictionlessAuthEnabled();
  const companyConfigured = isOpenAccessCompanyConfigured();

  if (!frictionless || !workspace) return null;

  if (!companyConfigured) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 p-6"
        role="alert"
        data-testid="open-nota-misconfig-company"
      >
        <div className="max-w-md rounded-2xl border border-destructive/40 bg-card p-6 text-center shadow-lg">
          <p className="font-semibold text-foreground">Espace société non configuré</p>
          <p className="mt-2 text-sm text-muted-foreground">
            L’administrateur doit définir{" "}
            <code className="text-xs">NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID</code> sur l’app
            (Vercel projet nota), puis redéployer.
          </p>
        </div>
      </div>
    );
  }

  if (workspace.membershipJoinError) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 p-6"
        role="alert"
        data-testid="open-nota-join-error"
      >
        <div className="max-w-md rounded-2xl border border-destructive/40 bg-card p-6 text-center shadow-lg">
          <p className="font-semibold text-foreground">Impossible d’ouvrir votre espace</p>
          <p className="mt-2 text-sm text-muted-foreground">{workspace.membershipJoinError}</p>
          <button
            type="button"
            className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
            onClick={() => void workspace.retryDefaultCompanyJoin()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (workspace.membershipJoinPending) {
    return <AppBootLoadingScreen variant="fixed" testId="open-nota-join-pending" />;
  }

  if (workspace.workspaceReady && !workspace.isTenantUser) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 p-6"
        role="alert"
        data-testid="open-nota-not-tenant"
      >
        <div className="max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-lg">
          <p className="font-semibold text-foreground">Accès incomplet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Votre compte n’est pas encore rattaché à une société. Réessayez ou connectez-vous avec
            un compte invité.
          </p>
          <button
            type="button"
            className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
            onClick={() => void workspace.retryDefaultCompanyJoin()}
          >
            Rattacher à la société
          </button>
        </div>
      </div>
    );
  }

  return null;
}
