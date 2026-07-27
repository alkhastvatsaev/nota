#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const doc = resolve(root, "docs/marketing/SEO-EXECUTION-ETAPES.md");

if (!existsSync(doc)) {
  console.error("Fichier manquant:", doc);
  process.exit(1);
}

const text = readFileSync(doc, "utf8");
const pending = text.split("\n").filter((l) => l.startsWith("| ☐ |"));
const done = text.split("\n").filter((l) => l.startsWith("| ☑ |"));

console.log("\n=== Nota SEO — prochaine étape ===\n");
console.log(`Terminées: ${done.length} · Restantes: ${pending.length}\n`);
if (pending[0]) console.log(pending[0].replace("| ☐ |", "→ "));
console.log("\nPlan: docs/marketing/SEO-EXECUTION-ETAPES.md\n");
