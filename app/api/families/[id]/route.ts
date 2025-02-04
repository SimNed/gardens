import { getFamily } from "@/app/services/family";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const family = await getFamily(params.id);

    if (!family)
      return NextResponse.json({ error: "Family not found" }, { status: 404 });

    return NextResponse.json(family);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch family" },
      { status: 500 }
    );
  }
}
