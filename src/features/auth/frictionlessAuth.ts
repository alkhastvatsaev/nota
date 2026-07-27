/**
 * Mode découverte / promesse marketing « Ouvrir Nota » sans écran login.
 *
 * - `NEXT_PUBLIC_FRICTIONLESS_AUTH=true` → activé
 * - `NEXT_PUBLIC_FRICTIONLESS_AUTH=false` → désactivé
 * - sinon : activé si `NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID` est défini
 *   (société cible pour join-default + portail /m/demande)
 */
export function isFrictionlessAuthEnabled(): boolean {
  const explicit = process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH?.trim();
  if (explicit === "true") return true;
  if (explicit === "false") return false;
  const companyId = process.env.NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID?.trim();
  return Boolean(companyId);
}

/** Société Firestore requise pour rattacher les visiteurs (join-default). */
export function readOpenAccessDefaultCompanyId(): string {
  return process.env.NEXT_PUBLIC_CLIENT_PORTAL_DEFAULT_COMPANY_ID?.trim() ?? "";
}

export function isOpenAccessCompanyConfigured(): boolean {
  return readOpenAccessDefaultCompanyId().length > 0;
}

/** Production : autorise POST /api/company/join-default (visiteurs « Ouvrir Nota »). */
export function isOpenStaffJoinAllowed(): boolean {
  if (process.env.ALLOW_OPEN_STAFF_JOIN?.trim() === "true") return true;
  return isFrictionlessAuthEnabled();
}
