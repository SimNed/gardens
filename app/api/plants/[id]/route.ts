import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const result = await prisma.plant.findUnique({
      where: { id },
      include: {
        genus: {
          select: {
            label: true,
            family: {
              select: {
                label: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch plant:", error);
    return NextResponse.json(
      { error: "Failed to fetch plant" },
      { status: 500 }
    );
  }
}
