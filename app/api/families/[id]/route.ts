import prisma from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const result = await prisma.family.findUnique({
      where: { id },
      include: {
        genuses: {
          select: {
            id: true,
            label: true,
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Family not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch family:", error);
    return NextResponse.json(
      { error: "Failed to fetch family" },
      { status: 500 }
    );
  }
}
