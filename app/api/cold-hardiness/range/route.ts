import { getColdHardinessRange } from "@/app/services/cold-hardiness";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const coldHardinessRange = await getColdHardinessRange();

    return NextResponse.json(coldHardinessRange);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cold hardiness range list" },
      { status: 500 }
    );
  }
}
