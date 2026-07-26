export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "C’est quoi Nota ?",
    answer:
      "Un outil pour suivre vos clients : notes, étapes de chaque affaire, et rappels — au même endroit.",
  },
  {
    question: "Faut-il s’inscrire ?",
    answer: "Non. Cliquez sur Ouvrir Nota et commencez tout de suite.",
  },
  {
    question: "Nota remplace Excel ?",
    answer:
      "Oui pour le suivi client : plus de tableur éparpillé, vous voyez où en est chaque affaire.",
  },
];
