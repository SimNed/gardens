-- CreateEnum
CREATE TYPE "Soil" AS ENUM ('SANDY', 'LOAMY', 'CLAY', 'HUMUS');

-- CreateEnum
CREATE TYPE "LifeCycle" AS ENUM ('ANNUAL', 'BISANNUAL', 'PERENNIAL');

-- CreateEnum
CREATE TYPE "SunExposure" AS ENUM ('SHADE', 'PARTIAL_SHADE', 'FULL_SUN');

-- CreateEnum
CREATE TYPE "WaterNeed" AS ENUM ('LOW', 'MODERATE', 'HIGH');

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "taxonomicName" VARCHAR(255) NOT NULL,
    "commonName" VARCHAR(255) NOT NULL,
    "genusId" VARCHAR(255) NOT NULL,
    "plantCategoryId" VARCHAR(255),
    "coldHardiness" INTEGER NOT NULL,
    "soils" "Soil"[],
    "lifeCycle" "LifeCycle" NOT NULL,
    "sunExposures" "SunExposure"[],
    "waterNeed" "WaterNeed" NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genus" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "familyId" TEXT NOT NULL,

    CONSTRAINT "Genus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantCategory" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "PlantCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pest" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PestToPlant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DiseaseToPlant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PestToPlant_AB_unique" ON "_PestToPlant"("A", "B");

-- CreateIndex
CREATE INDEX "_PestToPlant_B_index" ON "_PestToPlant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiseaseToPlant_AB_unique" ON "_DiseaseToPlant"("A", "B");

-- CreateIndex
CREATE INDEX "_DiseaseToPlant_B_index" ON "_DiseaseToPlant"("B");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_genusId_fkey" FOREIGN KEY ("genusId") REFERENCES "Genus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_plantCategoryId_fkey" FOREIGN KEY ("plantCategoryId") REFERENCES "PlantCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genus" ADD CONSTRAINT "Genus_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PestToPlant" ADD CONSTRAINT "_PestToPlant_A_fkey" FOREIGN KEY ("A") REFERENCES "Pest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PestToPlant" ADD CONSTRAINT "_PestToPlant_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseToPlant" ADD CONSTRAINT "_DiseaseToPlant_A_fkey" FOREIGN KEY ("A") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseToPlant" ADD CONSTRAINT "_DiseaseToPlant_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
