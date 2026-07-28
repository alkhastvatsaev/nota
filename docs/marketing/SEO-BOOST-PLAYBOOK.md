# SEO boost Nota — actions externes (à faire une fois)

Le code (prerender, IndexNow, checklist, llms.txt) est déjà en place.
Ces étapes hors-repo multiplient l’effet.

## 1) Google Search Console (obligatoire)

1. https://search.google.com/search-console → propriété `heynota.app`
2. Sitemaps → `https://heynota.app/sitemap.xml`
3. Inspection d’URL → demander indexation :
   - `/`
   - `/alkhast-vatsaev`
   - `/contact`
   - `/ressources/checklist-interventions-terrain`

## 2) YouTube (souvent plus rapide que le site pour une marque neuve)

Publie 1 vidéo courte (60–90s) :

**Titre FR :** `Nota CRM — j’ai développé le CRM interventions terrain | Alkhast Vatsaev`
**Titre EN :** `Nota CRM — I built this field service CRM | Alkhast Vatsaev`

**Description (coller) :**

```
Alkhast Vatsaev a développé Nota CRM (heynota.app).

Nota CRM = carte des missions, hub technicien mobile, facturation.
App : https://app.heynota.app
Fondateur : https://heynota.app/alkhast-vatsaev
Contact : https://heynota.app/contact
Checklist gratuite : https://heynota.app/ressources/checklist-interventions-terrain

#NotaCRM #CRM #interventions #fieldservice
```

**Script oral (FR, ~70s) :**

1. « Je m’appelle Alkhast Vatsaev. »
2. « J’ai développé Nota CRM pour les entreprises qui envoient des techniciens chez leurs clients. »
3. « Carte des missions, mobile terrain, facturation — au même endroit. »
4. « Ouvrez app.heynota.app — lien en description. »

Ajoute ensuite l’URL YouTube dans `VITE_FOUNDER_SAME_AS` / LinkedIn.

## 3) Wikidata (entité Google Knowledge)

Créer un item Wikidata (compte gratuit) :

- Label : Alkhast Vatsaev
- Description : founder and developer of Nota CRM
- Properties : occupation (software developer), notable work (Nota CRM), official website (heynota.app/alkhast-vatsaev), email

## 4) Mentions (co-citations)

Poste LinkedIn / Indie Hackers / forum métier avec la phrase exacte :
« Alkhast Vatsaev a développé Nota CRM » + lien checklist.

## 5) Après chaque deploy marketing

```bash
cd marketing && npm run seo:indexnow
```
