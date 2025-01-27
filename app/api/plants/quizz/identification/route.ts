import prisma from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      await prisma.$queryRaw`
        SELECT p."commonName", p."imageUrl" 
        FROM "Plant" p 
        ORDER BY RANDOM() 
        LIMIT 15;
      `
    );
  } catch (error) {
    console.error("Failed to fetch listed plants:", error);
    return NextResponse.json(
      { error: "Failed to fetch listed plants" },
      { status: 500 }
    );
  }
}
