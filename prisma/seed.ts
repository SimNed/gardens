import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

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
        soils: { set: ["LOAMY", "SANDY"] },
        lifeCycle: "BISANNUAL",
        sunExposures: { set: ["FULL_SUN"] },
        waterNeed: "MODERATE",
        description: fakeDescription,
        published: true,
        pests: { connect: [{ id: pests[0].id }, { id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "public/carotte.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Coriandrum sativum",
        commonName: "Coriandre",
        genusId: genuses[1].id,
        plantCategoryId: plantCategories[2].id,
        coldHardiness: 6,
        soils: { set: ["LOAMY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["PARTIAL_SHADE", "FULL_SUN"] },
        waterNeed: "MODERATE",
        description: fakeDescription,
        published: true,
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "public/coriandre.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Raphanus sativus",
        commonName: "Radis",
        genusId: genuses[2].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 5,
        soils: { set: ["SANDY", "LOAMY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["FULL_SUN"] },
        waterNeed: "MODERATE",
        description: fakeDescription,
        published: true,
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "public/radis.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Brassica oleracea",
        commonName: "Chou Romanesco",
        genusId: genuses[3].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 6,
        soils: { set: ["LOAMY", "CLAY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["PARTIAL_SHADE", "FULL_SUN"] },
        waterNeed: "MODERATE",
        description: fakeDescription,
        published: true,
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "public/romanesco.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Solanum lycopersicum",
        commonName: "Tomate",
        genusId: genuses[4].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 7,
        soils: { set: ["LOAMY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["FULL_SUN"] },
        waterNeed: "HIGH",
        description: fakeDescription,
        published: true,
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "public/tomate.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Capsicum annuum",
        commonName: "Poivron",
        genusId: genuses[4].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 8,
        soils: { set: ["LOAMY", "SANDY"] },
        lifeCycle: "ANNUAL",
        sunExposures: { set: ["FULL_SUN"] },
        waterNeed: "MODERATE",
        description: fakeDescription,
        published: true,
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "public/poivron.jpg",
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Fragaria × ananassa",
        commonName: "Fraisier",
        genusId: genuses[5].id,
        plantCategoryId: plantCategories[1].id,
        coldHardiness: 4,
        soils: { set: ["HUMUS", "LOAMY"] },
        lifeCycle: "PERENNIAL",
        sunExposures: { set: ["PARTIAL_SHADE", "FULL_SUN"] },
        waterNeed: "HIGH",
        description: fakeDescription,
        published: true,
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "public/fraisier.jpg",
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
