import prisma from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      await prisma.$queryRaw`
        SELECT p."commonName", p."species", p."imageUrl", g.label AS "genusLabel", f.label AS "familyLabel"
        FROM "Plant" p 
        JOIN "Genus" g ON p."genusId" = g.id
        JOIN "Family" f ON g."familyId" = f.id
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
