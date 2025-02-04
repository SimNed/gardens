import { getListedCategories } from "@/app/services/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getListedCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch plant categories list" },
      { status: 500 }
    );
  }
}
