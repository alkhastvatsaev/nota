#!/usr/bin/env node
/**
 * Checklist audits restants (mobile / sécu / SPA).
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.argv[2] ?? "dist");
const ok = [];
const fail = [];

function check(name, pass, detail = "") {
  (pass ? ok : fail).push(`${name}${detail ? ` — ${detail}` : ""}`);
}

check("404.html", existsSync(resolve(root, "404.html")));
check("_redirects", existsSync(resolve(root, "_redirects")));
check("_headers", existsSync(resolve(root, "_headers")));
check("security.txt", existsSync(resolve(root, ".well-known/security.txt")));

const redirects = existsSync(resolve(root, "_redirects"))
  ? readFileSync(resolve(root, "_redirects"), "utf8")
  : "";
check("SPA routes 200", /crm-sans-inscription/.test(redirects));
check("catch-all 404", /\/\*\s+\/404\.html\s+404/.test(redirects));

const headers = existsSync(resolve(root, "_headers"))
  ? readFileSync(resolve(root, "_headers"), "utf8")
  : "";
check("X-Frame-Options", /X-Frame-Options/i.test(headers));
check("nosniff", /X-Content-Type-Options/i.test(headers));
check("HSTS", /Strict-Transport-Security/i.test(headers));

const html = existsSync(resolve(root, "index.html"))
  ? readFileSync(resolve(root, "index.html"), "utf8")
  : "";
check("viewport", /width=device-width/.test(html));
check("no secrets in html", !/sk_live|api_key\s*=\s*['\"][^'\"]+['\"]/i.test(html));

console.log("\n=== Audit stack Nota ===\n");
for (const l of ok) console.log(`OK   ${l}`);
for (const l of fail) console.log(`FAIL ${l}`);
console.log(`\n${ok.length} ok · ${fail.length} fail\n`);
process.exit(fail.length ? 1 : 0);
