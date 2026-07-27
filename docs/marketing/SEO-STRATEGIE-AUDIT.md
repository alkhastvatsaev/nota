# Audit SEO complet — Nota (heynota.app)

**Date de référence** : stratégie post-repositionnement « interventions terrain » (toutes entreprises à équipes mobiles, plus de focus serrurerie).  
**Surfaces** : marketing `https://heynota.app` → conversion `https://app.heynota.app`  
**Objectif business** : trafic organique qualifié → clics « Ouvrir Nota » → usage réel de l'app (leads = essais produit, pas formulaires email sur le site).

---

## 1. Synthèse exécutive

| Dimension                               | État                 | Note /10 | Commentaire                                                            |
| --------------------------------------- | -------------------- | -------- | ---------------------------------------------------------------------- |
| **Technique on-page**                   | Solide               | 8        | Sitemap, robots, canonical, OG, JSON-LD, fallback HTML, audit CI local |
| **Contenu indexable**                   | Correct, perfectible | 6        | 12 URLs ; texte utile mais peu de profondeur vs concurrence SaaS       |
| **Intentions de recherche**             | Aligné produit       | 7        | Horizontal terrain ; éviter le piège « CRM générique »                 |
| **Autorité / backlinks**                | Faible               | 3        | Domaine jeune, peu de citations — goulot principal long terme          |
| **Mesure (GA4 / GSC)**                  | À activer en prod    | 4        | Code prêt ; variables Vercel souvent vides                             |
| **Off-site (vidéo, social, annuaires)** | Non démarré          | 2        | Plus gros levier court terme **hors code**                             |
| **Conversion SEO → app**                | Bonne base           | 7        | CTA unique, UTM, événement `click_open_nota`                           |

**Verdict** : la **fondation technique marketing est prête** ; le trafic viendra surtout de (1) **indexation + pages qui rankent**, (2) **contenu & preuves**, (3) **distribution** (YouTube, LinkedIn, annuaires), pas de micro-tweaks React seuls.

---

## 2. Inventaire technique (état actuel du repo)

### 2.1 Architecture domaines

| Rôle            | URL                     | Projet Vercel |
| --------------- | ----------------------- | ------------- |
| Marketing / SEO | https://heynota.app     | `heynota`     |
| Application CRM | https://app.heynota.app | `nota`        |

Après chaque deploy : `npm run domains:ensure`.

### 2.2 Pages indexables (12)

| Chemin                             | Rôle SEO                       |
| ---------------------------------- | ------------------------------ |
| `/`                                | Accueil + bloc texte indexable |
| `/logiciel-interventions-terrain`  | **Pilier principal**           |
| `/interventions-terrain`           | Terrain / quotidien            |
| `/gestion-interventions`           | Intention transactionnelle     |
| `/planning-techniciens`            | Mobile / équipe                |
| `/facturation-interventions`       | Facturation                    |
| `/pour-qui`                        | Secteurs + citabilité (AI)     |
| `/excel-vs-logiciel-interventions` | Top funnel Excel               |
| `/crm-sans-inscription`            | Différenciation conversion     |
| `/alternative-excel-commercial`    | Excel relationnel              |
| `/installer-nota`                  | PWA / mobile                   |
| `/a-propos`                        | E-E-A-T                        |

**Redirections 301** : `/logiciel-serrurier` → pilier ; `/depannage-interventions` → `/interventions-terrain` ; `/facturation-depannage` → `/facturation-interventions`.

### 2.3 Stack SEO implémentée

- Meta, canonical, OG/Twitter, JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage)
- Sitemap + robots régénérés au build
- HTML crawlable dans `index.html`
- GA4 : `page_view`, `click_open_nota` si `VITE_GA_MEASUREMENT_ID`
- UTM sur liens app (`utm_source=heynota`, `utm_content`= page)
- Search Console : `VITE_GOOGLE_SITE_VERIFICATION`
- `npm run marketing:seo:audit`

### 2.4 Fichiers clés

| Fichier                                  | Usage            |
| ---------------------------------------- | ---------------- |
| `marketing/src/config/pages-data.ts`     | Meta + sitemap   |
| `marketing/src/content/landing-pages.ts` | Contenu landings |
| `marketing/src/content/faq.ts`           | FAQ accueil      |
| `marketing/src/config/seo-nav.ts`        | Maillage interne |
| `marketing/vercel.json`                  | Redirects + SPA  |

---

## 3. Lacunes & risques (audit)

### 3.1 Technique

| Risque                                | Gravité |
| ------------------------------------- | ------- |
| Accueil visuel > texte above-the-fold | Moyenne |
| Pas de blog / guides `/guides`        | Moyenne |
| CWV non monitorés (LCP mobile)        | Moyenne |
| Pas de hreflang (marketing FR seul)   | Faible  |

### 3.2 Contenu

| Lacune                        | Impact trafic                 |
| ----------------------------- | ----------------------------- |
| Peu de captures / témoignages | Fort (conversion + confiance) |
| Pas de comparatifs nommés     | Fort long terme               |
| Pas de pages secteur dédiées  | Fort long terme               |
| Marque « Nota » peu connue    | Fort (branded)                |

### 3.3 Off-site

| Lacune              | Impact                   |
| ------------------- | ------------------------ |
| 0 YouTube           | **Très fort**            |
| 0 Capterra/Appvizer | Fort                     |
| 0 backlinks         | **Très fort** long terme |
| GSC/GA4 non live    | **Critique**             |

---

## 4. Stratégie multi-plateforme

### 4.1 Entonnoir

```
Recherche → heynota.app (intent) → Ouvrir Nota (UTM) → app.heynota.app → rétention & avis
```

**Lead** = ouverture app + première action métier.

### 4.2 Clusters mots-clés (France)

**A — Pilier** : logiciel gestion interventions, interventions terrain, planning technicien, CRM interventions → `/logiciel-interventions-terrain`

**B — Use cases** : URLs existantes (gestion, planning, facturation)

**C — Excel / WhatsApp** : alternative excel, excel interventions

**D — Sans friction** : CRM sans inscription (conversion > volume)

**E — Secteurs (phase 2)** : maintenance, SAV, IT terrain — 1 page = 1 contenu unique

**F — Marque** : Nota, Hey Nota, heynota

**Éviter** : parier le SEO principal sur « CRM » seul (HubSpot, Salesforce…).

### 4.3 Par plateforme

| Plateforme                   | Rôle                           | Priorité |
| ---------------------------- | ------------------------------ | -------- |
| **Google Search**            | Acquisition intent             | 🔴       |
| **Google Search Console**    | Indexation, CTR, requêtes      | 🔴       |
| **YouTube**                  | Démo + requêtes « logiciel … » | 🔴       |
| **LinkedIn**                 | B2B TPE, fondateur             | 🟠       |
| **Bing Webmaster**           | 5–10 % search FR               | 🟡       |
| **Capterra / Appvizer**      | SERP + AI citations            | 🟠       |
| **Facebook groupes**         | Confiance métier               | 🟡       |
| **Google Business**          | Crédibilité éditeur            | 🟡       |
| **TikTok/Reels**             | Reprise Shorts                 | ⚪       |
| **Google Ads**               | Valider mots-clés              | 🟡       |
| **AI (ChatGPT, Perplexity)** | FAQ, `/pour-qui`, tierces      | 🟠       |
| **Email / prospection**      | Leads directs (UTM pilier)     | 🔴 leads |

---

## 5. Conversion SEO → app

| Élément               | Statut                    |
| --------------------- | ------------------------- |
| CTA « Ouvrir Nota »   | OK                        |
| UTM                   | OK                        |
| GA4 `click_open_nota` | Code OK — activer en prod |
| Preuves visuelles     | À faire                   |
| Retargeting           | Plus tard (volume)        |

---

## 6. KPIs

**Hebdo (GSC + GA4)** : impressions, clics, CTR, positions ; sessions organic ; `click_open_nota` / session organic pilier.

**Mensuel** : 1 contenu + 1 vidéo ; backlinks ; pages indexées (= 12).

**Cibles 3 mois (ordre de grandeur)** : 50+ clics organiques/mois → 200+ ; CTR pilier > 2 % ; top 20 puis top 10 sur 3 requêtes cluster A.

---

## 7. Checklist impact maximum (trafic & leads)

Impact : **🔴 Critique** · **🟠 Élevé** · **🟡 Moyen** · **⚪ Faible**

### Semaine 1 — Mesure & indexation

| ☐   | Action                                                                                                                             | Trafic | Leads | Temps  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ | ----- | ------ |
| ☐   | Search Console + `VITE_GOOGLE_SITE_VERIFICATION` + redeploy                                                                        | 🔴     | 🟠    | 30 min |
| ☐   | Soumettre sitemap ; indexer `/`, `/logiciel-interventions-terrain`, `/pour-qui`, `/gestion-interventions`, `/crm-sans-inscription` | 🔴     | 🟠    | 20 min |
| ☐   | GA4 + `VITE_GA_MEASUREMENT_ID` ; conversion `click_open_nota`                                                                      | 🔴     | 🔴    | 45 min |
| ☐   | `npm run deploy:marketing`                                                                                                         | 🔴     | 🔴    | 10 min |
| ☐   | Bing Webmaster + sitemap                                                                                                           | 🟡     | 🟡    | 15 min |

### Semaine 1–2 — Distribution (ROI temps élevé)

| ☐   | Action                                                    | Trafic | Leads | Temps  |
| --- | --------------------------------------------------------- | ------ | ----- | ------ |
| ☐   | **1 vidéo YouTube** démo carte + mobile → lien pilier UTM | 🔴     | 🔴    | 2–3 h  |
| ☐   | **2 Shorts** (30 s)                                       | 🟠     | 🟠    | 1 h    |
| ☐   | **LinkedIn** fondateur (2 posts) + lien pilier            | 🟠     | 🔴    | 1 h    |
| ☐   | Fiches **Appvizer + Capterra**                            | 🟠     | 🟠    | 1–2 h  |
| ☐   | Signature email + prospection → pilier UTM                | 🟡     | 🔴    | 15 min |

### Semaine 2–4 — Contenu qui rank & convertit

| ☐   | Action                                                  | Trafic | Leads | Temps |
| --- | ------------------------------------------------------- | ------ | ----- | ----- |
| ☐   | Enrichir **pilier** (+800 mots, 2 screenshots app, FAQ) | 🔴     | 🔴    | 3 h   |
| ☐   | Preuve visuelle **accueil** (statique, indexable)       | 🟠     | 🔴    | 2 h   |
| ☐   | **Guide** « Excel → logiciel interventions »            | 🟠     | 🟠    | 3 h   |
| ☐   | **1 témoignage** client (nom, métier, ville)            | 🟠     | 🔴    | 1 h   |
| ☐   | Ajuster titles/descriptions si CTR GSC < 2 %            | 🟠     | 🟡    | 1 h   |

### Mois 2 — Autorité

| ☐   | Action                                                 | Trafic | Leads |
| --- | ------------------------------------------------------ | ------ | ----- |
| ☐   | **3 backlinks** qualité (partenaire, presse, annuaire) | 🔴     | 🟡    |
| ☐   | **2 pages secteur** (contenu unique)                   | 🟠     | 🟠    |
| ☐   | Comparatif Excel tableau HTML                          | 🟠     | 🟠    |
| ☐   | Google Ads test faible budget (cluster A)              | 🟡     | 🟠    |

### Mois 3

| ☐   | Action                                                             |
| --- | ------------------------------------------------------------------ |
| ☐   | Revue 90 j GSC : fusionner pages faibles, renforcer top 3 requêtes |
| ☐   | 2 articles/mois (guides terrain)                                   |
| ☐   | Avis authentiques (Capterra, Google)                               |
| ☐   | Retargeting si > 500 visiteurs/mois                                |

### À ne pas faire

- 50 pages duplicate · backlinks achetés · SEO « CRM » générique · indexer login app · changer URLs sans 301

---

## 8. Top 10 ROI (résumé)

1. GSC + indexation pilier
2. GA4 + conversion clic app
3. YouTube démo
4. Pilier + screenshots
5. LinkedIn hebdo
6. Capterra / Appvizer
7. Témoignage client
8. Guide Excel → logiciel
9. Prospection UTM pilier
10. 3 backlinks légitimes

---

## 9. Variables Vercel (`heynota`)

```
VITE_SITE_URL=https://heynota.app
VITE_APP_URL=https://app.heynota.app
VITE_GOOGLE_SITE_VERIFICATION=...
VITE_GA_MEASUREMENT_ID=G-...
```

Voir `marketing/.env.example`.

---

## 10. Commandes

```bash
npm run marketing:seo:audit
npm run deploy:marketing
npm run domains:ensure
curl -sI https://heynota.app/sitemap.xml | head
curl -sI https://heynota.app/logiciel-serrurier | head  # 301
```

---

## 11. Roadmap 90 jours

| Semaine | Livrable                                  |
| ------- | ----------------------------------------- |
| S1      | Mesure + indexation + 1 vidéo             |
| S2      | Pilier enrichi + annuaires                |
| S3      | Guide + témoignage                        |
| S4      | Page secteur 1                            |
| S5–8    | Guide 2, vidéo 2, secteur 2, comparatif   |
| S9–12   | Revue GSC, contenu sur requêtes gagnantes |

---

## 12. Annexes

### Intent → URL

| Intent                 | URL                                |
| ---------------------- | ---------------------------------- |
| Logiciel interventions | `/logiciel-interventions-terrain`  |
| Équipe terrain         | `/planning-techniciens`            |
| Facturation            | `/facturation-interventions`       |
| Excel                  | `/excel-vs-logiciel-interventions` |
| Essai sans friction    | `/crm-sans-inscription`            |
| Secteurs               | `/pour-qui`                        |
| PWA                    | `/installer-nota`                  |

### UTM externes

| Canal    | source   | medium   | campaign           |
| -------- | -------- | -------- | ------------------ |
| YouTube  | youtube  | video    | demo_interventions |
| LinkedIn | linkedin | social   | founder_post       |
| Email    | email    | outbound | terrain_2026       |
| Capterra | capterra | referral | profile            |

### Docs liés

- `marketing/CLAUDE.md`
- `docs/marketing/SEO-JOUR-1.md`

---

_Mettre à jour ce fichier après chaque revue mensuelle GSC._

---

## 13. Critères qualité par page (before publish)

Pour chaque nouvelle URL ou refonte :

- [ ] **H1** = intention principale (pas le nom de marque seul)
- [ ] **Title** 50–60 caractères, mot-clé en tête si naturel
- [ ] **Meta description** 120–160 caractères, bénéfice + CTA implicite
- [ ] **≥ 1 CTA** « Ouvrir Nota » visible desktop + sticky mobile
- [ ] **≥ 400 mots** utiles (pilier ≥ 1 200)
- [ ] **2+ liens internes** vers pilier ou `/pour-qui`
- [ ] **≥ 1 visuel** produit (alt text descriptif)
- [ ] **FAQ** 2–5 questions si requêtes PAA possibles
- [ ] **Unique** : pas copier-coller une autre landing
- [ ] `npm run marketing:seo:audit` vert avant deploy

---

## 14. E-E-A-T & confiance

| Signal                | Action                                                      |
| --------------------- | ----------------------------------------------------------- |
| **Experience**        | Screenshots réels, vidéo démo, cas d'usage nommé            |
| **Expertise**         | Guides pratiques terrain (pas jargon vide)                  |
| **Authoritativeness** | Backlinks, annuaires, LinkedIn entreprise                   |
| **Trust**             | `/a-propos`, pas de dark patterns, `security.txt`, RGPD app |
| **Transparence**      | Prix / essai : message « ouvrir l'app » clair               |

---

## 15. Concurrence & positionnement SERP

Typologie de résultats sur « logiciel gestion interventions » :

- **Gros SaaS** (Salesforce Field Service, Praxedo, Kizeo…) — budgets SEO énormes
- **Annuaires** (Capterra, Appvizer) — toujours en page 1
- **YouTube** — carrousels sur requêtes « démo / avis »
- **Pages métier** — artisans, maintenance

**Stratégie réaliste Nota** : longue traîne + preuve produit + YouTube + annuaires, pas frontal immédiat sur requêtes les plus chères.

---

## 16. International (FR / BE / NL)

- App : FR, NL, EN (README) — marketing **FR seul** aujourd'hui
- Phase 2 : pages `/nl/...` ou site `heynota.be` si traction BE
- hreflang uniquement quand contenu **équivalent** existe

---

## 17. Sécurité & SEO technique avancé

- HSTS, headers : `marketing/vercel.json` (OK)
- Pas de données perso collectées sur marketing (message footer OK)
- **Canonical** unique par page (SPA `SeoHead` OK)
- **404** noindex (audit OK)
- **Liens sortants app** : `rel=noopener` (OK)
- Monitorer **soft 404** GSC si contenu trop mince

---

## 18. ASO (stores) si app native publiée

- Titre store : inclure « interventions » / « terrain »
- Screenshots : carte + mobile technicien (alignés SEO)
- Lien store depuis `/installer-nota` et footer

---

## 19. Revue mensuelle (template 30 min)

1. GSC : requêtes nouvelles, pages en progression/régression
2. GA4 : organic → `click_open_nota` rate par landing
3. Décider **1** page à enrichir + **1** action off-site
4. Mettre à jour section 7 (cocher) et date en tête de doc

---

## 20. Glossaire

| Terme         | Définition Nota                                              |
| ------------- | ------------------------------------------------------------ |
| **Lead**      | Utilisateur ayant cliqué vers l'app et commencé à l'utiliser |
| **Pilier**    | `/logiciel-interventions-terrain`                            |
| **Cluster A** | Requêtes « logiciel + interventions / terrain »              |
| **CWV**       | Core Web Vitals (LCP, INP, CLS)                              |
| **PAA**       | People Also Ask (Google) — inspirer FAQ                      |
