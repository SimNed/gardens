import { getListedPlants } from "@/app/services/plant";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const plants = await getListedPlants();

    return NextResponse.json(plants);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch families list" },
      { status: 500 }
    );
  }
}
