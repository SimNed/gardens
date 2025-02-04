import { getGenus } from "@/app/services/genus";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const genus = await getGenus(params.id);

    if (!genus)
      return NextResponse.json({ error: "Genus not found" }, { status: 404 });

    return NextResponse.json(genus);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch genus" },
      { status: 500 }
    );
  }
}
