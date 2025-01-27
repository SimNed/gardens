import prisma from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const coldHardinessRange = await prisma.plant.aggregate({
      _min: {
        coldHardiness: true,
      },
      _max: {
        coldHardiness: true,
      },
    });

    return NextResponse.json({
      min: coldHardinessRange._min.coldHardiness ?? -9,
      max: coldHardinessRange._max.coldHardiness ?? 9,
    });
  } catch (error) {
    console.error("Failed to fetch genuses list:", error);
    return NextResponse.json(
      { error: "Failed to fetch genuses list" },
      { status: 500 }
    );
  }
}
