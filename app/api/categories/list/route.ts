import prisma from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.plantCategory.findMany({
      select: {
        id: true,
        label: true,
      },
      orderBy: {
        label: "asc",
      },
    });

    return NextResponse.json(
      categories.map((c) => {
        return { key: c.label, value: c.id };
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
