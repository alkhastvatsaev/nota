#!/usr/bin/env node
/**
 * Garde-fou domaines Nota :
 *   heynota.app (+ www) → projet Vercel `heynota` (marketing Vite)
 *   app.heynota.app     → projet Vercel `nota` (CRM Next.js)
 *
 * Un `vercel --prod` depuis la racine peut parfois rattacher l’apex au projet
 * CRM et écraser le marketing. Ce script corrige ça.
 *
 * Usage:
 *   npm run domains:ensure
 *   npm run domains:ensure -- --check   # exit 1 si mauvais, sans écrire
 *   npm run domains:ensure -- --fix     # forcer même si déjà OK (ré-alias)
 *
 * Auth: VERCEL_TOKEN, ou token CLI (~/Library/.../com.vercel.cli/auth.json)
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEAM_ID = process.env.VERCEL_ORG_ID || "team_UOSRlYSsl0qmLfnPSw7QGIt4";
const NOTA_PROJECT_ID =
  process.env.VERCEL_PROJECT_ID_NOTA || "prj_sacOiAMSxWQvZglOrbFpzqXV8Q7K";
const HEYNOTA_PROJECT_ID =
  process.env.VERCEL_PROJECT_ID_HEYNOTA || "prj_jgBVKj6lzaK76YnfHnp0VbMqSSNp";

const MARKETING_DOMAINS = ["heynota.app", "www.heynota.app"];
const APP_DOMAIN = "app.heynota.app";
const MARKETING_URL = "https://heynota.app";
const APP_URL = "https://app.heynota.app";

const checkOnly = process.argv.includes("--check");
const force = process.argv.includes("--fix");

function readCliToken() {
  const candidates = [
    path.join(
      os.homedir(),
      "Library/Application Support/com.vercel.cli/auth.json",
    ),
    path.join(os.homedir(), ".local/share/com.vercel.cli/auth.json"),
  ];
  for (const p of candidates) {
    try {
      if (!fs.existsSync(p)) continue;
      const data = JSON.parse(fs.readFileSync(p, "utf8"));
      if (data.token) return data.token;
    } catch {
      /* ignore */
    }
  }
  return null;
}

const token = process.env.VERCEL_TOKEN || readCliToken();
if (!token) {
  console.error(
    "❌ VERCEL_TOKEN manquant (secret CI ou `vercel login` en local).",
  );
  process.exit(1);
}

async function api(method, urlPath, body) {
  const url = `https://api.vercel.com${urlPath}${urlPath.includes("?") ? "&" : "?"}teamId=${TEAM_ID}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

async function listDomains(projectId) {
  const { ok, json } = await api(
    "GET",
    `/v9/projects/${projectId}/domains`,
  );
  if (!ok) throw new Error(`list domains failed: ${JSON.stringify(json)}`);
  return (json.domains || []).map((d) => d.name);
}

async function removeDomain(projectId, name) {
  const { status, json } = await api(
    "DELETE",
    `/v9/projects/${projectId}/domains/${encodeURIComponent(name)}`,
  );
  if (status !== 200 && status !== 404) {
    throw new Error(`remove ${name}: ${JSON.stringify(json)}`);
  }
  console.log(`  − retiré ${name} de ${projectId === NOTA_PROJECT_ID ? "nota" : "heynota"}`);
}

async function addDomain(projectId, name) {
  const { ok, status, json } = await api(
    "POST",
    `/v10/projects/${projectId}/domains`,
    { name },
  );
  if (ok || status === 409 || json?.name === name) {
    console.log(
      `  + ${name} → ${projectId === NOTA_PROJECT_ID ? "nota" : "heynota"}`,
    );
    return;
  }
  // déjà sur ce projet
  if (String(json?.error?.code || json?.code || "").includes("DOMAIN_ALREADY")) {
    console.log(`  · ${name} déjà sur le projet`);
    return;
  }
  throw new Error(`add ${name}: ${JSON.stringify(json)}`);
}

async function setWwwRedirect() {
  await api("PATCH", `/v9/projects/${HEYNOTA_PROJECT_ID}/domains/www.heynota.app`, {
    redirect: "heynota.app",
    redirectStatusCode: 308,
  });
  console.log("  · www.heynota.app → 308 heynota.app");
}

async function latestProdDeployment(projectId) {
  const { ok, json } = await api(
    "GET",
    `/v6/deployments?projectId=${projectId}&target=production&limit=5&state=READY`,
  );
  if (!ok) throw new Error(`deployments: ${JSON.stringify(json)}`);
  const dep = (json.deployments || [])[0];
  if (!dep?.uid && !dep?.id) return null;
  return dep.uid || dep.id;
}

async function aliasDeployment(deploymentId, alias) {
  const { ok, json } = await api(
    "POST",
    `/v2/deployments/${deploymentId}/aliases`,
    { alias },
  );
  if (!ok) {
    // Alias may already point here
    if (json?.error?.code === "alias_already_exists" || json?.alias === alias) {
      console.log(`  · alias ${alias} déjà OK`);
      return;
    }
    throw new Error(`alias ${alias}: ${JSON.stringify(json)}`);
  }
  console.log(`  → ${alias} aliasé`);
}

async function fetchTitle(url) {
  const res = await fetch(url, {
    headers: { "Cache-Control": "no-cache" },
    redirect: "follow",
  });
  const html = await res.text();
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const hasRoot = html.includes('id="root"');
  const looksNext =
    html.includes("__NEXT_DATA__") ||
    html.includes("/_next/") ||
    /NOTA Admin/i.test(title);
  return { status: res.status, title, hasRoot, looksNext };
}

async function main() {
  console.log("\n🔒 ensure-heynota-domains\n");

  const notaDomains = await listDomains(NOTA_PROJECT_ID);
  const heyDomains = await listDomains(HEYNOTA_PROJECT_ID);

  console.log(`  nota:    ${notaDomains.join(", ") || "(aucun)"}`);
  console.log(`  heynota: ${heyDomains.join(", ") || "(aucun)"}`);

  const marketingOnNota = MARKETING_DOMAINS.filter((d) =>
    notaDomains.includes(d),
  );
  const marketingMissingOnHey = MARKETING_DOMAINS.filter(
    (d) => !heyDomains.includes(d),
  );
  const appMissingOnNota = !notaDomains.includes(APP_DOMAIN);

  const needsFix =
    marketingOnNota.length > 0 ||
    marketingMissingOnHey.length > 0 ||
    appMissingOnNota ||
    force;

  if (!needsFix) {
    console.log("\n✅ Assignation projets déjà correcte.");
  } else if (checkOnly) {
    console.error("\n❌ Domaines mal assignés (--check).");
    if (marketingOnNota.length) {
      console.error(`   Marketing encore sur nota: ${marketingOnNota.join(", ")}`);
    }
    if (marketingMissingOnHey.length) {
      console.error(
        `   Manquants sur heynota: ${marketingMissingOnHey.join(", ")}`,
      );
    }
    if (appMissingOnNota) console.error(`   Manque ${APP_DOMAIN} sur nota`);
    process.exit(1);
  } else {
    console.log("\n🛠️  Correction…");
    for (const d of marketingOnNota) {
      await removeDomain(NOTA_PROJECT_ID, d);
    }
    for (const d of MARKETING_DOMAINS) {
      await addDomain(HEYNOTA_PROJECT_ID, d);
    }
    await setWwwRedirect();
    if (appMissingOnNota) await addDomain(NOTA_PROJECT_ID, APP_DOMAIN);

    const marketingDep = await latestProdDeployment(HEYNOTA_PROJECT_ID);
    const appDep = await latestProdDeployment(NOTA_PROJECT_ID);
    if (marketingDep) {
      await aliasDeployment(marketingDep, "heynota.app");
      await aliasDeployment(marketingDep, "www.heynota.app");
    } else {
      console.warn("  ⚠ pas de déploiement READY heynota — alias marketing skip");
    }
    if (appDep) {
      await aliasDeployment(appDep, APP_DOMAIN);
    } else {
      console.warn("  ⚠ pas de déploiement READY nota — alias app skip");
    }
  }

  // Health check HTTP
  console.log("\n🩺 Vérif HTTP…");
  await new Promise((r) => setTimeout(r, 1500));
  const marketing = await fetchTitle(MARKETING_URL);
  const app = await fetchTitle(APP_URL);

  console.log(
    `  ${MARKETING_URL} → ${marketing.status} “${marketing.title}” root=${marketing.hasRoot}`,
  );
  console.log(
    `  ${APP_URL} → ${app.status} “${app.title}” next=${app.looksNext}`,
  );

  const marketingOk =
    marketing.status === 200 &&
    marketing.hasRoot &&
    /Nota CRM|CRM simple|Nota —/i.test(marketing.title) &&
    !/NOTA Admin/i.test(marketing.title);
  const appOk =
    app.status === 200 &&
    (app.looksNext || /NOTA Admin/i.test(app.title)) &&
    !/CRM simple sans inscription/i.test(app.title);

  if (!marketingOk || !appOk) {
    console.error("\n❌ Health check domaines échoué.");
    if (!marketingOk) {
      console.error(
        "   heynota.app ne sert pas le site marketing (Vite #root).",
      );
    }
    if (!appOk) {
      console.error("   app.heynota.app ne sert pas le CRM Next.js.");
    }
    process.exit(1);
  }

  console.log("\n✅ Domaines OK — marketing ≠ CRM.\n");
}

main().catch((err) => {
  console.error("❌", err.message || err);
  process.exit(1);
});
