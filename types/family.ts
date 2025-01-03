import { Family } from "@prisma/client";

export type FamilyDetailedType = Family & {
  genuses: {
    id: string;
    label: string;
  }[];
};
