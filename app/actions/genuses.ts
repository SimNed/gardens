import prisma from "@/lib/prisma/db";
import { GenusDetailedType } from "@/types/genus";

export async function getGenusDetailed(
  id: string
): Promise<GenusDetailedType | null> {
  try {
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
  } catch (error) {
    console.error("Failed to fetch plant:", error);
    throw new Error("Failed to fetch plant");
  }
}
