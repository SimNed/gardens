import { getListedGenuses } from "@/app/services/genus";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genuses = await getListedGenuses();

    return NextResponse.json(genuses);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch genuses list" },
      { status: 500 }
    );
  }
}
