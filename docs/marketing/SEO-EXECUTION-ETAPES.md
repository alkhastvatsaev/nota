# Exécution SEO — étape par étape

**Comment utiliser ce fichier**

1. Fais **une seule étape à la fois**, dans l’ordre.
2. Quand c’est fait, remplace `☐` par `☑` sur la ligne.
3. Lance `npm run seo:steps` (depuis `marketing/`) pour voir la prochaine étape.
4. Stratégie détaillée : `SEO-STRATEGIE-AUDIT.md`.

**Légende** : `[CODE]` = déjà dans le repo ou commande dev · `[TOI]` = action manuelle (compte Google, vidéo, etc.)

---

## Phase A — Mesure & mise en ligne (impact 🔴)

| Statut | #       | Étape                                                                                                                                         | Qui    |
| ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------- | ----- |
| ☑      | **A1**  | Créer propriété **Google Search Console** pour `https://heynota.app`                                                                          | [TOI]  |
| ☑      | **A2**  |
| ☑      | **A2b** | Validation Search Console confirmée (fichier HTML — ne pas supprimer `public/google985da6a6498bd3a5.html`)                                    | [TOI]  | Copier le code de vérification HTML → Vercel projet `heynota` → `VITE_GOOGLE_SITE_VERIFICATION` | [TOI] |
| ☐      | **A3**  | Créer flux **GA4** pour heynota.app → Vercel → `VITE_GA_MEASUREMENT_ID`                                                                       | [TOI]  |
| ☐      | **A4**  | Dans GA4 : marquer l’événement **`click_open_nota`** comme conversion                                                                         | [TOI]  |
| ☐      | **A5**  | `npm run deploy:marketing` puis `npm run domains:ensure`                                                                                      | [TOI]  |
| ☑      | **A6**  | Pages SEO + guide + captures produit + UTM + audit (`marketing:seo:audit`)                                                                    | [CODE] |
| ☐      | **A7**  | GSC → Sitemaps → `https://heynota.app/sitemap.xml`                                                                                            | [TOI]  |
| ☐      | **A8**  | GSC → Inspection URL → demander indexation : `/`, `/logiciel-interventions-terrain`, `/guides/excel-vers-logiciel-interventions`, `/pour-qui` | [TOI]  |
| ☐      | **A9**  | **Bing Webmaster** : importer site + même sitemap                                                                                             | [TOI]  |
| ☐      | **A10** | Vérifier prod : `curl -sI https://heynota.app/sitemap.xml` et clic « Ouvrir Nota » (temps réel GA4)                                           | [TOI]  |

---

## Phase B — Distribution rapide (trafic + leads 🔴)

| Statut | #      | Étape                                                                                                                                                                  | Qui   |
| ------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| ☐      | **B1** | Publier **1 vidéo YouTube** (démo carte + mobile, 3–5 min). Description : lien `/logiciel-interventions-terrain?utm_source=youtube&utm_medium=video&utm_campaign=demo` | [TOI] |
| ☐      | **B2** | Découper **2 Shorts** depuis la vidéo                                                                                                                                  | [TOI] |
| ☐      | **B3** | **LinkedIn** fondateur : 1 post + lien pilier + capture `marketing/public/product/carte.png`                                                                           | [TOI] |
| ☐      | **B4** | Fiche **Appvizer** (gratuit) → lien pilier + app                                                                                                                       | [TOI] |
| ☐      | **B5** | Fiche **Capterra** (gratuit)                                                                                                                                           | [TOI] |
| ☐      | **B6** | Signature email + mails prospection : `https://heynota.app/logiciel-interventions-terrain?utm_source=email&utm_medium=outbound&utm_campaign=terrain`                   | [TOI] |

---

## Phase C — Contenu & conversion (semaine 2–4)

| Statut | #      | Étape                                                                                        | Qui    |
| ------ | ------ | -------------------------------------------------------------------------------------------- | ------ |
| ☑      | **C1** | Guide `/guides/excel-vers-logiciel-interventions`                                            | [CODE] |
| ☑      | **C2** | Captures produit accueil + pilier (`public/product/`)                                        | [CODE] |
| ☑      | **C3** | Pilier enrichi + galerie produit                                                             | [CODE] |
| ☐      | **C4** | Remplacer le témoignage **beta** sur `/a-propos` par un **vrai client** (nom, métier, ville) | [TOI]  |
| ☐      | **C5** | Après 2 semaines GSC : ajuster **title/description** des pages CTR < 2 %                     | [TOI]  |
| ☐      | **C6** | **PageSpeed Insights** mobile sur `/` et pilier — noter LCP                                  | [TOI]  |

---

## Phase D — Autorité (mois 2)

| Statut | #      | Étape                                                                 | Qui        |
| ------ | ------ | --------------------------------------------------------------------- | ---------- |
| ☐      | **D1** | Obtenir **3 backlinks** (partenaire, presse, annuaire métier)         | [TOI]      |
| ☐      | **D2** | Publier **1 page secteur** (ex. maintenance) — contenu unique         | [CODE+TOI] |
| ☐      | **D3** | 2e vidéo YouTube (facturation ou planning)                            | [TOI]      |
| ☐      | **D4** | Test Google Ads faible budget (5 requêtes « logiciel interventions ») | [TOI]      |

---

## Phase E — Routine mensuelle

| Statut | #      | Étape                                                         | Qui        |
| ------ | ------ | ------------------------------------------------------------- | ---------- |
| ☐      | **E1** | Revue GSC 30 min (requêtes, pages, CTR)                       | [TOI]      |
| ☐      | **E2** | 1 article ou guide supplémentaire                             | [CODE+TOI] |
| ☐      | **E3** | Demander **1 avis** client (Capterra ou Google) — authentique | [TOI]      |

---

## Ordre recommandé aujourd’hui

```
A1 → A2 → A3 → A4 → A5 → A7 → A8 → A10 → B1 → B3 → B6
```

Ensuite B4, B5, B2, puis C4 quand un client accepte.

---

_Dernière mise à jour code : étapes A6, C1–C3 cochées._
