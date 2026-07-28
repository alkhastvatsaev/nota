import type { Locale } from "../i18n/types";

export type SpecialPageContent = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: {
    h2: string;
    paragraphs?: string[];
    bullets?: string[];
    ordered?: string[];
  }[];
};

const CRM_FR: SpecialPageContent = {
  eyebrow: "CRM sans inscription",
  title: "Suivez vos clients sans créer de compte",
  lead: "Ouvrez Nota et commencez. Pas d’email. Pas de formulaire.",
  sections: [
    {
      h2: "Pourquoi sans inscription ?",
      paragraphs: [
        "Les outils habituels commencent par un compte et un plan. Vous voulez juste noter un client et savoir qui rappeler.",
      ],
    },
    {
      h2: "Ce que Nota fait",
      bullets: [
        "Planifier et suivre les interventions (carte, statuts, dossiers)",
        "Hub technicien mobile : missions, photos, signature",
        "Notes clients et relances commerciales",
        "Accès immédiat à l’app, sans inscription sur ce site",
      ],
    },
    {
      h2: "En 3 gestes",
      ordered: ["Ouvrir Nota", "Ajouter un client ou une affaire", "Noter la prochaine relance"],
    },
  ],
};

const CRM_EN: SpecialPageContent = {
  eyebrow: "CRM without sign-up",
  title: "Track clients without creating an account",
  lead: "Open Nota and start. No email. No form.",
  sections: [
    {
      h2: "Why no sign-up?",
      paragraphs: [
        "Most tools start with an account and a plan. You just want to log a client and know who to call back.",
      ],
    },
    {
      h2: "What Nota does",
      bullets: [
        "Plan and track jobs (map, statuses, cases)",
        "Mobile technician hub: jobs, photos, signature",
        "Client notes and commercial follow-ups",
        "Instant app access — no sign-up on this site",
      ],
    },
    {
      h2: "In 3 steps",
      ordered: ["Open Nota", "Add a client or deal", "Note the next follow-up"],
    },
  ],
};

const ALT_FR: SpecialPageContent = {
  eyebrow: "Alternative Excel commercial",
  title: "Remplacez le tableur pour suivre vos clients",
  lead: "Excel marche… jusqu’à la mauvaise version, la colonne oubliée, ou le rappel raté.",
  sections: [
    {
      h2: "Le frein Excel",
      bullets: [
        "Plusieurs fichiers, plusieurs vérités",
        "Rappels difficiles à tenir",
        "Partage d’équipe fragile",
        "Vue d’ensemble qui se perd",
      ],
    },
    {
      h2: "Nota à la place",
      paragraphs: [
        "Interventions sur carte, dossiers partagés et hub technicien — sans tableur à maintenir.",
      ],
    },
    {
      h2: "Pour qui",
      paragraphs: [
        "Freelances, TPE et petites équipes qui vendent en relationnel et en ont assez des pastilles de couleur dans une feuille.",
      ],
    },
    {
      h2: "Sans friction",
      paragraphs: [
        "Pas besoin de tout migrer le jour 1. Ouvrez Nota, ajoutez vos affaires en cours, avancez.",
      ],
    },
  ],
};

const ALT_EN: SpecialPageContent = {
  eyebrow: "Spreadsheet alternative",
  title: "Replace the spreadsheet to track clients",
  lead: "Spreadsheets work… until the wrong version, a missing column, or a missed follow-up.",
  sections: [
    {
      h2: "Spreadsheet friction",
      bullets: [
        "Several files, several truths",
        "Hard-to-keep reminders",
        "Fragile team sharing",
        "Overview that gets lost",
      ],
    },
    {
      h2: "Nota instead",
      paragraphs: [
        "Jobs on a map, shared cases and a technician hub — without maintaining a spreadsheet.",
      ],
    },
    {
      h2: "Who it’s for",
      paragraphs: [
        "Freelancers, SMBs and small teams who sell through relationships and are done with colour cells in a sheet.",
      ],
    },
    {
      h2: "Low friction",
      paragraphs: [
        "No need to migrate everything on day one. Open Nota, add active deals, move forward.",
      ],
    },
  ],
};

export function getCrmSansInscriptionContent(locale: Locale): SpecialPageContent {
  return locale === "en" ? CRM_EN : CRM_FR;
}

export function getAlternativeExcelContent(locale: Locale): SpecialPageContent {
  return locale === "en" ? ALT_EN : ALT_FR;
}
