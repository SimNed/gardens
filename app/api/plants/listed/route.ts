import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await prisma.plant.findMany({
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

    return NextResponse.json(
      results.map((p) => {
        return { id: p.id, label: p.commonName };
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
