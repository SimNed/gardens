import { getListedFamilies } from "@/app/services/family";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const families = await getListedFamilies();

    return NextResponse.json(families);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch families list" },
      { status: 500 }
    );
  }
}
