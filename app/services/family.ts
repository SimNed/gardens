import { cache } from "react";
import prisma from "../lib/prisma/db";

export const getListedFamilies = cache(async () => {
  const families = await prisma.family.findMany({
    select: {
      id: true,
      label: true,
    },
    orderBy: {
      label: "asc",
    },
  });

  return families.map((f) => {
    return { key: f.label, value: f.id };
  });
});

export const getFamily = async (id: string) => {
  return await prisma.family.findUnique({
    where: { id },
    include: {
      genuses: {
        select: {
          id: true,
          label: true,
        },
      },
    },
  });
};
