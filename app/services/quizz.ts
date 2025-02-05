import prisma from "../lib/prisma/db";

export const getIdentificationQuizzSet = async () => {
  return await prisma.$queryRaw`
    SELECT p."commonName", p."imageUrl" 
    FROM "Plant" p 
    ORDER BY RANDOM() 
    LIMIT 15;
  `;
};

export const getTaxonomyQuizzSet = async () => {
  return await prisma.$queryRaw`
    SELECT p."commonName", p."species", p."imageUrl", g.label AS "genusLabel", f.label AS "familyLabel"
    FROM "Plant" p 
    JOIN "Genus" g ON p."genusId" = g.id
    JOIN "Family" f ON g."familyId" = f.id
    ORDER BY RANDOM() 
    LIMIT 3;
  `;
};
