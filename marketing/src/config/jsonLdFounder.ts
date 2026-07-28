import {
  FOUNDER_FAMILY_NAME,
  FOUNDER_FULL_NAME,
  FOUNDER_GIVEN_NAME,
  FOUNDER_JOB_TITLE,
  FOUNDER_PERSON_ID,
  FOUNDER_PROFILE_URL,
  FOUNDER_SAME_AS,
} from "./founder";

/** Entité Person schema.org — réutilisée au build statique et en SPA. */
export function buildFounderPersonNode(siteUrl: string): Record<string, unknown> {
  const node: Record<string, unknown> = {
    "@type": "Person",
    "@id": FOUNDER_PERSON_ID,
    name: FOUNDER_FULL_NAME,
    givenName: FOUNDER_GIVEN_NAME,
    familyName: FOUNDER_FAMILY_NAME,
    jobTitle: FOUNDER_JOB_TITLE,
    url: FOUNDER_PROFILE_URL,
    worksFor: { "@id": `${siteUrl}/#organization` },
    knowsAbout: [
      "CRM",
      "logiciel interventions terrain",
      "applications web",
      "gestion d'équipes terrain",
    ],
  };
  if (FOUNDER_SAME_AS.length > 0) {
    node.sameAs = FOUNDER_SAME_AS;
  }
  return node;
}

/** Liens Organization ↔ fondateur (E-E-A-T). */
export function organizationFounderFields(siteUrl: string): Record<string, unknown> {
  return {
    founder: { "@id": FOUNDER_PERSON_ID },
    employee: { "@id": FOUNDER_PERSON_ID },
  };
}
