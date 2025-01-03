import prisma from "@/lib/prisma/db";
import { KeyValueType } from "@/types/data";
import { PlantDetailedType, PlantWithTaxonomyType } from "@/types/plant";

export async function getListedPlants(): Promise<KeyValueType[]> {
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
    return plants.map((plant) => {
      return { key: plant.commonName, value: plant.id };
    });
  } catch (error) {
    console.error("Failed to fetch listed plants:", error);
    throw new Error("Failed to fetch listed plants");
  }
}

export async function getPlantWithTaxonomy(
  id: string
): Promise<PlantWithTaxonomyType | null> {
  try {
    return await prisma.plant.findUnique({
      where: { id: id },
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
      },
    });
  } catch (error) {
    console.error("Failed to fetch plant:", error);
    throw new Error("Failed to fetch plant");
  }
}

export async function getPlantDetailed(
  id: string
): Promise<PlantDetailedType | null> {
  try {
    return await prisma.plant.findUnique({
      where: { id: id },
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
  } catch (error) {
    console.error("Failed to fetch plant:", error);
    throw new Error("Failed to fetch plant");
  }
}
