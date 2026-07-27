import type { FaqItem } from "./faq";

export type GuideSection = {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
};

export type GuidePageContent = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  sections: GuideSection[];
  faq: FaqItem[];
};

export const GUIDE_PAGES: GuidePageContent[] = [
  {
    path: "/guides/excel-vers-logiciel-interventions",
    eyebrow: "Guide",
    title: "Passer d’Excel à un logiciel d’interventions",
    lead: "Checklist pratique pour une TPE qui gère déjà ses missions dans un tableur et veut une carte, du mobile et moins d’erreurs — sans projet IT de six mois.",
    sections: [
      {
        h2: "Signes que Excel ne suffit plus",
        bullets: [
          "Plusieurs versions du même fichier circulent",
          "Impossible de voir qui est sur quelle mission en direct",
          "Photos et signatures ne sont pas dans le bon dossier",
          "La facturation repose sur une ressaisie manuelle",
        ],
      },
      {
        h2: "Ce qu’un logiciel terrain apporte",
        paragraphs: [
          "Une intervention = un dossier partagé : statut, adresse sur carte, historique, documents. Le technicien travaille dans son hub mobile ; le bureau garde la vue d’ensemble.",
        ],
        bullets: [
          "Carte et filtres (date, technicien, zone)",
          "Assignation et notifications d’équipe",
          "Mode hors-ligne pour le terrain (PWA)",
        ],
      },
      {
        h2: "Migration en 5 étapes (sans tout bloquer)",
        ordered: [
          "Lister les dossiers « en cours » (pas toute l’historique)",
          "Ouvrir Nota et créer votre espace via l’app",
          "Saisir les interventions actives une par une (30 min suffisent pour tester)",
          "Former 1 technicien pilote sur mobile pendant une demi-journée",
          "Couper Excel seulement quand toute l’équipe utilise le statut partagé",
        ],
      },
      {
        h2: "Erreurs à éviter",
        bullets: [
          "Vouloir migrer 5 ans d’historique le jour 1",
          "Garder WhatsApp en parallèle sans règle (« tout dans le dossier »)",
          "Choisir un ERP usine alors que le besoin est terrain",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps pour être opérationnel ?",
        answer:
          "Pour une petite équipe, quelques heures de saisie des dossiers en cours suffisent pour travailler au quotidien sur Nota.",
      },
      {
        question: "Faut-il s’inscrire sur heynota.app ?",
        answer: "Non : le site renvoie vers l’app en un clic, sans formulaire marketing.",
      },
    ],
  },
];

export const GUIDE_BY_PATH = new Map(GUIDE_PAGES.map((g) => [g.path, g]));
