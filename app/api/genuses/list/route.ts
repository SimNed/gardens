import prisma from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

    return NextResponse.json(
      genuses.map((g) => {
        return {
          key: g.label,
          value: {
            value: g.id,
            relation: { key: g.family.label, value: g.family.id },
          },
        };
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
