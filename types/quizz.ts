type AnswerType = { solution: string; success: boolean };

export type QuestionType = { label: string; solution: string };

export type ItemQuestionsType = {
  element: string;
  questions: QuestionType[];
};

export type ItemAnswersType = {
  element: string;
  answers: AnswerType[];
};

export type QuizzStateType = {
  currentIndex: number;
  results: ItemAnswersType[];
};

export type PlantWithTaxonomyQuizzType = {
  commonName: string;
  species: string;
  familyLabel: string;
  genusLabel: string;
  imageUrl: string;
};

export type PlantQuizzType = {
  commonName: string;
  imageUrl: string;
};
