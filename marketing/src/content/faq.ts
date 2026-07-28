export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "C’est quoi Nota CRM ?",
    answer:
      "Nota CRM (heynota.app) est un CRM pour entreprises à interventions sur site : carte des missions, dossiers clients, hub technicien mobile et facturation. L’app est sur app.heynota.app.",
  },
  {
    question: "Qui a créé Nota ?",
    answer:
      "Nota CRM a été créé par Alkhast Vatsaev. Plus d’infos sur heynota.app/alkhast-vatsaev.",
  },
  {
    question: "Pour quels types d’entreprises ?",
    answer:
      "Maintenance, installation, dépannage, services récurrents, IT sur site, property management… Toute structure qui envoie des techniciens chez ses clients.",
  },
  {
    question: "Faut-il s’inscrire sur ce site ?",
    answer: "Non. heynota.app renvoie vers l’app : ouverture directe, sans formulaire marketing.",
  },
  {
    question: "Nota remplace Excel ?",
    answer:
      "Pour le suivi des interventions et clients, oui : vue partagée, mobile terrain et moins de versions de fichiers.",
  },
  {
    question: "Ça marche sur téléphone ?",
    answer:
      "Oui. PWA installable sur l’écran d’accueil, avec mode hors-ligne pour les techniciens (synchro au retour réseau).",
  },
  {
    question: "Où est l’application Nota CRM ?",
    answer: "Sur app.heynota.app — bouton « Ouvrir Nota » sur heynota.app.",
  },
];
