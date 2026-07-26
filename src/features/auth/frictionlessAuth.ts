/**
 * Mode découverte : pas d’écran login, compte Firebase anonyme créé en silence.
 * Activer avec NEXT_PUBLIC_FRICTIONLESS_AUTH=true (désactiver = false).
 */
export function isFrictionlessAuthEnabled(): boolean {
  return process.env.NEXT_PUBLIC_FRICTIONLESS_AUTH?.trim() === "true";
}
