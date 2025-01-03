import prisma from "@/lib/prisma/db";
import { FamilyDetailedType } from "@/types/family";

export async function getFamilyDetailed(
  id: string
): Promise<FamilyDetailedType | null> {
  try {
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
  } catch (error) {
    console.error("Failed to fetch plant:", error);
    throw new Error("Failed to fetch plant");
  }
}
