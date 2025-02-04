export type FieldQuestionType = {
  index: number;
  label: string;
  solution: string;
  success: boolean;
};

export type QuestionType = {
  element: string;
  fields: Array<FieldQuestionType>;
};

///

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
