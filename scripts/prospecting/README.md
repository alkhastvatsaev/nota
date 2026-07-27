# Prospection serruriers

Script pour constituer une liste de serruriers **contactables** en France (téléphone et/ou email publics).

## Lancer

```bash
npm run prospect:serruriers
# ou
node scripts/prospecting/find-serruriers.mjs --limit 100 --output ./mes-serruriers.csv
```

Le CSV est généré par défaut dans `scripts/prospecting/output/serruriers.csv`.

## Source

**OpenStreetMap** (Overpass) : nom, adresse, téléphone, email, site web quand disponibles.

## Cadre légal

Prospection B2B soumise au RGPD / CNIL. Vérifiez la base légale avant emailing ou appels massifs.

## Reconstruire le kit (deck + mails)

```bash
node scripts/prospecting/build-prospection-kit.mjs
# mails / ENVOI seulement :
node scripts/prospecting/build-prospection-kit.mjs --mails-only
```

Génère dans `output/` :

- captures démo anonymisées (`pptx-assets/demo/`)
- PDF compressé (~250 Ko) + PPTX
- `serruriers-50-mails.md` (50 mails + relances, 3 variantes, A/B PJ/lien)
- `ENVOI.md`, `PRIORITES-APPEL.md`

Copie le PDF vers `public/prospecting/` pour le lien public Vercel.

**Captures** : uniquement les fichiers dans `output/pptx-assets/real/` (fournis par l'utilisateur). Jamais de mockups HTML — si une capture manque, le script échoue.
