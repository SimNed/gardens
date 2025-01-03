import prisma from "@/lib/prisma/db";
import { SearchFormOptionProps } from "@/types/filter";

import { LifeCycle, Melliferous, SunExposure, WaterNeed } from "@prisma/client";

export async function getSearchFormOptions(): Promise<SearchFormOptionProps> {
  try {
    const families = await prisma.family.findMany({
      select: {
        id: true,
        label: true,
      },
      orderBy: {
        label: "asc",
      },
    });

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

    const categories = await prisma.plantCategory.findMany({
      select: {
        id: true,
        label: true,
      },
      orderBy: {
        label: "asc",
      },
    });

    const coldHardinessRange = await prisma.plant.aggregate({
      _min: {
        coldHardiness: true,
      },
      _max: {
        coldHardiness: true,
      },
    });

    return {
      family: families.map((f) => {
        return { key: f.label, value: f.id };
      }),

      genus: genuses.map((g) => {
        return {
          key: g.label,
          value: g.id,
          relation: { key: g.family.label, value: g.family.id },
        };
      }),

      category: categories.map((c) => {
        return { key: c.label, value: c.id };
      }),

      lifeCycle: [
        { key: "Annuelle", value: LifeCycle.ANNUAL },
        { key: "Bisannuelle", value: LifeCycle.BISANNUAL },
        { key: "Vivace", value: LifeCycle.PERENNIAL },
      ],
      sunExposure: [
        { key: "Ombre", value: SunExposure.SHADE },
        { key: "Mi-ombre", value: SunExposure.PARTIAL_SHADE },
        { key: "Plein soleil", value: SunExposure.FULL_SUN },
      ],
      waterNeed: [
        { key: "Léger", value: WaterNeed.LOW },
        { key: "Modéré", value: WaterNeed.MODERATE },
        { key: "Haut", value: WaterNeed.HIGH },
      ],
      melliferous: [
        { key: "Léger", value: Melliferous.LOW },
        { key: "Modéré", value: Melliferous.MODERATE },
        { key: "Haut", value: Melliferous.HIGH },
      ],
      coldHardiness: {
        min: coldHardinessRange._min.coldHardiness ?? -9,
        max: coldHardinessRange._max.coldHardiness ?? 9,
      },
    };
  } catch (error) {
    console.error("Failed to fetch filters options:", error);
    throw new Error("Failed to fetch filters options");
  }
}
