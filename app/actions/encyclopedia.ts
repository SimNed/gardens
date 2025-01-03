import prisma from "@/lib/prisma/db";
import { EncyclopediaDataType } from "@/types/encyclopedia";

export async function getEncyclopediaListedData(): Promise<EncyclopediaDataType> {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        id: true,
        commonName: true,
      },
      orderBy: [
        {
          commonName: "asc",
        },
      ],
    });

    const families = await prisma.family.findMany({
      select: {
        id: true,
        label: true,
      },
      orderBy: [
        {
          label: "asc",
        },
      ],
    });

    const genuses = await prisma.genus.findMany({
      select: {
        id: true,
        label: true,
      },
      orderBy: [
        {
          label: "asc",
        },
      ],
    });

    return {
      plants: plants.map((plant) => {
        return { key: plant.id, value: plant.commonName };
      }),
      families: families.map((family) => {
        return { key: family.id, value: family.label };
      }),
      genuses: genuses.map((genus) => {
        return { key: genus.id, value: genus.label };
      }),
    };
  } catch (error) {
    console.error("Failed to fetch listed encyclopedia data:", error);
    throw new Error("Failed to fetch encyclopedia data");
  }
}
