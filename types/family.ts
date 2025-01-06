import { Family } from "@prisma/client";

export type FamilyType = Family & {
  genuses: {
    id: string;
    label: string;
  }[];
};
