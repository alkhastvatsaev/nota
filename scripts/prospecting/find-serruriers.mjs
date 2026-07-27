#!/usr/bin/env node
/**
 * Prospection ciblée : serruriers indépendants contactables en France.
 *
 * Objectif : ~150 contacts QUALIFIÉS (pas 600 au hasard) pour viser 2–3 clients payants.
 *
 * Ciblage (cf. ICP NOTA) :
 * - Artisan / TPE de serrurerie avec probable petite équipe (2–10 techniciens)
 * - Joignable en direct (mobile 06/07 privilégié)
 * - Entreprise réelle et vérifiable (nom propre, SIREN/SIRET, site, adresse)
 * - Écarte les agrégateurs / plateformes d'urgence "SOS / allo / 24-24 / express"
 * - Répartition géographique large (cap par ville) pour ne pas tout centrer sur Paris
 *
 * Source : OpenStreetMap (Overpass) — coordonnées publiques.
 *
 * Usage :
 *   node scripts/prospecting/find-serruriers.mjs
 *   node scripts/prospecting/find-serruriers.mjs --limit 150 --max-per-city 6
 *   node scripts/prospecting/find-serruriers.mjs --min-score 4 --mobile-only
 *   node scripts/prospecting/find-serruriers.mjs --output ./prospects.csv
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const DEFAULT_LIMIT = 150;
const DEFAULT_MAX_PER_CITY = 6;
const DEFAULT_MIN_SCORE = 0;
const DEFAULT_OUTPUT = "scripts/prospecting/output/serruriers.csv";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const BASE_DELAY_MS = 2000;

const CITY_BBOXES = [
  { name: "Paris", south: 48.78, west: 2.18, north: 48.96, east: 2.52 },
  { name: "Lyon", south: 45.68, west: 4.72, north: 45.82, east: 4.95 },
  { name: "Marseille", south: 43.18, west: 5.28, north: 43.38, east: 5.52 },
  { name: "Toulouse", south: 43.52, west: 1.36, north: 43.68, east: 1.52 },
  { name: "Nice", south: 43.64, west: 7.18, north: 43.78, east: 7.32 },
  { name: "Nantes", south: 47.16, west: -1.62, north: 47.28, east: -1.48 },
  { name: "Montpellier", south: 43.56, west: 3.82, north: 43.66, east: 3.96 },
  { name: "Strasbourg", south: 48.52, west: 7.68, north: 48.62, east: 7.82 },
  { name: "Bordeaux", south: 44.78, west: -0.68, north: 44.9, east: -0.48 },
  { name: "Lille", south: 50.58, west: 2.96, north: 50.66, east: 3.12 },
  { name: "Rennes", south: 48.06, west: -1.72, north: 48.14, east: -1.6 },
  { name: "Reims", south: 49.22, west: 3.98, north: 49.3, east: 4.08 },
  { name: "Le Havre", south: 49.46, west: 0.06, north: 49.54, east: 0.16 },
  { name: "Saint-Étienne", south: 45.4, west: 4.34, north: 45.48, east: 4.44 },
  { name: "Toulon", south: 43.08, west: 5.9, north: 43.16, east: 6.02 },
  { name: "Grenoble", south: 45.14, west: 5.68, north: 45.22, east: 5.78 },
  { name: "Dijon", south: 47.28, west: 4.98, north: 47.36, east: 5.1 },
  { name: "Angers", south: 47.44, west: -0.62, north: 47.5, east: -0.5 },
  { name: "Nîmes", south: 43.8, west: 4.3, north: 43.88, east: 4.42 },
  { name: "Villeurbanne", south: 45.74, west: 4.84, north: 45.8, east: 4.92 },
  { name: "Clermont-Ferrand", south: 45.74, west: 3.04, north: 45.82, east: 3.14 },
  { name: "Aix-en-Provence", south: 43.48, west: 5.38, north: 43.56, east: 5.48 },
  { name: "Brest", south: 48.36, west: -4.54, north: 48.42, east: -4.42 },
  { name: "Tours", south: 47.36, west: 0.64, north: 47.42, east: 0.72 },
  { name: "Amiens", south: 49.86, west: 2.26, north: 49.92, east: 2.34 },
  { name: "Limoges", south: 45.8, west: 1.22, north: 45.88, east: 1.32 },
  { name: "Perpignan", south: 42.66, west: 2.86, north: 42.74, east: 2.94 },
  { name: "Metz", south: 49.08, west: 6.14, north: 49.14, east: 6.22 },
  { name: "Besançon", south: 47.22, west: 5.98, north: 47.28, east: 6.08 },
  { name: "Orléans", south: 47.86, west: 1.86, north: 47.94, east: 1.96 },
  { name: "Rouen", south: 49.4, west: 1.04, north: 49.48, east: 1.14 },
  { name: "Mulhouse", south: 47.72, west: 7.3, north: 47.78, east: 7.4 },
  { name: "Caen", south: 49.16, west: -0.42, north: 49.22, east: -0.32 },
  { name: "Nancy", south: 48.66, west: 6.14, north: 48.72, east: 6.22 },
  { name: "Avignon", south: 43.92, west: 4.76, north: 43.98, east: 4.86 },
  { name: "Poitiers", south: 46.56, west: 0.3, north: 46.62, east: 0.38 },
  { name: "Pau", south: 43.28, west: -0.42, north: 43.34, east: -0.32 },
  { name: "La Rochelle", south: 46.14, west: -1.2, north: 46.2, east: -1.1 },
  { name: "Calais", south: 50.92, west: 1.82, north: 50.98, east: 1.9 },
  { name: "Valence", south: 44.9, west: 4.86, north: 44.96, east: 4.94 },
  { name: "Troyes", south: 48.28, west: 4.04, north: 48.34, east: 4.12 },
  { name: "Annecy", south: 45.88, west: 6.08, north: 45.94, east: 6.16 },
  { name: "Chambéry", south: 45.56, west: 5.9, north: 45.62, east: 5.98 },
  { name: "Lorient", south: 47.72, west: -3.4, north: 47.78, east: -3.32 },
  { name: "Niort", south: 46.3, west: -0.5, north: 46.36, east: -0.42 },
  { name: "Béziers", south: 43.32, west: 3.18, north: 43.38, east: 3.26 },
  { name: "Cannes", south: 43.54, west: 7.0, north: 43.58, east: 7.06 },
  { name: "Antibes", south: 43.56, west: 7.1, north: 43.62, east: 7.16 },
  { name: "Saint-Nazaire", south: 47.26, west: -2.24, north: 47.32, east: -2.16 },
  { name: "Colmar", south: 48.06, west: 7.34, north: 48.12, east: 7.42 },
  { name: "Quimper", south: 47.98, west: -4.12, north: 48.04, east: -4.04 },
  { name: "Bayonne", south: 43.48, west: -1.52, north: 43.52, east: -1.44 },
  { name: "Bourges", south: 47.06, west: 2.36, north: 47.12, east: 2.44 },
  { name: "Chartres", south: 48.42, west: 1.46, north: 48.48, east: 1.52 },
  { name: "Versailles", south: 48.78, west: 2.1, north: 48.84, east: 2.16 },
  { name: "Argenteuil", south: 48.92, west: 2.22, north: 48.98, east: 2.3 },
  { name: "Montreuil", south: 48.84, west: 2.42, north: 48.88, east: 2.46 },
];

/** Marqueurs d'enseignes d'urgence / agrégateurs / lead-gen : moins bon ICP. */
const AGGREGATOR_PATTERNS = [
  /\bsos\b/i,
  /\ballo\b/i,
  /24\s*[\/h-]?\s*24/i,
  /7\s*[\/j-]?\s*7/i,
  /\burgen/i,
  /\bexpress\b/i,
  /\bdepann?age\b.*\bnational\b/i,
  /\blow\s*cost\b/i,
  /pas\s*cher/i,
  /\bh24\b/i,
];

/** Noms trop génériques : impossible d'identifier une vraie entreprise ciblable. */
const GENERIC_NAME_PATTERNS = [
  /^serrurier$/i,
  /^serrurerie$/i,
  /^serrurerie\s+d[ée]pannage$/i,
  /^d[ée]pannage$/i,
  /^cordonnerie$/i,
];

function parseArgs(argv) {
  let limit = DEFAULT_LIMIT;
  let maxPerCity = DEFAULT_MAX_PER_CITY;
  let minScore = DEFAULT_MIN_SCORE;
  let mobileOnly = false;
  let output = DEFAULT_OUTPUT;

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--limit" && argv[i + 1]) {
      limit = Number(argv[++i]);
    } else if (arg === "--max-per-city" && argv[i + 1]) {
      maxPerCity = Number(argv[++i]);
    } else if (arg === "--min-score" && argv[i + 1]) {
      minScore = Number(argv[++i]);
    } else if (arg === "--mobile-only") {
      mobileOnly = true;
    } else if (arg === "--output" && argv[i + 1]) {
      output = argv[++i];
    } else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/prospecting/find-serruriers.mjs [options]",
          "",
          "  --limit N          Nombre de prospects à exporter (défaut 150)",
          "  --max-per-city N   Cap par ville pour diversifier (défaut 6)",
          "  --min-score N      Score de qualification minimum (défaut 0)",
          "  --mobile-only      Ne garder que les mobiles 06/07",
          "  --output fichier   Chemin du CSV de sortie",
        ].join("\n")
      );
      process.exit(0);
    }
  }

  if (!Number.isFinite(limit) || limit < 1) throw new Error("--limit doit être un entier positif");
  if (!Number.isFinite(maxPerCity) || maxPerCity < 1) throw new Error("--max-per-city doit être un entier positif");
  if (!Number.isFinite(minScore)) throw new Error("--min-score doit être un nombre");

  return { limit, maxPerCity, minScore, mobileOnly, output: resolve(output) };
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function digitsOf(raw) {
  return String(raw ?? "").replace(/[^\d+]/g, "");
}

function toLocalFrenchNumber(raw) {
  const digits = digitsOf(raw);
  if (!digits) return "";
  if (digits.startsWith("+33")) {
    const local = digits.slice(3).replace(/^0/, "");
    return local.length === 9 ? `0${local}` : "";
  }
  if (digits.startsWith("33") && digits.length >= 11) {
    const local = digits.slice(2).replace(/^0/, "");
    return local.length === 9 ? `0${local}` : "";
  }
  if (/^0\d{9}$/.test(digits)) return digits;
  return "";
}

function normalizePhone(raw) {
  const local = toLocalFrenchNumber(raw);
  if (local) {
    return `${local.slice(0, 2)} ${local.slice(2, 4)} ${local.slice(4, 6)} ${local.slice(6, 8)} ${local.slice(8, 10)}`;
  }
  return String(raw ?? "").trim();
}

/** true si le numéro est un mobile FR (06 / 07). */
function isMobile(raw) {
  const local = toLocalFrenchNumber(raw);
  return local ? /^0[67]/.test(local) : false;
}

function normalizeEmail(raw) {
  if (!raw) return "";
  const email = String(raw).trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

function pickTag(tags, keys) {
  for (const key of keys) {
    const value = tags?.[key];
    if (value && String(value).trim()) return String(value).trim();
  }
  return "";
}

function buildAddress(tags) {
  const parts = [
    [pickTag(tags, ["contact:housenumber", "addr:housenumber"]), pickTag(tags, ["contact:street", "addr:street"])]
      .filter(Boolean)
      .join(" "),
    pickTag(tags, ["contact:postcode", "addr:postcode"]),
    pickTag(tags, ["contact:city", "addr:city"]),
  ].filter(Boolean);

  return parts.join(", ");
}

function isContactable(entry) {
  return Boolean(entry.telephone || entry.email);
}

function looksLikeAggregator(name) {
  return AGGREGATOR_PATTERNS.some((pattern) => pattern.test(name));
}

function looksGeneric(name) {
  return GENERIC_NAME_PATTERNS.some((pattern) => pattern.test(name.trim()));
}

/**
 * Score de qualification (0–10) selon la probabilité d'être une TPE serrurerie ciblable.
 * Renvoie aussi les raisons pour la colonne "note_ciblage".
 */
function qualify(entry) {
  let score = 0;
  const reasons = [];

  if (entry.mobile) {
    score += 3;
    reasons.push("mobile direct");
  } else if (entry.telephone) {
    score += 1;
    reasons.push("tél fixe");
  }

  if (entry.siret || entry.siren) {
    score += 2;
    reasons.push("SIREN/SIRET vérifiable");
  }

  if (!looksGeneric(entry.nom) && entry.nom !== "Serrurier") {
    score += 2;
    reasons.push("nom d'entreprise propre");
  }

  if (entry.site_web) {
    score += 1;
    reasons.push("site web");
  }

  if (entry.email) {
    score += 1;
    reasons.push("email");
  }

  if (entry.adresse) {
    score += 1;
    reasons.push("adresse (boutique/atelier)");
  }

  if (looksLikeAggregator(entry.nom)) {
    score -= 3;
    reasons.push("⚠ enseigne urgence/agrégateur");
  }

  return { score: Math.max(0, score), reasons };
}

function priorityLabel(score) {
  if (score >= 6) return "Haute";
  if (score >= 4) return "Moyenne";
  return "Basse";
}

/** Overpass est agressif sur le rate-limit : on retente avec backoff sur 429/504. */
async function fetchOsmLocksmiths(bbox, maxRetries = 4) {
  const query = `
    [out:json][timeout:25];
    (
      node["shop"="locksmith"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
      way["shop"="locksmith"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
      node["craft"="locksmith"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
      way["craft"="locksmith"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
    );
    out center tags;
  `;

  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      const response = await fetch(OVERPASS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "User-Agent": "NOTA-prospecting/1.0",
        },
        body: `data=${encodeURIComponent(query)}`,
      });

      if (!response.ok) throw new Error(`Overpass ${response.status}`);

      const data = await response.json();
      return Array.isArray(data.elements) ? data.elements : [];
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const wait = 3000 * 2 ** attempt + Math.floor(Math.random() * 1000);
        await sleep(wait);
      }
    }
  }

  throw lastError ?? new Error("Overpass: échec inconnu");
}

function osmElementToEntry(element, cityName) {
  const tags = element.tags ?? {};
  const lat = element.lat ?? element.center?.lat ?? "";
  const lon = element.lon ?? element.center?.lon ?? "";

  const phoneRaw = pickTag(tags, ["contact:phone", "phone", "contact:mobile", "mobile"]);

  const entry = {
    source: "openstreetmap",
    nom: pickTag(tags, ["name", "operator", "brand"]) || "Serrurier",
    ville: pickTag(tags, ["contact:city", "addr:city"]) || cityName,
    zone: cityName,
    code_postal: pickTag(tags, ["contact:postcode", "addr:postcode"]),
    adresse: buildAddress(tags),
    telephone: normalizePhone(phoneRaw),
    mobile: isMobile(phoneRaw),
    email: normalizeEmail(pickTag(tags, ["contact:email", "email"])),
    site_web: pickTag(tags, ["contact:website", "website", "url"]),
    siret: pickTag(tags, ["ref:FR:SIRET", "ref:siret"]),
    siren: pickTag(tags, ["ref:FR:SIREN", "ref:siren"]),
    latitude: lat,
    longitude: lon,
  };

  const { score, reasons } = qualify(entry);
  entry.score = score;
  entry.priorite = priorityLabel(score);
  entry.note_ciblage = reasons.join(", ");
  return entry;
}

function dedupeKey(entry) {
  const phone = entry.telephone.replace(/\s/g, "");
  if (phone) return `tel:${phone}`;
  if (entry.email) return `email:${entry.email}`;
  return `name:${entry.nom.toLowerCase()}|${entry.ville.toLowerCase()}`;
}

/**
 * Sélection diversifiée : trie par score décroissant puis remplit en respectant
 * un cap par ville, afin d'éviter une liste 100 % parisienne.
 */
function selectDiversified(entries, limit, maxPerCity) {
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const perCity = new Map();
  const selected = [];
  const overflow = [];

  for (const entry of sorted) {
    if (selected.length >= limit) break;
    const count = perCity.get(entry.zone) ?? 0;
    if (count < maxPerCity) {
      perCity.set(entry.zone, count + 1);
      selected.push(entry);
    } else {
      overflow.push(entry);
    }
  }

  for (const entry of overflow) {
    if (selected.length >= limit) break;
    selected.push(entry);
  }

  return selected;
}

const CSV_COLUMNS = [
  ["priorite", "priorite"],
  ["score", "score"],
  ["nom", "nom"],
  ["ville", "ville"],
  ["code_postal", "code_postal"],
  ["adresse", "adresse"],
  ["telephone", "telephone"],
  ["type_tel", (e) => (e.mobile ? "mobile" : e.telephone ? "fixe" : "")],
  ["email", "email"],
  ["site_web", "site_web"],
  ["siret", "siret"],
  ["siren", "siren"],
  ["note_ciblage", "note_ciblage"],
  ["statut", () => "À appeler"],
  ["prochaine_action", () => ""],
  ["notes_appel", () => ""],
  ["source", "source"],
];

function toCsvRow(entry) {
  return CSV_COLUMNS.map(([, accessor]) => {
    const value = typeof accessor === "function" ? accessor(entry) : entry[accessor];
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
  }).join(";");
}

async function main() {
  const { limit, maxPerCity, minScore, mobileOnly, output } = parseArgs(process.argv);
  const all = [];
  const seen = new Set();

  function addEntry(entry) {
    if (!isContactable(entry)) return false;
    if (mobileOnly && !entry.mobile) return false;
    if (entry.score < minScore) return false;
    const key = dedupeKey(entry);
    if (seen.has(key)) return false;
    seen.add(key);
    all.push(entry);
    return true;
  }

  console.log(
    `Prospection ciblée : ${limit} serruriers | cap ${maxPerCity}/ville | score min ${minScore}${mobileOnly ? " | mobiles only" : ""}`
  );

  for (const city of CITY_BBOXES) {
    try {
      const elements = await fetchOsmLocksmiths(city);
      let added = 0;
      for (const element of elements) {
        if (addEntry(osmElementToEntry(element, city.name))) added += 1;
      }
      console.log(`  ${city.name}: +${added} qualifiés (pool ${all.length})`);
    } catch (error) {
      console.warn(`  ${city.name}: échec (${error instanceof Error ? error.message : error})`);
    }
    await sleep(BASE_DELAY_MS);
  }

  const selected = selectDiversified(all, limit, maxPerCity);

  if (selected.length < limit) {
    console.warn(`\nAttention : seulement ${selected.length} prospects qualifiés trouvés.`);
    console.warn("→ Baisse --min-score, augmente --max-per-city, ou ajoute des villes.");
  }

  const header = CSV_COLUMNS.map(([name]) => name).join(";");
  const csv = [header, ...selected.map(toCsvRow)].join("\n");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${csv}\n`, "utf8");

  const haute = selected.filter((e) => e.priorite === "Haute").length;
  const moyenne = selected.filter((e) => e.priorite === "Moyenne").length;
  const villes = new Set(selected.map((e) => e.zone)).size;

  console.log(`\nExport : ${output}`);
  console.log(`Prospects : ${selected.length} (répartis sur ${villes} villes)`);
  console.log(`Priorité Haute : ${haute} | Moyenne : ${moyenne} | Basse : ${selected.length - haute - moyenne}`);
  console.log(`Avec mobile : ${selected.filter((e) => e.mobile).length} | avec email : ${selected.filter((e) => e.email).length}`);
  console.log(`\nConseil : appelle d'abord les "Haute" avec mobile. Vise 30 démos → 5 essais → 2–3 payants.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
