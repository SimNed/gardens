import { getIdentificationQuizzSet } from "@/app/services/quizz";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const quizzSet = await getIdentificationQuizzSet();
    return NextResponse.json(quizzSet);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch identification quizz set" },
      { status: 500 }
    );
  }
}
