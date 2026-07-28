#!/usr/bin/env node
/**
 * Prerender SPA shells: title/description/canonical + HTML crawlable par page.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

// Load compiled-ish TS via dynamic import through vite-node isn't available;
// use a JSON snapshot generated at build from pages-data instead.
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = join(root, "dist");
const siteUrl = (process.env.VITE_SITE_URL || "https://heynota.app").replace(/\/$/, "");
const snapshotPath = join(dist, "prerender-pages.json");

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function injectPage(html, page) {
  const url = page.path === "/" ? `${siteUrl}/` : `${siteUrl}${page.path}`;
  const blocks = (page.blocks || []).slice(0, 28);
  const crawlable = `
  <main id="prerender">
    <h1>${escapeHtml(page.h1 || page.title)}</h1>
    <p>${escapeHtml(page.lead || page.description)}</p>
    ${blocks.map((b) => `<p>${escapeHtml(b)}</p>`).join("\n    ")}
    <p><a href="${siteUrl}/alkhast-vatsaev">Alkhast Vatsaev a développé Nota CRM</a></p>
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
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);

  out = out.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${crawlable}\n    </div>`
  );
  return out;
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
  if (!existsSync(templatePath)) {
    console.error("prerender: dist/index.html missing");
    process.exit(1);
  }
  if (!existsSync(snapshotPath)) {
    console.error("prerender: missing prerender-pages.json (vite plugin)");
    process.exit(1);
  }
  const pages = JSON.parse(readFileSync(snapshotPath, "utf8"));
  const template = readFileSync(templatePath, "utf8");
  for (const page of pages) writePage(page, template);
  console.log(`prerender: ${pages.length} pages`);
}

main();
