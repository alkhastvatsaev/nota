import { FOUNDER_FULL_NAME, FOUNDER_PROFILE_PATH } from "../config/founder";
import type { LandingPageContent } from "./landing-types";

export const LANDING_PAGES_FR: LandingPageContent[] = [
  {
    path: "/logiciel-interventions-terrain",
    eyebrow: "Interventions sur site",
    title: "Logiciel d’interventions sur le terrain : carte, mobile, facturation",
    lead: "Nota regroupe carte des missions, dossiers clients, planning équipe et facturation — pour toute entreprise qui envoie des techniciens chez ses clients.",
    showProductGallery: true,
    sections: [
      {
        h2: "Clients, chantiers et équipe — sans Excel ni fil WhatsApp",
        paragraphs: [
          "Appels, adresses, technicien à assigner, photos, devis, facture : tout avance en parallèle.",
          "Nota met interventions, clients et équipe sur une carte et une app mobile — vous voyez qui est sur le terrain et où en est chaque dossier.",
        ],
      },
      {
        h2: "Ce que Nota fait pour vous",
        bullets: [
          "Carte des interventions en temps réel",
          "Hub société : dossiers, géolocalisation, portail client",
          "Hub technicien : missions, photos avant/après, signature",
          "Facturation et suivi commercial intégrés",
          "Mode hors-ligne (PWA) : synchro au retour réseau",
          "Accès direct à l’app, sans inscription sur ce site",
        ],
      },
      {
        h2: "Types d’entreprises",
        paragraphs: [
          "Maintenance, installation, dépannage, services aux particuliers ou aux pros, property management, IT sur site, nettoyage, BTP léger… Toute TPE ou PME avec des interventions chez le client.",
        ],
      },
      {
        h2: "Comparer avec votre situation actuelle",
        bullets: [
          "Vous utilisez Excel ou Google Sheets pour suivre les missions",
          "Les techniciens envoient photos ou infos par SMS / WhatsApp",
          "Personne n’a la même vue d’ensemble au bureau",
          "La facturation arrive après coup, avec ressaisie",
        ],
        paragraphs: [
          "Si vous cochez au moins deux cases, un logiciel terrain comme Nota vous fera gagner du temps — voir notre guide",
          "« Passer d’Excel à un logiciel d’interventions » dans le menu du pied de page.",
        ],
      },
      {
        h2: "Démarrer en quelques minutes",
        ordered: [
          "Ouvrir Nota depuis ce site",
          "Créer une intervention ou vos dossiers en cours",
          "Assigner un technicien et suivre sur la carte",
        ],
      },
    ],
    faq: [
      {
        question: "Nota convient à mon métier ?",
        answer:
          "Si vous planifiez des visites sur site, assignez des techniciens et devez facturer le travail réalisé, oui — quel que soit votre secteur.",
      },
      {
        question: "Faut-il une carte bancaire pour essayer ?",
        answer: "Non. Ouvrez l’app directement — pas de formulaire sur heynota.app.",
      },
      {
        question: "Les techniciens peuvent-ils travailler sans réseau ?",
        answer:
          "L’app fonctionne en PWA avec synchronisation automatique quand la connexion revient.",
      },
    ],
  },
  {
    path: "/interventions-terrain",
    eyebrow: "Terrain",
    title: "Gérer vos interventions terrain au quotidien",
    lead: "Centralisez planning, dossiers et équipe. Une vue carte pour le bureau, une app claire pour ceux qui sont chez le client.",
    sections: [
      {
        h2: "Pourquoi un outil dédié aux interventions",
        bullets: [
          "Voir la prochaine mission en un coup d’œil",
          "Plusieurs techniciens = assignation et statuts partagés",
          "Photos et signatures rattachées au bon dossier",
        ],
      },
      {
        h2: "Bureau et terrain alignés",
        paragraphs: [
          "Le responsable suit la carte et les dossiers ; le technicien voit ses missions, documente sur place et fait signer le client.",
          "Fini les preuves perdues dans une messagerie.",
        ],
      },
    ],
    faq: [
      {
        question: "Nota remplace-t-il mon groupe WhatsApp pro ?",
        answer:
          "Pour le suivi structuré des missions, oui : chaque intervention a son dossier, pas un message noyé dans le chat.",
      },
    ],
  },
  {
    path: "/gestion-interventions",
    eyebrow: "Gestion d’interventions",
    title: "Gestion d’interventions : carte, statuts et dossiers",
    lead: "Suivez chaque mission de la prise de contact à la clôture — historique, timeline et documents.",
    sections: [
      {
        h2: "Une intervention = un dossier vivant",
        bullets: [
          "Statuts clairs pour toute l’équipe",
          "Timeline des événements CRM",
          "Client et adresse sur la carte",
        ],
      },
      {
        h2: "Visibilité pour décider vite",
        paragraphs: [
          "Filtrez par date, technicien ou zone. Ouvrez un dossier depuis la carte ou la liste — mêmes données, deux vues.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/planning-techniciens",
    eyebrow: "Planning technicien",
    title: "Planning et missions technicien sur mobile",
    lead: "Assignez les interventions, suivez qui est en route et donnez à chaque technicien sa liste du jour sur smartphone.",
    sections: [
      {
        h2: "Assignation sans allers-retours",
        paragraphs: [
          "Depuis le hub société, vous affectez une mission au bon profil. Le technicien la voit dans son hub dédié.",
        ],
        bullets: [
          "Charge et activité par technicien",
          "Missions du jour en mobilité",
          "Photos et signature dans le dossier",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/facturation-interventions",
    eyebrow: "Facturation",
    title: "Facturation liée à vos interventions",
    lead: "De la mission à la facture : gardez le lien entre le travail sur place et ce que vous facturez au client.",
    sections: [
      {
        h2: "Moins d’oublis entre terrain et compta",
        bullets: [
          "Hub facturation intégré au CRM",
          "Données déjà dans le dossier intervention",
          "Moins de ressaisie depuis un tableur",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/pour-qui",
    eyebrow: "Pour qui",
    title: "Pour qui est Nota ?",
    lead: "Pour les entreprises qui envoient des équipes chez leurs clients et veulent un outil simple — pas un ERP usine.",
    sections: [
      {
        h2: "Exemples de secteurs",
        bullets: [
          "Maintenance et SAV (multitech, CVC, électricité, plomberie…)",
          "Installation et dépannage chez particuliers ou pros",
          "Services récurrents (nettoyage, contrôles, audits sur site)",
          "Property management et syndics (interventions immeubles)",
          "IT et télécoms (interventions client)",
          "TPE multi-techniciens qui sortent d’Excel ou WhatsApp",
        ],
      },
      {
        h2: "Ce que Nota n’est pas",
        paragraphs: [
          "Ce n’est pas un ERP industrie ou un logiciel de production atelier : c’est un CRM terrain avec carte, mobile technicien et facturation pour les missions sur site.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: FOUNDER_PROFILE_PATH,
    eyebrow: "Fondateur & développeur",
    title: FOUNDER_FULL_NAME,
    lead: "Alkhast Vatsaev a développé Nota CRM — logiciel d’interventions terrain (heynota.app / app.heynota.app).",
    sections: [
      {
        h2: "Qui je suis",
        paragraphs: [
          "Je m’appelle Alkhast Vatsaev. J’ai développé Nota CRM pour remplacer le bricolage Excel / WhatsApp par un outil clair : missions sur carte, suivi d’équipe, facturation.",
        ],
      },
      {
        h2: "Ce que j’ai développé",
        paragraphs: [
          "Nota CRM sert les équipes terrain — maintenance, installation, dépannage, services récurrents. L’application que j’ai construite regroupe la carte des interventions, le hub technicien mobile et la facturation.",
          "Le site marketing est heynota.app. L’application Nota CRM est sur app.heynota.app.",
        ],
      },
      {
        h2: "Essayer Nota CRM",
        paragraphs: [
          "Ouvrez l’application directement depuis heynota.app. Aucun formulaire d’inscription n’est demandé sur ce site.",
        ],
      },
    ],
    faq: [
      {
        question: "Qui a développé Nota CRM ?",
        answer:
          "Alkhast Vatsaev a développé Nota CRM. Profil : heynota.app/alkhast-vatsaev — app : app.heynota.app.",
      },
      {
        question: "Qu’est-ce que Nota CRM ?",
        answer:
          "Nota CRM est un logiciel d’interventions terrain (carte, mobile technicien, facturation), développé par Alkhast Vatsaev.",
      },
    ],
  },
  {
    path: "/a-propos",
    eyebrow: "À propos",
    title: "À propos de Nota",
    lead: "Nota aide les entreprises à interventions à suivre missions, techniciens et facturation au même endroit.",
    sections: [
      {
        h2: "Fondateur",
        paragraphs: [
          "Nota a été développé par Alkhast Vatsaev — produit, code et expérience utilisateur.",
        ],
      },
      {
        h2: "Notre objectif",
        paragraphs: [
          "Offrir un outil lisible pour le terrain : carte des missions, équipe alignée, moins de friction qu’un SaaS générique mal adapté aux interventions chez le client.",
        ],
      },
      {
        h2: "Sur le terrain",
        paragraphs: [
          "« On voulait arrêter de courir après les infos dans WhatsApp. La carte et le mobile technicien, c’est ce qu’on utilisait le plus dès la première semaine. » — Responsable exploitation, PME maintenance (beta, France).",
        ],
      },
      {
        h2: "Accès & hébergement",
        paragraphs: [
          "Ce site ne collecte pas d’email. Pour utiliser Nota, ouvrez l’application. Hébergement cloud (Vercel, Firebase) ; les données métier restent dans votre espace société.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/excel-vs-logiciel-interventions",
    eyebrow: "Excel vs logiciel",
    title: "Excel ou logiciel pour suivre vos interventions ?",
    lead: "Le tableur suffit au début. Dès que plusieurs techniciens et des missions s’enchaînent, il manque la carte, les statuts et le mobile.",
    sections: [
      {
        h2: "Limites d’Excel pour le terrain",
        bullets: [
          "Pas de carte ni de géolocalisation native",
          "Partage et versions multiples",
          "Pas de hub technicien ni de signature sur place",
        ],
      },
      {
        h2: "Ce qu’apporte Nota",
        paragraphs: [
          "Interventions sur carte, dossiers partagés, application terrain. Commencez avec vos dossiers en cours, sans migration complète le jour 1.",
        ],
      },
    ],
    faq: [],
  },
  {
    path: "/installer-nota",
    eyebrow: "Mobile & PWA",
    title: "Installer Nota sur téléphone (PWA)",
    lead: "Nota est une application web progressive : ajoutez-la à l’écran d’accueil pour un accès rapide, comme une app native.",
    sections: [
      {
        h2: "Sur iPhone (Safari)",
        ordered: [
          "Ouvrez app.heynota.app dans Safari",
          "Touche Partager → « Sur l’écran d’accueil »",
          "Validez : l’icône Nota apparaît sur votre écran",
        ],
      },
      {
        h2: "Sur Android (Chrome)",
        ordered: [
          "Ouvrez app.heynota.app dans Chrome",
          "Menu ⋮ → « Installer l’application » ou « Ajouter à l’écran d’accueil »",
        ],
      },
      {
        h2: "Hors-ligne",
        paragraphs: [
          "Les données technicien se synchronisent au retour du réseau — utile en sous-sol, parking ou zone mal couverte.",
        ],
      },
    ],
    faq: [],
  },
];
