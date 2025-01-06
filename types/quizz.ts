type QuestionType = { label: string; solution: string };

type AnswerType = { solution: string; success: boolean };

export type QuizzItemAnswersType = Record<string, AnswerType>;

export type QuizzItemType = {
  element: string;
  questions: QuestionType[];
};

// interface PlantQuizzProps {
//   commonName: string;
//   taxonomicName: string;
//   imageUrl: string;
//   familyLabel: string;
//   genusLabel: string;
// }

// export type PlantQuizzType = Partial<PlantQuizzProps>;

export type PlantWithTaxonomyQuizzType = {
  commonName: string;
  taxonomicName: string;
  familyLabel: string;
  genusLabel: string;
  imageUrl: string;
};

export type PlantQuizzType = {
  commonName: string;
  imageUrl: string;
};
