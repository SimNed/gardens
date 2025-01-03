import { Genus } from "@prisma/client";

export type GenusDetailedType = Genus & {
  family: {
    id: string;
    label: string;
  };
  plants: {
    id: string;
    commonName: string;
  }[];
};
