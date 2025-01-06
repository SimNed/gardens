import { Genus } from "@prisma/client";

export type GenusType = Genus & {
  family: {
    id: string;
    label: string;
  };
  plants: {
    id: string;
    commonName: string;
  }[];
};
