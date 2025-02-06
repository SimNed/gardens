import { FieldQuestionType, PlantWithTaxonomyQuizzType } from "@/types/quizz";
import { sanitizedQuizzString, sanitizedString } from "./string";

const getConvertedFields = (
  fields: Array<{ label: string; solution: string }>
) => {
  return fields.map((field, index) => ({
    index: index,
    label: field.label,
    solution: field.solution,
    success: false,
  }));
};

export const IsFieldCorrect = (value: string, field: FieldQuestionType) => {
  return (
    sanitizedString(field.solution).toLowerCase() ===
    sanitizedQuizzString(value).toLowerCase()
  );
};

export const getPlantIdentificationQuestionnaire = (
  plants: Array<PlantWithTaxonomyQuizzType>
) => {
  return plants.map((plant) => {
    return {
      element: plant.imageUrl,
      fields: [
        {
          index: 0,
          label: "nom commun",
          solution: plant.commonName,
          success: false,
        },
      ],
    };
  });
};

export const getPlantTaxonomyQuestionnaire = (
  plants: Array<PlantWithTaxonomyQuizzType>
) => {
  return plants.map((plant) => {
    const fields = [
      { label: "famille", solution: plant.familyLabel },
      { label: "genre", solution: plant.genusLabel },
      { label: "espèce", solution: plant.species },
    ];

    return {
      element: plant.commonName,
      fields: getConvertedFields(fields),
    };
  });
};
