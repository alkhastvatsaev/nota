import { SITE_URL } from "./site";

/** Nom affiché et indexé (requête marque personnelle). */
export const FOUNDER_FULL_NAME = "Alkhast Vatsaev";

export const FOUNDER_GIVEN_NAME = "Alkhast";
export const FOUNDER_FAMILY_NAME = "Vatsaev";

export const FOUNDER_JOB_TITLE = "Fondateur & développeur de Nota CRM";

/** Page canonique profil fondateur (Person schema + H1). */
export const FOUNDER_PROFILE_PATH = "/alkhast-vatsaev";

export const FOUNDER_PROFILE_URL = `${SITE_URL}${FOUNDER_PROFILE_PATH}`;

/** Wikidata item (créé 2026-07) — ancre Knowledge Graph. */
export const FOUNDER_WIKIDATA_URL = "https://www.wikidata.org/wiki/Q140742680";

/** Profils externes (sameAs) — LinkedIn/GitHub via env Vercel si dispo. */
const linkedIn = (import.meta.env?.VITE_FOUNDER_LINKEDIN ?? "").trim();
const github = (import.meta.env?.VITE_FOUNDER_GITHUB ?? "").trim();

export const FOUNDER_SAME_AS: string[] = [FOUNDER_WIKIDATA_URL, linkedIn, github].filter(Boolean);

export const FOUNDER_PERSON_ID = `${FOUNDER_PROFILE_URL}#person`;
