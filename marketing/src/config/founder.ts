import { SITE_URL } from "./site";

/** Nom affiché — une seule mention naturelle côté marketing. */
export const FOUNDER_FULL_NAME = "Alkhast Vatsaev";

export const FOUNDER_GIVEN_NAME = "Alkhast";
export const FOUNDER_FAMILY_NAME = "Vatsaev";

export const FOUNDER_JOB_TITLE = "Développeur Fullstack JavaScript/TypeScript";

/** Portfolio canonique — entité Person unique (ne pas dupliquer ici). */
export const PORTFOLIO_URL = "https://alkhastvatsaev.dev";

/** @id stable de l’entité Person (identique au portfolio). */
export const FOUNDER_PERSON_ID = `${PORTFOLIO_URL}/#person`;

/** Ancienne page satellite — redirect 301 vers le portfolio (vercel.json). */
export const FOUNDER_LEGACY_PATH = "/alkhast-vatsaev";

/** @deprecated Prefer PORTFOLIO_URL — kept for gradual cleanup. */
export const FOUNDER_PROFILE_PATH = FOUNDER_LEGACY_PATH;

export const FOUNDER_PROFILE_URL = PORTFOLIO_URL;

/** Wikidata items (2026-07) — ancre Knowledge Graph. */
export const FOUNDER_WIKIDATA_URL = "https://www.wikidata.org/wiki/Q140742680";
export const NOTA_CRM_WIKIDATA_URL = "https://www.wikidata.org/wiki/Q140743042";

const linkedIn = (import.meta.env?.VITE_FOUNDER_LINKEDIN ?? "").trim();
const github = (import.meta.env?.VITE_FOUNDER_GITHUB ?? "").trim();

export const FOUNDER_SAME_AS: string[] = [
  PORTFOLIO_URL,
  FOUNDER_WIKIDATA_URL,
  linkedIn,
  github,
].filter(Boolean);

export const NOTA_SAME_AS: string[] = [NOTA_CRM_WIKIDATA_URL, PORTFOLIO_URL, SITE_URL].filter(
  Boolean
);
