export type QuizzItemType = {
  element: string;
  questions: { label: string; solution: string }[];
};

export type QuizzItemAnswersType = Record<
  string,
  { solution: string; success: boolean }
>;

export type PlantQuizzType = {
  commonName: string;
  taxonomicName: string;
  familyLabel: string;
  genusLabel: string;
  imageUrl: string;
};
