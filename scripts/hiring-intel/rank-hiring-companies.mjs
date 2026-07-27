#!/usr/bin/env node
/**
 * Rank French companies currently posting junior/mid software roles
 * via France Travail "Offres d'emploi" API.
 *
 * Proxy signal: open offers (not actual historical hires — those aren't public by company).
 *
 * Env:
 *   FRANCE_TRAVAIL_CLIENT_ID
 *   FRANCE_TRAVAIL_CLIENT_SECRET
 *
 * Usage:
 *   node scripts/hiring-intel/rank-hiring-companies.mjs [--days=90] [--top=50] [--contrat=CDI] [--remote]
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "output");

const TOKEN_URL =
  "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire";
const SEARCH_URL =
  "https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search";

/** ROME codes closest to software engineering / apps */
const ROME_CODES = [
  "M1805", // Études et développement informatique
  "M1801", // Administration de systèmes d'information
  "M1802", // Expertise et support en systèmes d'information
  "M1806", // Conseil et maîtrise d'ouvrage en SI
];

const JUNIOR_MID_RE =
  /\b(junior|d[ée]butant|stage\s*fin\s*d['’]?[ée]tudes|premi[eè]re\s+exp[ée]rience|bac\s*\+?\s*[2345]|confirm[ée]|mid[\s-]?level|1\s*[-àa]\s*3\s*ans|2\s*[-àa]\s*5\s*ans|3\s*[-àa]\s*5\s*ans|peu\s+d['’]?exp[ée]rience)\b/i;

const SENIOR_ONLY_RE =
  /\b(senior|lead\b|principal|architecte|expert|staff\b|8\s*\+\s*ans|10\s*ans|manager\s+technique|engineering\s+manager)\b/i;

const REMOTE_RE =
  /\b(t[ée]l[ée]travail|remote|full[\s-]?remote|100\s*%\s*remote|hybride)\b/i;

const ESN_HINT_RE =
  /\b(alten|capgemini|sopra|steria|accenture|atos|cgi\b|devoteam|inetum|wavestone|asték|astek|aubay|keyrus|sqli|hardis|nexworld|modis|akka|altran|sii\b|neosoft|groupe\s+sii)\b/i;

function parseArgs(argv) {
  const opts = {
    days: 120,
    top: 60,
    contrat: "",
    remote: false,
    out: path.join(OUT_DIR, "ranking-companies.csv"),
    raw: path.join(OUT_DIR, "offers-raw.json"),
  };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith("--days=")) opts.days = Number(arg.slice(7));
    else if (arg.startsWith("--top=")) opts.top = Number(arg.slice(6));
    else if (arg.startsWith("--contrat=")) opts.contrat = arg.slice(10);
    else if (arg === "--remote") opts.remote = true;
    else if (arg.startsWith("--out=")) opts.out = arg.slice(6);
    else if (arg.startsWith("--raw=")) opts.raw = arg.slice(6);
  }
  return opts;
}

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env ${name}`);
    console.error("Get credentials at https://francetravail.io/data/api/offres-emploi");
    process.exit(1);
  }
  return v;
}

async function getToken(clientId, clientSecret) {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope: "api_offresdemploiv2 o2dsoffre",
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    throw new Error(`Token error ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  return json.access_token;
}

async function searchPage(token, params) {
  const url = new URL(SEARCH_URL);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  if (res.status === 204) return { resultats: [], total: 0 };
  if (!res.ok) {
    throw new Error(`Search error ${res.status}: ${await res.text()}`);
  }
  const total = Number(res.headers.get("Content-Range")?.split("/")?.[1] || 0);
  const json = await res.json();
  return { resultats: json.resultats || [], total };
}

async function fetchAllOffers(token, { contrat }) {
  const pageSize = 150;
  const all = [];
  const seen = new Set();

  for (const rome of ROME_CODES) {
    let from = 0;
    let total = Infinity;
    while (from < total && from < 1500) {
      const to = from + pageSize - 1;
      const { resultats, total: t } = await searchPage(token, {
        codeROME: rome,
        typeContrat: contrat || undefined,
        range: `${from}-${to}`,
        sort: 1,
      });
      if (Number.isFinite(t) && t > 0) total = t;
      if (!resultats.length) break;
      for (const o of resultats) {
        if (o.id && !seen.has(o.id)) {
          seen.add(o.id);
          all.push(o);
        }
      }
      from += pageSize;
      await sleep(120);
    }

    // Also keyword pass for web stacks (catches some non-ROME tagged offers)
    for (const motsCles of ["développeur web", "développeur fullstack", "Next.js", "React"]) {
      let fromKw = 0;
      for (let i = 0; i < 3; i++) {
        const to = fromKw + pageSize - 1;
        const { resultats } = await searchPage(token, {
          motsCles,
          typeContrat: contrat || undefined,
          range: `${fromKw}-${to}`,
          sort: 1,
        });
        if (!resultats.length) break;
        for (const o of resultats) {
          if (o.id && !seen.has(o.id)) {
            seen.add(o.id);
            all.push(o);
          }
        }
        fromKw += pageSize;
        await sleep(120);
      }
    }
  }

  return all;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function offerText(o) {
  return [o.intitule, o.description, o.appellationlibelle, o.romeLibelle]
    .filter(Boolean)
    .join("\n");
}

function isJuniorMid(o) {
  const text = offerText(o);
  if (SENIOR_ONLY_RE.test(text) && !JUNIOR_MID_RE.test(text)) return false;
  // Accept if explicit junior/mid OR generic "développeur" without senior markers
  if (JUNIOR_MID_RE.test(text)) return true;
  const title = o.intitule || "";
  if (/\b(d[ée]veloppeur|developer|software\s+engineer|ingénieur\s+logiciel|fullstack|full[\s-]?stack)\b/i.test(title)) {
    return !SENIOR_ONLY_RE.test(title);
  }
  return false;
}

function companyName(o) {
  return (o.entreprise?.nom || o.entreprise?.enseigne || "UNKNOWN").trim();
}

function csvEscape(v) {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

async function main() {
  const opts = parseArgs(process.argv);
  const clientId = requireEnv("FRANCE_TRAVAIL_CLIENT_ID");
  const clientSecret = requireEnv("FRANCE_TRAVAIL_CLIENT_SECRET");

  console.log("Auth France Travail…");
  const token = await getToken(clientId, clientSecret);

  console.log("Fetch offres (ROME + mots-clés)…");
  const raw = await fetchAllOffers(token, opts);
  console.log(`Offres collectées: ${raw.length}`);

  const cutoff = Date.now() - opts.days * 24 * 60 * 60 * 1000;
  const filtered = raw.filter((o) => {
    if (!isJuniorMid(o)) return false;
    if (opts.remote && !REMOTE_RE.test(offerText(o))) return false;
    const created = o.dateCreation ? Date.parse(o.dateCreation) : NaN;
    if (Number.isFinite(created) && created < cutoff) return false;
    return true;
  });
  console.log(`Après filtre junior/mid + ${opts.days}j: ${filtered.length}`);

  /** @type {Map<string, { count: number, remote: number, esn: boolean, sampleTitles: string[], latest: string, urls: string[] }>} */
  const byCompany = new Map();

  for (const o of filtered) {
    const name = companyName(o);
    const key = name.toLowerCase();
    let row = byCompany.get(key);
    if (!row) {
      row = {
        name,
        count: 0,
        remote: 0,
        esn: ESN_HINT_RE.test(name),
        sampleTitles: [],
        latest: o.dateCreation || "",
        urls: [],
      };
      byCompany.set(key, row);
    }
    row.count += 1;
    if (REMOTE_RE.test(offerText(o))) row.remote += 1;
    if (o.dateCreation && o.dateCreation > row.latest) row.latest = o.dateCreation;
    if (row.sampleTitles.length < 3 && o.intitule) row.sampleTitles.push(o.intitule);
    const url = o.origineOffre?.urlOrigine || o.origineOffre?.partenaires?.[0]?.url || "";
    if (url && row.urls.length < 2) row.urls.push(url);
  }

  const ranked = [...byCompany.values()].sort((a, b) => b.count - a.count);
  const top = ranked.slice(0, opts.top);

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(opts.raw, JSON.stringify(filtered, null, 2), "utf8");

  const header = [
    "rank",
    "company",
    "offer_count",
    "remote_mentions",
    "likely_esn",
    "latest_offer",
    "sample_titles",
    "sample_urls",
  ];
  const lines = [header.join(",")];
  top.forEach((r, i) => {
    lines.push(
      [
        i + 1,
        csvEscape(r.name),
        r.count,
        r.remote,
        r.esn ? "yes" : "no",
        csvEscape(r.latest),
        csvEscape(r.sampleTitles.join(" | ")),
        csvEscape(r.urls.join(" | ")),
      ].join(",")
    );
  });
  await writeFile(opts.out, lines.join("\n") + "\n", "utf8");

  console.log("\n=== TOP entreprises (proxy offres junior/mid) ===\n");
  for (const [i, r] of top.slice(0, 25).entries()) {
    const tag = r.esn ? " [ESN?]" : "";
    console.log(
      `${String(i + 1).padStart(2)}. ${r.name}${tag} — ${r.count} offres (latest ${r.latest?.slice(0, 10) || "?"})`
    );
  }
  console.log(`\nCSV: ${opts.out}`);
  console.log(`RAW: ${opts.raw}`);
  console.log(
    "\nRappel: ce n'est PAS le nombre d'embauches réelles — c'est le volume d'offres ouvertes (meilleur proxy public)."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
