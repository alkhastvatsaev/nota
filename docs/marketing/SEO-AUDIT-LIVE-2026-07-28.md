# Audit SEO live — 28 juil. 2026 (gstack browse + curl)

## Verdict

Fondation technique **solide** (sitemap XML, robots, prerender, favicon, IndexNow, GSC verify).  
Goulot : **autorité + distribution** (YouTube, LinkedIn, annuaires) et **mesure** (GA4).  
Wikidata **fait** (personne + logiciel) — à propager en prod via deploy marketing.

## Checks live (avant ce ship)

| Surface                                 | Résultat                                                            |
| --------------------------------------- | ------------------------------------------------------------------- |
| `/sitemap.xml`                          | 200 `application/xml` OK                                            |
| `/sitemap` → `/sitemap.xml`             | 308 OK                                                              |
| `/robots.txt` `/llms.txt` `/humans.txt` | 200 text/plain OK                                                   |
| `/favicon.ico`                          | 200 icon OK                                                         |
| GSC verify HTML                         | 200 OK                                                              |
| IndexNow key file                       | 200 OK                                                              |
| Prerender `#prerender`                  | Présent home / fondateur / checklist                                |
| JSON-LD prod                            | **Manquait sameAs Wikidata** (deploy marketing en retard vs `main`) |
| JSON-LD fondateur (prerender)           | **Bug** : WebPage pointait vers `/` + FAQ home — **corrigé**        |
| Wikidata Q140742680 / Q140743042        | Live, claims croisés OK                                             |

## Stratégie (priorisée) — exécution

### P0 — Code / infra (agent)

1. ☑ sameAs Wikidata Person + Software + Org (schema SPA + static)
2. ☑ Prerender JSON-LD **par page** (WebPage URL + fondateur mainEntity ; FAQ home only)
3. ☑ `llms.txt` / `humans.txt` + Wikidata
4. ☑ `npm run deploy:marketing` + IndexNow (cette session)
5. ☑ Vérif post-deploy : curl fondateur contient `Q140742680`

### P1 — Toi (comptes) — max impact

1. GSC : soumettre **exactement** `https://heynota.app/sitemap.xml` + demander indexation `/`, `/alkhast-vatsaev`, `/logiciel-interventions-terrain`, `/contact`, checklist
2. GA4 : `VITE_GA_MEASUREMENT_ID` sur Vercel `heynota` + conversion `click_open_nota`
3. Bing Webmaster : importer via IndexNow / sitemap
4. YouTube 1 démo (script `YOUTUBE-DEMO-B1.md`) + 2 Shorts
5. LinkedIn 1 post fondateur (brouillon ci-dessous)
6. Fiches Appvizer + Capterra

### P2 — Contenu (semaine 2)

1. 1 page secteur unique (ex. maintenance)
2. Remplacer témoignage beta `/a-propos`
3. PageSpeed mobile `/` + pilier

## Brouillon LinkedIn (copier-coller)

```
J’ai développé Nota CRM — logiciel d’interventions terrain (carte, mobile technicien, facturation).

Pour les équipes qui tournent encore sur Excel / WhatsApp.

→ https://heynota.app/logiciel-interventions-terrain?utm_source=linkedin&utm_medium=social&utm_campaign=founder
App : https://app.heynota.app

Alkhast Vatsaev
```

## Brouillon Appvizer / Capterra

- Nom : Nota CRM
- Catégorie : Gestion d’interventions / Field service / CRM
- Site : https://heynota.app
- App : https://app.heynota.app
- Fondateur : Alkhast Vatsaev
- Pitch 1 ligne : CRM interventions terrain — carte, hub mobile, facturation, sans mur d’inscription marketing.

## Wikidata (réf.)

- https://www.wikidata.org/wiki/Q140742680
- https://www.wikidata.org/wiki/Q140743042
