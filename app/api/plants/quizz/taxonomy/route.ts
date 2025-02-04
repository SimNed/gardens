import { getTaxonomyQuizzSet } from "@/app/services/quizz";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const quizzSet = await getTaxonomyQuizzSet();
    return NextResponse.json(quizzSet);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch taxonomy quizz set" },
      { status: 500 }
    );
  }
}
