import { cache } from "react";
import prisma from "../lib/prisma/db";

export const getListedCategories = cache(async () => {
  const categories = await prisma.plantCategory.findMany({
    select: {
      id: true,
      label: true,
    },
    orderBy: {
      label: "asc",
    },
  });

  return categories.map((c) => {
    return { key: c.label, value: c.id };
  });
});
