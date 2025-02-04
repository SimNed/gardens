import { getPlant } from "@/app/services/plant";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const plant = await getPlant(params.id);

    if (!plant)
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });

    return NextResponse.json(plant);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch plant" },
      { status: 500 }
    );
  }
}
