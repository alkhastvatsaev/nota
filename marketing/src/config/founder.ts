import { SITE_URL } from "./site";

/** Nom affiché et indexé (requête marque personnelle). */
export const FOUNDER_FULL_NAME = "Alkhast Vatsaev";

export const FOUNDER_GIVEN_NAME = "Alkhast";
export const FOUNDER_FAMILY_NAME = "Vatsaev";

export const FOUNDER_JOB_TITLE = "Fondateur & développeur";

/** Page canonique profil fondateur (Person schema + H1). */
export const FOUNDER_PROFILE_PATH = "/alkhast-vatsaev";

export const FOUNDER_PROFILE_URL = `${SITE_URL}${FOUNDER_PROFILE_PATH}`;

/** Profils externes (sameAs) — renseigner dans Vercel pour renforcer le graphe Knowledge. */
const linkedIn = (import.meta.env?.VITE_FOUNDER_LINKEDIN ?? "").trim();
const github = (import.meta.env?.VITE_FOUNDER_GITHUB ?? "").trim();

export const FOUNDER_SAME_AS: string[] = [linkedIn, github].filter(Boolean);

export const FOUNDER_PERSON_ID = `${FOUNDER_PROFILE_URL}#person`;
