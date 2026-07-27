# Nota marketing (`marketing/`)

Site marketing Vite + React pour Nota CRM — https://heynota.app

Ce dossier vit dans le monorepo **NOTA**. L’app CRM Next.js reste à la racine.

## Domaines (séparation prod)

| Surface   | Domaine                           | Projet Vercel |
| --------- | --------------------------------- | ------------- |
| Marketing | https://heynota.app (+ www → 308) | **`heynota`** |
| App CRM   | https://app.heynota.app           | **`nota`**    |

### Deploy (depuis la racine NOTA)

```bash
npm run deploy:marketing   # vercel --prod dans marketing/ + domains:ensure
npm run deploy:app         # vercel --prod CRM + domains:ensure
npm run domains:ensure     # répare / vérifie la séparation si un deploy a croisé les alias
npm run domains:check      # exit 1 si mal assigné (CI)
```

`domains:ensure` retire `heynota.app` / `www` du projet `nota` s’ils y ont été rattachés, les remet sur `heynota`, ré-alias les derniers déploiements READY, puis health-check HTTP.

### Env (projet `heynota`)

- `VITE_SITE_URL=https://heynota.app`
- `VITE_APP_URL=https://app.heynota.app`
- `VITE_GOOGLE_SITE_VERIFICATION` — Search Console (méthode balise meta). **Alternative** : fichier `public/googleXXXXXXXX.html` (méthode fichier HTML, sans variable d’env).
- `VITE_GA_MEASUREMENT_ID` — GA4 (`page_view`, `click_open_nota`)

Checklist jour J : `docs/marketing/SEO-JOUR-1.md`  
Audit & stratégie complète : `docs/marketing/SEO-STRATEGIE-AUDIT.md`  
**Exécution étape par étape** : `docs/marketing/SEO-EXECUTION-ETAPES.md` · `npm run seo:steps`

## Commands (dev)

```bash
npm run marketing:dev
npm run marketing:build
npm run marketing:preview
npm run marketing:seo:audit
```
