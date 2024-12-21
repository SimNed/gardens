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
