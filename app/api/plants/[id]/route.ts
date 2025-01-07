// app/api/plants/[id]/route.ts
import prisma from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const plant = await prisma.plant.findUnique({
      where: { id: params.id },
      include: {
        genus: {
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
        },
        diseases: {
          select: {
            id: true,
            label: true,
          },
        },
        pests: {
          select: {
            id: true,
            label: true,
          },
        },
      },
    });

    if (!plant) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    return NextResponse.json(plant);
  } catch (error) {
    console.error("Failed to fetch plant:", error);
    return NextResponse.json(
      { error: "Failed to fetch plant" },
      { status: 500 }
    );
  }
}
