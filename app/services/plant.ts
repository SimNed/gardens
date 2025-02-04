import { cache } from "react";
import prisma from "../lib/prisma/db";

export const getListedPlants = cache(async () => {
  const plants = await prisma.plant.findMany({
    select: {
      id: true,
      commonName: true,
    },
    orderBy: [{ commonName: "asc" }],
  });

  return plants.map((plant) => ({
    key: plant.commonName,
    value: plant.id,
  }));
});

export const getPlant = async (id: string) => {
  return await prisma.plant.findUnique({
    where: { id },
    include: {
      genus: {
        select: {
          id: true,
          label: true,
          family: {
            select: {
              id: true,
              label: true,
            },
          },
        },
      },
      diseases: {
        select: {
          id: true,
          label: true,
        },
      },
      pests: {
        select: {
          id: true,
          label: true,
        },
      },
    },
  });
};
