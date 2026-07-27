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

## Commands (dev)

```bash
npm run marketing:dev
npm run marketing:build
npm run marketing:preview
npm run marketing:seo:audit
```
