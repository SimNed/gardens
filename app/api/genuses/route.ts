import prisma from "@/app/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genuses = await prisma.genus.findMany({
      select: {
        id: true,
        label: true,
      },
      orderBy: [{ label: "asc" }],
    });

    return NextResponse.json(
      genuses.map((genus) => ({
        key: genus.id,
        value: genus.label,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch genuses list:", error);
    return NextResponse.json(
      { error: "Failed to fetch genuses list" },
      { status: 500 }
    );
  }
}
