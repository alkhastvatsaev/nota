#!/usr/bin/env node
/**
 * Audit SEO statique (normes Google Search / Search Console).
 * Usage: node scripts/seo-audit.mjs [chemin-dist]
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.argv[2] ?? "dist");
const errors = [];
const warnings = [];
const ok = [];

function read(path) {
  const full = resolve(root, path);
  if (!existsSync(full)) {
    errors.push(`Manquant: ${path}`);
    return null;
  }
  return readFileSync(full, "utf8");
}

function check(name, pass, detail = "") {
  if (pass) ok.push(`${name}${detail ? ` — ${detail}` : ""}`);
  else errors.push(`${name}${detail ? ` — ${detail}` : ""}`);
}

function warn(name, detail) {
  warnings.push(`${name} — ${detail}`);
}

const html = read("index.html");
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");

check("robots.txt présent", Boolean(robots));
check("sitemap.xml présent", Boolean(sitemap));
check("og-image.png", existsSync(resolve(root, "og-image.png")));
check("favicon.svg", existsSync(resolve(root, "favicon.svg")));
check("404.html noindex", existsSync(resolve(root, "404.html")));

if (robots) {
  check("robots Allow", /Allow:\s*\//i.test(robots));
  check("robots Sitemap", /Sitemap:\s*https?:\/\//i.test(robots));
}

if (sitemap) {
  check("sitemap url loc", /<loc>https?:\/\/.+<\/loc>/.test(sitemap));
  check("sitemap lastmod", /<lastmod>/.test(sitemap));
  check(
    "sitemap 3 pages",
    (sitemap.match(/<loc>/g) || []).length >= 3,
    `${(sitemap.match(/<loc>/g) || []).length} URLs`,
  );
  check(
    "sitemap crm-sans-inscription",
    /crm-sans-inscription/.test(sitemap),
  );
  check(
    "sitemap alternative-excel",
    /alternative-excel-commercial/.test(sitemap),
  );
  check("sitemap sans page satellite nom", !/alkhast-vatsaev/.test(sitemap));
  check("sitemap home", /heynota\.app\/?</.test(sitemap) || /heynota\.app\/<\/loc>/.test(sitemap) || /<loc>https:\/\/heynota\.app\/<\/loc>/.test(sitemap));
}

if (html) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  const desc =
    html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
    )?.[1] ??
    html.match(
      /content=["']([^"']*)["'][^>]+name=["']description["']/i,
    )?.[1] ??
    "";

  check("lang=fr", /<html[^>]+lang=["']fr["']/i.test(html));
  check("title présent", title.length > 0, `"${title}" (${title.length} car.)`);
  if (title.length && (title.length < 30 || title.length > 65)) {
    warn("title longueur", `idéal ~50–60 car. (actuel ${title.length})`);
  }

  check(
    "meta description",
    desc.length > 0,
    `${desc.length} car.`,
  );
  if (desc.length && (desc.length < 70 || desc.length > 165)) {
    warn(
      "description longueur",
      `idéal ~120–160 car. (actuel ${desc.length})`,
    );
  }

  check("canonical", /rel=["']canonical["']/i.test(html));
  check("robots index,follow", /content=["'][^"']*index[^"']*follow/i.test(html));
  check("og:title", /property=["']og:title["']/i.test(html));
  check("og:description", /property=["']og:description["']/i.test(html));
  check("og:image", /property=["']og:image["']/i.test(html));
  check("twitter:card", /name=["']twitter:card["']/i.test(html));
  check("JSON-LD", /application\/ld\+json/i.test(html));
  check("FAQPage schema", /"@type"\s*:\s*"FAQPage"/i.test(html));
  check("SoftwareApplication", /"@type"\s*:\s*"SoftwareApplication"/i.test(html));
  check("Person schema (fondateur)", /"@type"\s*:\s*"Person"/i.test(html));
  check(
    "Person @id portfolio",
    /alkhastvatsaev\.dev\/#person/.test(html),
  );
  check(
    "pas de page satellite dans HTML",
    !/heynota\.app\/alkhast-vatsaev/.test(html),
  );
  check("link rel=author", /rel=["']author["']/i.test(html));
  check("h1 crawlable", /<h1[\s>]/i.test(html));
  check("contenu #root", /id=["']root["'][\s\S]*<h1/i.test(html));

  if (/name=["']keywords["']/i.test(html)) {
    warn("meta keywords", "ignoré par Google — à éviter");
  }
  if (/aggregateRating/i.test(html)) {
    errors.push(
      "aggregateRating détecté — n’ajoutez des avis que s’ils sont réels",
    );
  }
}

console.log("\n=== Audit SEO Nota ===\n");
for (const line of ok) console.log(`OK   ${line}`);
for (const line of warnings) console.log(`WARN ${line}`);
for (const line of errors) console.log(`FAIL ${line}`);
console.log(
  `\nRésumé: ${ok.length} ok · ${warnings.length} warn · ${errors.length} fail\n`,
);

process.exit(errors.length ? 1 : 0);
