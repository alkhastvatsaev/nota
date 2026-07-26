export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "C’est quoi Nota ?",
    answer:
      "L’outil qui rassemble pour vous : notes clients, étapes de chaque affaire, et rappels — au même endroit.",
  },
  {
    question: "Faut-il s’inscrire ?",
    answer: "Non. Ouvrez Nota : c’est à vous, tout de suite.",
  },
  {
    question: "Nota remplace Excel ?",
    answer:
      "Oui pour le suivi client : plus de tableur éparpillé, vous voyez où en est chaque affaire.",
  },
];
