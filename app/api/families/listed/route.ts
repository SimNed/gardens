import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      await prisma.family.findMany({
        select: {
          id: true,
          label: true,
        },
        orderBy: [
          {
            label: "asc",
          },
        ],
      })
    );
  } catch (error) {
    console.error("Failed to fetch families:", error);
    return NextResponse.json(
      { error: "Failed to fetch families" },
      { status: 500 }
    );
  }
}
