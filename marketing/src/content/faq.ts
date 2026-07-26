export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "C’est quoi Nota ?",
    answer:
      "L’outil qui garde ce qui compte pour vous : relations, notes, prochaine étape — en clair.",
  },
  {
    question: "Faut-il s’inscrire ?",
    answer: "Non. Ouvrez Nota : c’est à vous, tout de suite.",
  },
  {
    question: "Nota remplace Excel ?",
    answer: "Oui pour le suivi client : vos affaires sous les yeux, sans tableur qui se perd.",
  },
];
