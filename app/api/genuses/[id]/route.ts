import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const result = await prisma.genus.findUnique({
      where: { id },
    });

    if (!result) {
      return NextResponse.json({ error: "Genus not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch genus:", error);
    return NextResponse.json(
      { error: "Failed to fetch genus" },
      { status: 500 }
    );
  }
}
