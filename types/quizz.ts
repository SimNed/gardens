type QuestionType = { label: string; solution: string };

type AnswerType = { solution: string; success: boolean };

export type QuizzItemAnswersType = Record<string, AnswerType>;

export type QuizzItemType = {
  element: string;
  questions: QuestionType[];
};

export type PlantQuizzType = {
  commonName: string;
  taxonomicName: string;
  familyLabel: string;
  genusLabel: string;
  imageUrl: string;
};
