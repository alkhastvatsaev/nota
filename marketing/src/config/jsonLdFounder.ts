import {
  FOUNDER_FAMILY_NAME,
  FOUNDER_FULL_NAME,
  FOUNDER_GIVEN_NAME,
  FOUNDER_JOB_TITLE,
  FOUNDER_PERSON_ID,
  FOUNDER_PROFILE_URL,
  FOUNDER_SAME_AS,
  PORTFOLIO_URL,
} from "./founder";

/**
 * Référence légère vers l’entité Person du portfolio.
 * Ne pas inventer un second @id sur heynota.app.
 */
export function buildFounderPersonNode(_siteUrl: string): Record<string, unknown> {
  return {
    "@type": "Person",
    "@id": FOUNDER_PERSON_ID,
    name: FOUNDER_FULL_NAME,
    givenName: FOUNDER_GIVEN_NAME,
    familyName: FOUNDER_FAMILY_NAME,
    jobTitle: FOUNDER_JOB_TITLE,
    url: FOUNDER_PROFILE_URL,
    sameAs: FOUNDER_SAME_AS.length > 0 ? FOUNDER_SAME_AS : [PORTFOLIO_URL],
  };
}

/** Liens Organization ↔ fondateur + noms de marque. */
export function organizationFounderFields(_siteUrl: string): Record<string, unknown> {
  return {
    founder: { "@id": FOUNDER_PERSON_ID },
    employee: { "@id": FOUNDER_PERSON_ID },
    alternateName: ["Nota CRM", "HeyNota", "heynota"],
  };
}
