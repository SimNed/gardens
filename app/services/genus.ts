import { cache } from "react";
import prisma from "../lib/prisma/db";

export const getListedGenuses = cache(async () => {
  const genuses = await prisma.genus.findMany({
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
    orderBy: {
      label: "asc",
    },
  });

  return genuses.map((g) => {
    return {
      key: g.label,
      value: g.id,
    };
  });
});

export const getGenus = async (id: string) => {
  return await prisma.genus.findUnique({
    where: { id },
    include: {
      family: {
        select: {
          id: true,
          label: true,
        },
      },
      plants: {
        select: {
          id: true,
          commonName: true,
        },
      },
    },
  });
};
