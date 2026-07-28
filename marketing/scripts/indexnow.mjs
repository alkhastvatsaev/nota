#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const siteUrl = (process.env.VITE_SITE_URL || "https://heynota.app").replace(/\/$/, "");
const host = new URL(siteUrl).host;

function findKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
  const pub = join(root, "public");
  const file = readdirSync(pub).find((f) => /^[a-f0-9]{32}\.txt$/i.test(f));
  return file ? file.replace(/\.txt$/i, "") : null;
}

function loadUrls() {
  const snap = join(root, "dist", "prerender-pages.json");
  if (existsSync(snap)) {
    const pages = JSON.parse(readFileSync(snap, "utf8"));
    return pages.map((p) => (p.path === "/" ? `${siteUrl}/` : `${siteUrl}${p.path}`));
  }
  return [`${siteUrl}/`, `${siteUrl}/alkhast-vatsaev`, `${siteUrl}/contact`];
}

const key = findKey();
if (!key) {
  console.error("IndexNow: missing key");
  process.exit(1);
}

const urlList = loadUrls();
const body = JSON.stringify({
  host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList,
});

for (const endpoint of [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
]) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body,
    });
    console.log(`IndexNow ${endpoint} → ${res.status}`);
  } catch (e) {
    console.warn(`IndexNow ${endpoint} failed`, e?.message || e);
  }
}
console.log(`IndexNow: ${urlList.length} URLs for ${host}`);
