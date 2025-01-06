import prisma from "@/lib/prisma/db";

import {
  Prisma,
  LifeCycle,
  SunExposure,
  WaterNeed,
  Melliferous,
} from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const where: Prisma.PlantWhereInput = {
      ...(searchParams.get("familyId") && {
        genus: { familyId: searchParams.get("familyId")! },
      }),
      ...(searchParams.get("genusId") && {
        genusId: searchParams.get("genusId")!,
      }),
      ...(searchParams.get("plantCategoryId") && {
        plantCategoryId: searchParams.get("plantCategoryId")!,
      }),
      ...(searchParams.get("lifeCycle") && {
        lifeCycle: { equals: searchParams.get("lifeCycle")! as LifeCycle },
      }),
      ...(searchParams.get("sunExposure") && {
        sunExposure: {
          equals: searchParams.get("sunExposure")! as SunExposure,
        },
      }),
      ...(searchParams.get("waterNeed") && {
        waterNeed: { equals: searchParams.get("waterNeed")! as WaterNeed },
      }),
      ...(searchParams.get("melliferous") && {
        melliferous: {
          equals: searchParams.get("melliferous")! as Melliferous,
        },
      }),
      ...(searchParams.get("coldHardiness") && {
        coldHardiness: {
          lte: +searchParams.get("coldHardiness")!,
        },
      }),
    };

    return NextResponse.json(
      await prisma.plant.findMany({
        where,
        select: {
          id: true,
          commonName: true,
          imageUrl: true,
        },
        orderBy: {
          commonName: "asc",
        },
      })
    );
  } catch (error) {
    console.error("Failed to fetch plants:", error);
    return NextResponse.json(
      { error: "Failed to fetch plants" },
      { status: 500 }
    );
  }
}
