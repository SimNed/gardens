"use server";

import prisma from "@/lib/db";

export async function getAllPlantsName() {
  try {
    return prisma.plant.findMany({
      select: {
        id: true,
        commonName: true,
      },
    });
  } catch (e) {
    throw new Error("Failed to get plants");
  }
}

export async function getPlant(id: string) {
  try {
    return prisma.plant.findUnique({
      where: {
        id,
      },
    });
  } catch (e) {
    throw new Error(`Failed to get plant with id ${id} `);
  }
}
