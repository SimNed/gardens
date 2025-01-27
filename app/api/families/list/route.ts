import prisma from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
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

    return NextResponse.json(
      families.map((f) => {
        return { key: f.label, value: f.id };
      })
    );
  } catch (error) {
    console.error("Failed to fetch genuses list:", error);
    return NextResponse.json(
      { error: "Failed to fetch genuses list" },
      { status: 500 }
    );
  }
}
