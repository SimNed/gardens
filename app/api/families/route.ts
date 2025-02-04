import prisma from "@/app/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const families = await prisma.family.findMany({
      select: {
        id: true,
        label: true,
      },
      orderBy: [{ label: "asc" }],
    });

    return NextResponse.json(
      families.map((family) => ({
        key: family.id,
        value: family.label,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch families list:", error);
    return NextResponse.json(
      { error: "Failed to fetch families list" },
      { status: 500 }
    );
  }
}
