import { Plant } from "@prisma/client";

export type PlantType = Plant & {
  genus: {
    id: string;
    label: string;
    family: {
      id: string;
      label: string;
    };
  };
  diseases: {
    id: string;
    label: string;
  }[];
  pests: {
    id: string;
    label: string;
  }[];
};
