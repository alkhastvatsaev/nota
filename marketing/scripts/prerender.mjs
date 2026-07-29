#!/usr/bin/env node
/**
 * Prerender SPA shells: title/description/canonical + HTML crawlable par page.
 * Patche aussi le JSON-LD WebPage (et FAQ) pour chaque URL.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = join(root, "dist");
const siteUrl = (process.env.VITE_SITE_URL || "https://heynota.app").replace(/\/$/, "");
const portfolioUrl = "https://alkhastvatsaev.dev";
const personId = `${portfolioUrl}/#person`;
const snapshotPath = join(dist, "prerender-pages.json");

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageUrl(path) {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

function patchJsonLd(html, page) {
  const url = pageUrl(page.path);
  return html.replace(
    /<script type="application\/ld\+json" id="nota-jsonld">([\s\S]*?)<\/script>/,
    (_m, raw) => {
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        return _m;
      }
      const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [];
      const webpage = graph.find((g) => g["@type"] === "WebPage");
      if (webpage) {
        webpage.url = url;
        webpage["@id"] = `${url}#webpage`;
        webpage.name = page.title;
        webpage.description = page.description;
        webpage.about = { "@id": `${siteUrl}/#software` };
        if (page.path === "/") {
          webpage.author = { "@id": personId };
        }
        delete webpage.mainEntity;
      }
      data["@graph"] =
        page.path === "/" ? graph : graph.filter((g) => g["@type"] !== "FAQPage");
      return `<script type="application/ld+json" id="nota-jsonld">${JSON.stringify(data)}</script>`;
    }
  );
}

function injectPage(html, page) {
  const url = pageUrl(page.path);
  const blocks = (page.blocks || []).slice(0, 28);
  const founderLine =
    page.path === "/"
      ? `<p><a href="${portfolioUrl}">Développé par Alkhast Vatsaev</a></p>`
      : "";
  const crawlable = `
  <main id="prerender">
    <h1>${escapeHtml(page.h1 || page.title)}</h1>
    <p>${escapeHtml(page.lead || page.description)}</p>
    ${blocks.map((b) => `<p>${escapeHtml(b)}</p>`).join("\n    ")}
    ${founderLine}
    <p><a href="${siteUrl}/contact">Contact</a> · <a href="https://app.heynota.app">Ouvrir Nota</a></p>
  </main>`;

  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`
    )
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escapeHtml(page.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(page.description)}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`
    );

  out = out.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${crawlable}\n    </div>`);
  return patchJsonLd(out, page);
}

function writePage(page, template) {
  const html = injectPage(template, page);
  if (page.path === "/") {
    writeFileSync(join(dist, "index.html"), html);
    return;
  }
  const dir = join(dist, page.path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

function main() {
  const templatePath = join(dist, "index.html");
  if (!existsSync(templatePath) || !existsSync(snapshotPath)) {
    console.error("prerender: missing dist/index.html or prerender-pages.json — run vite build first");
    process.exit(1);
  }
  const template = readFileSync(templatePath, "utf8");
  const pages = JSON.parse(readFileSync(snapshotPath, "utf8"));
  for (const page of pages) writePage(page, template);
  console.log(`prerender: ${pages.length} pages`);
}

main();
