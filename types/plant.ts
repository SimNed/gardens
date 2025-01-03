import { Plant } from "@prisma/client";

export type PlantWithTaxonomyType = Plant & {
  genus: {
    id: string;
    label: string;
    family: {
      id: string;
      label: string;
    };
  };
};

export type PlantDetailedType = PlantWithTaxonomyType & {
  diseases: {
    id: string;
    label: string;
  }[];
  pests: {
    id: string;
    label: string;
  }[];
};
