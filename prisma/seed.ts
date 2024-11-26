import {
  Soil,
  LifeCycle,
  SunExposure,
  WaterNeed,
  Melliferous,
  Month,
} from "@prisma/client";
import prisma from "../lib/db";

const fakeDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

async function main() {
  console.log("Seeding database with predefined data...");

  const families = await Promise.all([
    prisma.family.create({
      data: {
        label: "Apiaceae",
      },
    }),
    prisma.family.create({
      data: {
        label: "Brassicaceae",
      },
    }),
    prisma.family.create({
      data: {
        label: "Solanaceae",
      },
    }),
    prisma.family.create({
      data: {
        label: "Rosaceae",
      },
    }),
  ]);

  const genuses = await Promise.all([
    prisma.genus.create({
      data: {
        label: "Daucus",
        familyId: families[0].id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Coriandrum",
        familyId: families[0].id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Raphanus",
        familyId: families[1].id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Brassica",
        familyId: families[1].id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Solanum",
        familyId: families[2].id,
      },
    }),
    prisma.genus.create({
      data: {
        label: "Fragaria",
        familyId: families[3].id,
      },
    }),
  ]);

  const plantCategories = await Promise.all([
    prisma.plantCategory.create({ data: { label: "Légumes" } }),
    prisma.plantCategory.create({ data: { label: "Fruits" } }),
    prisma.plantCategory.create({ data: { label: "Herbes" } }),
  ]);

  const pests = await Promise.all([
    prisma.pest.create({
      data: {
        label: "Puceron",
        published: true,
      },
    }),
    prisma.pest.create({
      data: {
        label: "Acarien",
        published: true,
      },
    }),
  ]);

  const diseases = await Promise.all([
    prisma.disease.create({
      data: {
        label: "Oïdium",
        published: true,
      },
    }),
    prisma.disease.create({
      data: {
        label: "Rouille",
        published: true,
      },
    }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const plants = await Promise.all([
    prisma.plant.create({
      data: {
        taxonomicName: "Daucus carota",
        commonName: "Carotte",
        genusId: genuses[0].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 5,
        soils: { set: [Soil.LOAMY, Soil.SANDY] },
        lifeCycle: LifeCycle.BISANNUAL,
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.MODERATE,
        description: fakeDescription,
        origin: "Europe",
        cultureMonths: [Month.MARCH, Month.APRIL, Month.MAY],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        published: true,
        pests: { connect: [{ id: pests[0].id }, { id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/carotte.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Coriandrum sativum",
        commonName: "Coriandre",
        genusId: genuses[1].id,
        plantCategoryId: plantCategories[2].id,
        coldHardiness: 6,
        soils: { set: [Soil.LOAMY] },
        lifeCycle: LifeCycle.ANNUAL,
        sunExposure: SunExposure.PARTIAL_SHADE,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.LOW,
        description: fakeDescription,
        origin: "Europe",
        cultureMonths: [Month.MARCH, Month.APRIL, Month.MAY],
        harvestMonths: [Month.JUNE, Month.JULY],
        published: true,
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/coriandre.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Raphanus sativus",
        commonName: "Radis",
        genusId: genuses[2].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 5,
        soils: { set: [Soil.SANDY, Soil.LOAMY] },
        lifeCycle: LifeCycle.ANNUAL,
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.MODERATE,
        description: fakeDescription,
        origin: "Asie",
        cultureMonths: [Month.APRIL, Month.MAY],
        harvestMonths: [Month.JUNE, Month.JULY],
        published: true,
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/radis.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Brassica oleracea",
        commonName: "Chou Romanesco",
        genusId: genuses[3].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 6,
        soils: { set: [Soil.LOAMY, Soil.CLAY] },
        lifeCycle: LifeCycle.ANNUAL,
        sunExposure: SunExposure.PARTIAL_SHADE,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.HIGH,
        description: fakeDescription,
        origin: "Europe",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.JUNE, Month.JULY],
        published: true,
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/romanesco.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Solanum lycopersicum",
        commonName: "Tomate",
        genusId: genuses[4].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 7,
        soils: { set: [Soil.LOAMY] },
        lifeCycle: LifeCycle.ANNUAL,
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.HIGH,
        melliferous: Melliferous.MODERATE,
        description: fakeDescription,
        origin: "Amérique",
        cultureMonths: [Month.MAY, Month.JUNE],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        published: true,
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/tomate.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Capsicum annuum",
        commonName: "Poivron",
        genusId: genuses[4].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 8,
        soils: { set: [Soil.LOAMY, Soil.SANDY] },
        lifeCycle: LifeCycle.ANNUAL,
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.LOW,
        description: fakeDescription,
        origin: "Amérique",
        cultureMonths: [Month.MAY, Month.JUNE],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        published: true,
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/poivron.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Fragaria × ananassa",
        commonName: "Fraisier",
        genusId: genuses[5].id,
        plantCategoryId: plantCategories[1].id,
        coldHardiness: 4,
        soils: { set: [Soil.HUMUS, Soil.LOAMY] },
        lifeCycle: LifeCycle.PERENNIAL,
        sunExposure: SunExposure.PARTIAL_SHADE,
        waterNeed: WaterNeed.HIGH,
        melliferous: Melliferous.HIGH,
        description: fakeDescription,
        origin: "Europe",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.JUNE, Month.JULY],
        published: true,
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/fraisier.jpg",
      },
    }),
  ]);

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Error during seeding: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
