import prisma from "@/app/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        id: true,
        commonName: true,
      },
      orderBy: [{ commonName: "asc" }],
    });

    return NextResponse.json(
      plants.map((plant) => ({
        key: plant.id,
        value: plant.commonName,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch listed plants:", error);
    return NextResponse.json(
      { error: "Failed to fetch listed plants" },
      { status: 500 }
    );
  }
}
