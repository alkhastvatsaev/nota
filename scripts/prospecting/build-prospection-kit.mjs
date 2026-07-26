#!/usr/bin/env node
/**
 * Rebuild prospection kit: real app screenshots only, compressed PDF, 50 mails.
 * Usage: node scripts/prospecting/build-prospection-kit.mjs
 */
import { mkdir, writeFile, readFile, copyFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = resolve(ROOT, "scripts/prospecting/output");
const REAL = resolve(OUT, "pptx-assets/real");
const SLIDES = resolve(OUT, "pptx-assets/slides-sales");
const PUBLIC_PDF = resolve(ROOT, "public/prospecting/NOTA-presentation-prospection.pdf");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CRENEAUX = "mardi 21 juillet à 10h, ou mercredi 22 à 17h";

const REAL_SHOTS = {
  carte: "carte.png",
  interventions: "interventions.png",
  facturation: "facturation.png",
  "mobile-admin": "mobile-admin-carte.png",
  "mobile-tech": "mobile-tech-gains.png",
};

async function syncRealScreenshots() {
  for (const [key, file] of Object.entries(REAL_SHOTS)) {
    const src = resolve(REAL, file);
    await import("node:fs").then((fs) => fs.promises.access(src).catch(() => {
      throw new Error(`Capture manquante: ${src} — envoie le screenshot à l'agent, ne pas inventer.`);
    }));
  }
  console.log("Captures réelles OK:", Object.keys(REAL_SHOTS).join(", "));
}

const DS = `:root{--bg:#EEF1F5;--panel:#FFF;--ink:#0F172A;--muted:#64748B;--soft:#94A3B8;--line:rgba(0,0,0,.05);--blue:#2563EB;--blue-bg:#EFF6FF;--blue-text:#1D4ED8;--green-bg:#ECFDF5;--green-text:#047857;--shadow:0 4px 6px -1px rgba(0,0,0,.05),0 2px 4px -1px rgba(0,0,0,.03);--r:24px}*{box-sizing:border-box;margin:0;padding:0}html,body{width:1920px;height:1080px;overflow:hidden;font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--ink)}.slide{width:1920px;height:1080px;position:relative;padding:48px 56px}.brand{display:flex;align-items:center;gap:12px}.brand img{width:36px;height:36px;border-radius:11px;background:var(--ink)}.brand b{font-size:16px;font-weight:750}.eyebrow{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--soft)}h1{font-size:48px;font-weight:800;letter-spacing:-.035em;line-height:1.08;max-width:16ch}.lead{font-size:22px;line-height:1.45;color:var(--muted);margin-top:16px;max-width:36ch}.badge{display:inline-flex;border-radius:999px;padding:7px 12px;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;background:var(--blue-bg);color:var(--blue-text);border:1px solid #BFDBFE}.panel{background:var(--panel);border:1px solid var(--line);border-radius:var(--r);box-shadow:var(--shadow)}.page{position:absolute;right:56px;bottom:32px;font-size:13px;font-weight:700;color:var(--soft)}.top{display:flex;align-items:center;justify-content:space-between;margin-bottom:40px}`;

const TMP = resolve(OUT, ".build-tmp");
const LOGO = resolve(ROOT, "public/icon-512.png");
const TOTAL = 7;

function feature(page, img, step, title, one, bullets, badge) {
  const lis = bullets.map((b) => `<li>${b}</li>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>${DS}.layout{display:grid;grid-template-columns:560px 1fr;gap:28px;height:calc(1080px - 160px)}.left{padding:40px 36px;display:flex;flex-direction:column}.step{color:var(--blue);font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px}.left h1{font-size:40px;max-width:11ch;margin-bottom:16px}.one{font-size:18px;color:var(--muted);margin-bottom:32px;max-width:22ch}ul{list-style:none;display:flex;flex-direction:column;gap:16px;margin-top:auto}li{font-size:17px;padding:14px 16px;background:#F8FAFC;border:1px solid var(--line);border-radius:14px}.right{padding:16px;display:flex;align-items:center}.frame{width:100%;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:#F8FAFC}.bar{height:30px;background:#F1F5F9;display:flex;align-items:center;gap:7px;padding:0 12px;border-bottom:1px solid var(--line);font-size:11px;color:var(--soft)}.d{width:9px;height:9px;border-radius:50%}.frame img{display:block;width:100%}</style></head><body><div class="slide"><div class="top"><div class="brand"><img src="logo.png"/><b>NOTA</b></div><span class="badge">${badge}</span></div><div class="layout"><div class="panel left"><div class="step">${step}</div><h1>${title}</h1><p class="one">${one}</p><ul>${lis}</ul></div><div class="panel right"><div class="frame"><div class="bar"><div class="d" style="background:#FF5F57"></div><div class="d" style="background:#FEBC2E"></div><div class="d" style="background:#28C840"></div><span>Écran de démonstration</span></div><img src="${img}"/></div></div></div><div class="page">${page} / ${TOTAL}</div></div></body></html>`;
}

async function writeSlides() {
  await mkdir(TMP, { recursive: true });
  await copyFile(LOGO, resolve(TMP, "logo.png"));
  await copyFile(resolve(REAL, REAL_SHOTS.carte), resolve(TMP, "carte.png"));
  await copyFile(resolve(REAL, REAL_SHOTS.interventions), resolve(TMP, "interventions.png"));
  await copyFile(resolve(REAL, REAL_SHOTS.facturation), resolve(TMP, "facturation.png"));
  await copyFile(resolve(REAL, REAL_SHOTS["mobile-admin"]), resolve(TMP, "mobile-admin.png"));
  await copyFile(resolve(REAL, REAL_SHOTS["mobile-tech"]), resolve(TMP, "mobile-tech.png"));
  const slides = {
    "01-cover.html": `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>${DS}.slide{display:flex;flex-direction:column;justify-content:space-between}h1{font-size:64px;max-width:14ch}.bottom{display:flex;justify-content:space-between;align-items:center}.pill{background:#fff;border:1px solid var(--line);border-radius:999px;padding:12px 16px;font-size:14px;font-weight:650;color:var(--muted);margin-right:10px;display:inline-block}</style></head><body><div class="slide"><div class="brand"><img src="logo.png"/><b>NOTA</b></div><div><div class="eyebrow">Serrurerie · démo</div><h1 style="margin-top:18px">Moins de chaos.<br/>Plus de courses<br/>facturées.</h1><p class="lead">Carte, missions, factures — bureau et mobile.</p></div><div class="bottom"><div><span class="pill">Essai 14 jours</span><span class="pill">Support 24/7</span></div><span style="color:var(--muted);font-weight:650">heynota.app</span></div></div></body></html>`,
    "02-probleme.html": `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>${DS}.grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:48px}.card{padding:36px 32px;min-height:460px}.num{font-size:56px;font-weight:800;color:#CBD5E1;margin-bottom:28px}.card h2{font-size:26px;font-weight:800;margin-bottom:14px}.card p{font-size:18px;line-height:1.5;color:var(--muted)}</style></head><body><div class="slide"><div class="top"><div class="brand"><img src="logo.png"/><b>NOTA</b></div><span class="badge">Constat</span></div><div class="eyebrow">Terrain</div><h1 style="margin-top:12px">Trois endroits où<br/>l'argent se perd</h1><div class="grid"><div class="panel card"><div class="num">01</div><h2>Missions éparpillées</h2><p>Téléphone, WhatsApp, papier.</p></div><div class="panel card"><div class="num">02</div><h2>Dossiers flous</h2><p>Client, adresse — reconstruits de mémoire.</p></div><div class="panel card"><div class="num">03</div><h2>Factures en retard</h2><p>La course est faite, le cash attend.</p></div></div><div class="page">2 / ${TOTAL}</div></div></body></html>`,
    "03-carte.html": feature(3, "carte.png", "Étape 1", "Tout l'équipe<br/>sur une carte", "Qui est où, sans demander.", ["Techs et courses en live", "Moins d'appels « t'es où ? »", "Assignation plus rapide"], "Carte"),
    "04-dossiers.html": feature(4, "interventions.png", "Étape 2", "Un dossier.<br/>Un fil.", "De l'assignation au paiement.", ["Statuts clairs", "Client et tech au même endroit", "Fini la mémoire"], "Missions"),
    "05-mobile.html": `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>${DS}.row{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:36px}.col{padding:28px;text-align:center}.tag{display:inline-flex;border-radius:999px;padding:6px 12px;font-size:11px;font-weight:800;margin-bottom:12px}.admin{background:var(--blue-bg);color:var(--blue-text);border:1px solid #BFDBFE}.tech{background:var(--green-bg);color:var(--green-text);border:1px solid #A7F3D0}.phone{background:var(--ink);border-radius:30px;padding:9px;width:340px;margin:0 auto}.phone img{display:block;width:100%;border-radius:22px}</style></head><body><div class="slide"><div class="top"><div class="brand"><img src="logo.png"/><b>NOTA</b></div><span class="badge">Mobile</span></div><div class="eyebrow">Téléphone</div><h1 style="margin-top:12px;font-size:44px">Le patron pilote.<br/>Le tech avance.</h1><div class="row"><div class="panel col"><span class="tag admin">Admin</span><h2 style="font-size:20px;font-weight:800;margin-bottom:16px">Centrale mobile</h2><div class="phone"><img src="mobile-admin.png"/></div></div><div class="panel col"><span class="tag tech">Technicien</span><h2 style="font-size:20px;font-weight:800;margin-bottom:16px">Terrain</h2><div class="phone"><img src="mobile-tech.png"/></div></div></div><div class="page">5 / ${TOTAL}</div></div></body></html>`,
    "06-facturation.html": feature(6, "facturation.png", "Étape 3", "Facturer<br/>le jour même", "La course finie ne attend plus.", ["En attente / impayés visibles", "Facture en 2 clics", "Moins de cash oublié"], "Factures"),
    "07-close.html": `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>${DS}.main{max-width:1200px;margin-top:40px}h1{font-size:56px}.actions{display:grid;grid-template-columns:1.2fr 1fr;gap:20px;margin-top:48px}.card{padding:32px}.card h2{font-size:22px;font-weight:800;margin:10px 0}.card p{color:var(--muted);font-size:16px;line-height:1.5}.cta{background:var(--ink);color:#fff;border-radius:var(--r);padding:36px 34px}.cta h2{color:#fff;font-size:28px;font-weight:800;margin:10px 0}.cta p{color:#CBD5E1;font-size:16px}</style></head><body><div class="slide"><div class="brand"><img src="logo.png"/><b>NOTA</b></div><div class="main"><div class="eyebrow">Essai</div><h1 style="margin-top:14px">14 jours sur<br/>vos vraies urgences.</h1><p class="lead">On ouvre l'app ensemble. Vous jugez.</p><div class="actions"><div class="panel card"><span class="badge">Inclus</span><h2>Essai + support 24/7</h2><p>Bureau et mobile. On paramètre à votre rythme.</p></div><div class="cta"><div class="eyebrow" style="color:#94A3B8">Action</div><h2>Répondez « démo »</h2><p>10 minutes de partage d'écran.</p></div></div></div><div class="page">7 / ${TOTAL}</div></div></body></html>`,
  };
  for (const [name, html] of Object.entries(slides)) {
    await writeFile(resolve(TMP, name), html, "utf-8");
  }
  await mkdir(SLIDES, { recursive: true });
  const order = ["01-cover", "02-probleme", "03-carte", "04-dossiers", "05-mobile", "06-facturation", "07-close"];
  for (const f of order) {
    const png = resolve(SLIDES, `${f}.png`);
    execSync(`"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --screenshot="${png}" "file://${resolve(TMP, `${f}.html`)}"`, { stdio: "pipe" });
    execSync(`magick "${png}" -resize 1280x720 -quality 82 "${resolve(SLIDES, `${f}-sm.jpg`)}"`, { stdio: "pipe" });
  }
  console.log("Slides OK");
}

async function buildPdf() {
  const jpgs = ["01-cover", "02-probleme", "03-carte", "04-dossiers", "05-mobile", "06-facturation", "07-close"].map((f) => `"${resolve(SLIDES, `${f}-sm.jpg`)}"`).join(" ");
  const pdfOut = resolve(OUT, "NOTA-presentation-prospection.pdf");
  execSync(`magick ${jpgs} -quality 85 "${pdfOut}"`, { stdio: "pipe" });
  await mkdir(resolve(ROOT, "public/prospecting"), { recursive: true });
  await copyFile(pdfOut, PUBLIC_PDF);
  execSync(`magick "${resolve(SLIDES, "05-mobile-sm.jpg")}" -resize 800x -quality 80 "${resolve(OUT, "email-mobile-apercu.jpg")}"`, { stdio: "pipe" });
  const stat = await import("node:fs").then((fs) => fs.promises.stat(pdfOut));
  console.log("PDF", Math.round(stat.size / 1024), "KB");
}

function classifyVariant(nom, ville, email = "") {
  const s = `${nom} ${ville} ${email}`.toLowerCase();
  if (/dépann|depann|urgence|express|sos|24|intervention/.test(s)) return "depannage";
  if (/tan|magasin|atelier|clef|clé|serrures|cordonnerie|point fort|picard|boutique|clé minute/.test(s)) return "boutique";
  return "equipe";
}

const OPENINGS = {
  depannage: (p) => `Je développe NOTA pour les boîtes de dépannage comme ${p.nom} — quand ça part en urgence, le suivi part souvent avec.`,
  boutique: (p) => `Je développe NOTA pour les serruriers avec boutique / atelier comme ${p.nom} — entre le comptoir et les courses, c'est facile de perdre le fil.`,
  equipe: (p) => `Je développe NOTA pour les petites équipes de serrurerie comme ${p.nom} — carte, missions techs, factures.`,
};

const SUBJECTS = [(p) => `${p.nom} — avis terrain ?`, () => `Avis outil serrurerie (10 min)`, (p) => `${p.nom} — question d'un dev`];

function mail1(p, variant) {
  const opening = OPENINGS[variant](p);
  return `Bonjour,\n\nJe m'appelle Alkhast, je suis développeur. ${opening}\n\nEn bref : moins de missions perdues entre le téléphone, WhatsApp et le papier. Le tech voit sa course, vous voyez où ça en est, facture possible le jour même. Version mobile admin + technicien.\n\nJe vous joins un petit PDF (captures réelles, 7 pages). Essai 14 jours si vous voulez tester — sans engagement.\n\nDix minutes en partage d'écran un de ces jours ? ${CRENEAUX} — ou dites-moi quand. Un « ok » suffit.\n\nAlkhast Vatsaev\n+33 7 67 69 38 04`;
}

function mail2(p) {
  return `Bonjour,\n\nPetit rappel discret sur mon mail au sujet de NOTA.\n\nToujours OK pour dix minutes ? ${CRENEAUX}\n\nAlkhast\n+33 7 67 69 38 04`;
}

async function parseProspects() {
  const md = await readFile(resolve(OUT, "serruriers-50-emails.md"), "utf-8");
  const prospects = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^\| (\d+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|/);
    if (!m) continue;
    prospects.push({ n: Number(m[1]), nom: m[2].trim(), ville: m[3].trim(), email: m[4].trim(), tel: m[5].trim() });
  }
  if (!prospects.length) throw new Error("Aucun prospect dans serruriers-50-emails.md");
  return prospects;
}

async function writeMails(prospects) {
  const parts = [`# 50 mails — prospection NOTA (v2)\n\nTon : court (~1 écran mobile), sincère, vouvoiement.\n\nPDF envoyé en pièce jointe.\n\nCréneaux : **${CRENEAUX}**\n\n---\n\n# Mail 1\n\n`];
  for (const p of prospects) {
    const variant = classifyVariant(p.nom, p.ville, p.email);
    const subject = SUBJECTS[(p.n - 1) % 3](p);
    parts.push(`## ${p.n}. ${p.nom}\n\n- **À :** \`${p.email}\`\n- **Ville :** ${p.ville}\n- **Variante :** ${variant}\n\n**Objet :** ${subject}\n\n\`\`\`\n${mail1(p, variant)}\n\`\`\`\n\n---\n`);
  }
  parts.push(`\n# Relance J+3\n\n`);
  for (const p of prospects) {
    parts.push(`## Relance ${p.n}. ${p.nom}\n\n- **À :** \`${p.email}\`\n\n**Objet :** Re: ${SUBJECTS[(p.n - 1) % 3](p)}\n\n\`\`\`\n${mail2(p)}\n\`\`\`\n\n---\n`);
  }
  await writeFile(resolve(OUT, "serruriers-50-mails.md"), parts.join(""), "utf-8");
}



function parseCsvSemicolon(line) {
  const out = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { q = !q; continue; }
    if (c === ";" && !q) { out.push(cur); cur = ""; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

async function loadCallPriorities(prospects) {
  const csv = await readFile(resolve(OUT, "serruriers.csv"), "utf-8");
  const siretByEmail = new Map();
  for (const row of csv.split("\n").slice(1).filter(Boolean)) {
    const cols = parseCsvSemicolon(row);
    const email = (cols[8] || "").trim().toLowerCase();
    const siret = (cols[10] || "").trim();
    if (email && siret) siretByEmail.set(email, siret);
  }
  const scored = prospects.map((p) => {
    const tel = p.tel || "";
    const digits = tel.replace(/\s/g, "");
    const mobile = digits.startsWith("06") || digits.startsWith("07");
    const siret = siretByEmail.get(p.email.toLowerCase()) || "";
    const score = (mobile ? 10 : 0) + (siret ? 5 : 0) + (50 - p.n) / 100;
    return { ...p, tel, siret, mobile, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.filter((p) => p.mobile).slice(0, 10).map((p) => ({ ...p, variant: classifyVariant(p.nom, p.ville, p.email) }));
}

async function writeEnvois(prospects) {
  const priorities = await loadCallPriorities(prospects);
  const envoi = `# Kit d'envoi — NOTA\n\n## Avant d'envoyer\n\n1. Email pro (domaine dédié si possible)\n2. 10–15 mails / jour max\n3. Relance J+3 si silence\n\n## Fichiers\n\n- PDF : \`NOTA-presentation-prospection.pdf\` (~500 Ko–1 Mo)\n- Lien : \n- Aperçu mobile : \`email-mobile-apercu.jpg\`\n\n## A/B\n\n- Impairs → PDF en PJ\n- Pairs → lien seul\n\n## 10 priorités appel\n\n${priorities.map((p) => `- **${p.n}. ${p.nom}** (${p.ville}) — \`${p.email}\` · ${p.tel || "tel ?"} · SIRET ${p.siret || "?"}`).join("\n")}\n`;
  await writeFile(resolve(OUT, "ENVOI.md"), envoi, "utf-8");
  await writeFile(resolve(OUT, "PRIORITES-APPEL.md"), `# Priorités appel\n\n| # | Entreprise | Ville | Tél | SIRET | Email |\n|---|------------|-------|-----|-------|-------|\n${priorities.map((p) => `| ${p.n} | ${p.nom} | ${p.ville} | ${p.tel} | ${p.siret || "—"} | ${p.email} |`).join("\n")}\n`, "utf-8");
}

async function buildPptx() {
  const script = `import PptxGenJS from "${resolve(ROOT, "node_modules/pptxgenjs/dist/pptxgen.cjs.js")}";\nimport { resolve } from "path";\nconst SLIDES = "${SLIDES}";\nconst files = ["01-cover","02-probleme","03-carte","04-dossiers","05-mobile","06-facturation","07-close"];\nconst pptx = new PptxGenJS();\npptx.defineLayout({ name: "W", width: 13.333, height: 7.5 });\npptx.layout = "W";\nfor (const f of files) {\n  const s = pptx.addSlide();\n  s.addImage({ path: resolve(SLIDES, f + "-sm.jpg"), x: 0, y: 0, w: 13.333, h: 7.5 });\n}\nawait pptx.writeFile({ fileName: resolve("${OUT}", "NOTA-presentation-prospection.pptx") });\n`;
  const p = resolve(OUT, ".build-pptx.mjs");
  await writeFile(p, script, "utf-8");
  execSync(`node "${p}"`, { stdio: "inherit", cwd: ROOT });
}

const mailsOnly = process.argv.includes("--mails-only");
const deckOnly = process.argv.includes("--deck-only");

async function main() {
  if (mailsOnly) {
    console.log("Mails + ENVOI only…");
    const prospects = await parseProspects();
    await writeMails(prospects);
    await writeEnvois(prospects);
    console.log("Done.");
    return;
  }
  if (deckOnly) {
    console.log("Deck only (captures réelles)…");
    await syncRealScreenshots();
    await writeSlides();
    await buildPdf();
    await buildPptx();
    console.log("Done.");
    return;
  }
  console.log("1/6 Captures réelles…");
  await syncRealScreenshots();
  console.log("2/6 Slides…");
  await writeSlides();
  console.log("3/6 PDF…");
  await buildPdf();
  console.log("4/6 PPTX…");
  await buildPptx();
  console.log("5/6 Mails…");
  const prospects = await parseProspects();
  await writeMails(prospects);
  console.log("6/6 ENVOI…");
  await writeEnvois(prospects);
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
