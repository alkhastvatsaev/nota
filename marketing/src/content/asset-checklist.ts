import type { Locale } from "../i18n/types";

export type ChecklistContent = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  whyUnique: string;
  sections: { h2: string; items: string[] }[];
  howToUse: string[];
  ctaNote: string;
};

const PATH = "/ressources/checklist-interventions-terrain";

const FR: ChecklistContent = {
  path: PATH,
  eyebrow: "Ressource gratuite",
  title: "Checklist interventions terrain 2026 — Excel vs Nota CRM",
  lead: "Grille pour décider si un tableur suffit encore, ou s’il faut un logiciel d’interventions terrain (Nota CRM).",
  whyUnique:
    "Document créé pour heynota.app — pas une reprise de blog générique. À imprimer, partager en équipe, ou joindre à un devis interne.",
  sections: [
    {
      h2: "Avant la mission",
      items: [
        "Adresse + accès chantier confirmés (code, digicode, contact sur place)",
        "Pièces / matériel réservés ou en stock véhicule",
        "Technicien assigné avec compétences adaptées",
        "Créneau client confirmé (SMS / appel) la veille",
        "Photos / plans / historique dispo hors-ligne si besoin",
      ],
    },
    {
      h2: "Pendant l’intervention",
      items: [
        "Statut mission visible en temps réel (pas un Excel figé)",
        "Photos avant / après dans le dossier",
        "Signature client sur place si applicable",
        "Notes de suite (retour, devis, pièces manquantes)",
        "Temps passé et déplacement notés sans double saisie",
      ],
    },
    {
      h2: "Après la mission",
      items: [
        "Facture ou avoir lié à l’intervention (pas un autre fichier)",
        "Relance commerciale planifiée si devis ouvert",
        "Stock / pièces consommées mis à jour",
        "Compte-rendu accessible au bureau sans WhatsApp",
        "Une seule source de vérité pour l’équipe",
      ],
    },
    {
      h2: "Signaux que Excel ne suffit plus",
      items: [
        "Deux versions du même fichier circulent",
        "Un technicien part sans les infos à jour",
        "Les relances clients sont oubliées",
        "La facturation attend des copier-coller",
        "Personne ne voit la carte des missions du jour",
      ],
    },
  ],
  howToUse: [
    "Imprimez cette page (Ctrl/Cmd+P) ou enregistrez en PDF.",
    "Cochez en réunion d’équipe — 15 minutes suffisent.",
    "Si 3+ signaux Excel sont cochés : testez Nota CRM sur app.heynota.app.",
  ],
  ctaNote: "Checklist publiée par Nota CRM (heynota.app).",
};

const EN: ChecklistContent = {
  path: PATH,
  eyebrow: "Free resource",
  title: "2026 field-job checklist — Spreadsheet vs Nota CRM",
  lead: "Grid to decide if a spreadsheet still works — or you need field service software (Nota CRM).",
  whyUnique:
    "Created for heynota.app — not recycled blog filler. Print it, share with the team, or attach to an internal brief.",
  sections: [
    {
      h2: "Before the job",
      items: [
        "Address + site access confirmed (code, contact on site)",
        "Parts / gear reserved or in the van",
        "Right technician assigned",
        "Customer slot confirmed the day before",
        "Photos / plans / history available offline if needed",
      ],
    },
    {
      h2: "During the job",
      items: [
        "Live job status (not a frozen sheet)",
        "Before / after photos in the case file",
        "On-site signature when needed",
        "Follow-up notes (return, quote, missing parts)",
        "Time & travel logged without double entry",
      ],
    },
    {
      h2: "After the job",
      items: [
        "Invoice / credit linked to the job",
        "Sales follow-up scheduled if a quote is open",
        "Consumed stock updated",
        "Report available to the office without WhatsApp",
        "One source of truth for the team",
      ],
    },
    {
      h2: "Signals a spreadsheet is not enough",
      items: [
        "Two versions of the same file circulate",
        "A tech leaves with stale info",
        "Customer follow-ups get forgotten",
        "Billing waits on copy-paste",
        "Nobody sees today’s job map",
      ],
    },
  ],
  howToUse: [
    "Print this page (Ctrl/Cmd+P) or save as PDF.",
    "Run it in a 15-minute team meeting.",
    "If 3+ spreadsheet signals are checked: try Nota CRM at app.heynota.app.",
  ],
  ctaNote: "Checklist published by Nota CRM (heynota.app).",
};

export function getChecklistContent(locale: Locale): ChecklistContent {
  return locale === "en" ? EN : FR;
}

export const CHECKLIST_PATH = PATH;
