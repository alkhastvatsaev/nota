# Hiring intel — qui recrute des dev junior / mid en France

## Vérité froide

**Non** : on ne peut pas savoir, entreprise par entreprise, qui a **vraiment embauché** le plus de juniors/mids ces derniers mois.

- Les DPAE (Urssaf) sont **agrégées** (secteur / région), pas nominatives.
- Pas de niveau junior/mid dans les stats publiques.
- LinkedIn historique = payant / non scrapable proprement.

**Oui (proxy utile)** : compter les **offres d’emploi actives** (et leur date de création) = signal de qui **recrute maintenant**.

Ce script utilise l’**API officielle France Travail** (légal, gratuit après inscription).

## Setup (5–10 min)

1. Compte développeur : https://francetravail.io/data/api/offres-emploi
2. Créer une application → scopes `api_offresdemploiv2` + `o2dsoffre`
3. Copier client id / secret :

```bash
export FRANCE_TRAVAIL_CLIENT_ID="..."
export FRANCE_TRAVAIL_CLIENT_SECRET="..."
```

## Lancer

```bash
node scripts/hiring-intel/rank-hiring-companies.mjs
```

Options :

```bash
# 90 derniers jours d'offres créées, top 80 entreprises
node scripts/hiring-intel/rank-hiring-companies.mjs --days=90 --top=80

# Uniquement CDI
node scripts/hiring-intel/rank-hiring-companies.mjs --contrat=CDI --remote

# Export CSV custom
node scripts/hiring-intel/rank-hiring-companies.mjs --out=scripts/hiring-intel/output/ranking.csv
```

Sorties dans `scripts/hiring-intel/output/` :

- `ranking-companies.csv` — entreprises classées par volume d’offres junior/mid
- `offers-raw.json` — offres brutes (pour relire / filtrer)

## Comment lire le ranking

| Signal                         | Interprétation                                                    |
| ------------------------------ | ----------------------------------------------------------------- |
| Beaucoup d’offres              | Boîte qui recrute **maintenant** (ESN / scale-up souvent en tête) |
| Offre récente (`dateCreation`) | Ouverture fraîche → contacter vite                                |
| ESN (Alten, Capgemini…)        | Volume élevé ≠ meilleur job, mais process rapide                  |
| Petite boîte avec 2–3 offres   | Souvent meilleur ratio effort → entretien                         |

## Limites

- Une offre ≠ une embauche.
- Beaucoup d’ESN / cabinets masquent le client final.
- Junior/mid = heuristique mots-clés (pas un champ officiel).
- L’API ne couvre pas 100 % des offres LinkedIn / WTTJ.

## Usage job search (cheat)

1. Lance le script.
2. Prends le **top 30 hors ESN géantes** (ou inclut-les si tu veux du volume).
3. Envoie ton message Loom NOTA aux CTO / leads de ces boîtes.
