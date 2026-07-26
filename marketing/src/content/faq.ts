export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "C’est quoi Nota ?",
    answer:
      "Un CRM pour suivre vos clients : fiches, notes, pipeline (prospect → signé) et relances.",
  },
  {
    question: "Faut-il s’inscrire ?",
    answer: "Non. Cliquez sur Ouvrir Nota et commencez tout de suite.",
  },
  {
    question: "Nota remplace Excel ?",
    answer:
      "Oui pour le suivi commercial : pipeline clair, notes et prochaines actions — sans tableur.",
  },
];
