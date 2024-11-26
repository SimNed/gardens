import {
  Soil,
  LifeCycle,
  SunExposure,
  WaterNeed,
  Melliferous,
  Month,
} from "@prisma/client";
import prisma from "../lib/db";

async function main() {
  console.log("Seeding database with predefined data...");

  const families = await Promise.all([
    prisma.family.create({
      data: {
        label: "Amaryllidaceae",
      },
    }),
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
        label: "Cucurbitaceae",
      },
    }),
    prisma.family.create({
      data: {
        label: "Fabaceae",
      },
    }),
    prisma.family.create({
      data: {
        label: "Lamiaceae",
      },
    }),
    prisma.family.create({
      data: {
        label: "Rosaceae",
      },
    }),
    prisma.family.create({
      data: {
        label: "Solanaceae",
      },
    }),
  ]);

  const genuses = await Promise.all([
    prisma.genus.create({
      data: {
        label: "Allium",
        familyId: families[0].id, // Amaryllidaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Daucus",
        familyId: families[1].id, // Apiaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Coriandrum",
        familyId: families[1].id, // Apiaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Spinacia",
        familyId: families[1].id, // Apiaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Petroselinum",
        familyId: families[1].id, // Apiaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Cucumis",
        familyId: families[2].id, // Cucurbitaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Brassica",
        familyId: families[3].id, // Brassicaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Phaseolus",
        familyId: families[4].id, // Fabaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Ocimum",
        familyId: families[5].id, // Lamiaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Mentha",
        familyId: families[5].id, // Lamiaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Solanum",
        familyId: families[6].id, // Solanaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Capsicum",
        familyId: families[6].id, // Solanaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Prunus",
        familyId: families[7].id, // Rosaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Fragaria",
        familyId: families[7].id, // Rosaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Pyrus",
        familyId: families[7].id, // Rosaceae
      },
    }),
    prisma.genus.create({
      data: {
        label: "Malus",
        familyId: families[7].id, // Rosaceae
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
        taxonomicName: "Allium sativum",
        commonName: "Ail",
        genusId: genuses[0].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 4,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.PERENNIAL,
        origin: "Europe et Asie",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.LOW,
        melliferous: Melliferous.MODERATE,
        description:
          "L'ail est une plante vivace utilisée en cuisine, connue pour son goût prononcé et ses vertus médicinales. Il est facile à cultiver et résistant au froid.",
        cultureMonths: [Month.MARCH, Month.APRIL, Month.MAY],
        harvestMonths: [Month.JULY, Month.AUGUST],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/ail.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Allium schoenoprasum",
        commonName: "Ciboulette",
        genusId: genuses[0].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 3,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.PERENNIAL,
        origin: "Europe, Asie",
        sunExposure: SunExposure.PARTIAL_SHADE,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.HIGH,
        description:
          "La ciboulette est une herbe vivace, très utilisée pour ses saveurs subtiles et sa facilité de culture. Elle est idéale pour les jardins d'herbes aromatiques.",
        cultureMonths: [Month.MARCH, Month.APRIL, Month.MAY],
        harvestMonths: [Month.JUNE, Month.JULY],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/ciboulette.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Daucus carota",
        commonName: "Carotte",
        genusId: genuses[1].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 5,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.BISANNUAL,
        origin: "Asie, Europe",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.LOW,
        description:
          "La carotte est une plante bisannuelle cultivée pour ses racines comestibles, sucrées et riches en vitamines. Elle pousse bien dans les sols légers et bien drainés.",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[0].id }, { id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/carotte.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Coriandrum sativum",
        commonName: "Coriandre",
        genusId: genuses[2].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 6,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Europe, Asie",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.MODERATE,
        description:
          "La coriandre est une herbe annuelle utilisée dans de nombreuses cuisines du monde, avec un goût distinctif. Elle est facile à cultiver et résiste aux climats chauds.",
        cultureMonths: [Month.MAY, Month.JUNE],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/coriandre.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Spinacia oleracea",
        commonName: "Épinard",
        genusId: genuses[3].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 4,
        soils: ["LOAMY", "CLAY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Asie, Europe",
        sunExposure: SunExposure.PARTIAL_SHADE,
        waterNeed: WaterNeed.HIGH,
        melliferous: Melliferous.LOW,
        description:
          "L'épinard est une plante annuelle riche en nutriments, souvent cultivée pour ses feuilles comestibles. Il préfère les sols fertiles et bien drainés.",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.MAY, Month.JUNE],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/epinard.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Petroselinum crispum",
        commonName: "Persil",
        genusId: genuses[4].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 6,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Europe, Asie",
        sunExposure: SunExposure.PARTIAL_SHADE,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.MODERATE,
        description:
          "Le persil est une herbe annuelle largement utilisée en cuisine pour sa saveur fraîche et son arôme. Il pousse facilement dans des sols bien drainés.",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.MAY, Month.JUNE],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/persil.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Cucumis sativus",
        commonName: "Concombre",
        genusId: genuses[5].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 6,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Asie",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.LOW,
        description:
          "Le concombre est une plante annuelle, largement cultivée pour ses fruits frais et croquants. Il pousse mieux sous un ensoleillement direct et nécessite des sols bien drainés.",
        cultureMonths: [Month.MAY, Month.JUNE],
        harvestMonths: [Month.JULY, Month.AUGUST],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/concombre.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Cucumis melo",
        commonName: "Melon",
        genusId: genuses[5].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 5,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Afrique, Asie",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.HIGH,
        melliferous: Melliferous.HIGH,
        description:
          "Le melon est une plante annuelle appréciée pour ses fruits sucrés et rafraîchissants. Il préfère les sols légers et un ensoleillement abondant.",
        cultureMonths: [Month.MAY, Month.JUNE],
        harvestMonths: [Month.JULY, Month.AUGUST],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/melon.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Brassica oleracea var. romanesco",
        commonName: "Chou romanesco",
        genusId: genuses[6].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 4,
        soils: ["LOAMY", "CLAY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Europe",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.LOW,
        description:
          "Le chou romanesco est une variété de chou au goût légèrement sucré et à la forme fractale unique. Il préfère les sols frais et bien drainés.",
        cultureMonths: [Month.APRIL, Month.MAY],
        harvestMonths: [Month.SEPTEMBER, Month.OCTOBER],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/chou_romanesco.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Phaseolus vulgaris",
        commonName: "Haricot vert",
        genusId: genuses[7].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 5,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Amérique",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.LOW,
        description:
          "Le haricot vert est une plante annuelle cultivée pour ses gousses comestibles. Il préfère un sol léger et un ensoleillement direct.",
        cultureMonths: [Month.MAY, Month.JUNE],
        harvestMonths: [Month.JULY, Month.AUGUST],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/haricot_vert.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Solanum tuberosum",
        commonName: "Pomme de terre",
        genusId: genuses[8].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 3,
        soils: ["LOAMY", "CLAY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Amérique du Sud",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.HIGH,
        melliferous: Melliferous.LOW,
        description:
          "La pomme de terre est une plante annuelle cultivée pour ses tubercules comestibles. Elle préfère un sol argileux et bien irrigué.",
        cultureMonths: [Month.APRIL, Month.MAY],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/pomme_de_terre.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Solanum lycopersicum",
        commonName: "Tomate",
        genusId: genuses[8].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 4,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Amérique du Sud",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.HIGH,
        melliferous: Melliferous.LOW,
        description:
          "La tomate est une plante annuelle cultivée pour ses fruits comestibles, riches en vitamines. Elle préfère un sol léger et nécessite beaucoup de soleil.",
        cultureMonths: [Month.MAY, Month.JUNE],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/tomate.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Capsicum annuum",
        commonName: "Poivron",
        genusId: genuses[9].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 3,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Amérique centrale",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.LOW,
        description:
          "Le poivron est une plante annuelle cultivée pour ses fruits colorés et savoureux. Il préfère un sol léger et un ensoleillement direct.",
        cultureMonths: [Month.MAY, Month.JUNE],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/poivron.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Prunus armeniaca",
        commonName: "Abricot",
        genusId: genuses[10].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 5,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.PERENNIAL,
        origin: "Asie centrale",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.HIGH,
        description:
          "L'abricot est un arbre fruitier pérenne cultivé pour ses fruits sucrés et juteux. Il préfère un sol bien drainé et nécessite un ensoleillement direct.",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.JUNE, Month.JULY],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/abricot.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Prunus domestica",
        commonName: "Prune",
        genusId: genuses[10].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 5,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.PERENNIAL,
        origin: "Europe et Asie",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.HIGH,
        description:
          "Le prunier est un arbre fruitier pérenne cultivé pour ses fruits sucrés. Il préfère un sol bien drainé et un ensoleillement direct.",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.JULY, Month.AUGUST],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/prune.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Fragaria × ananassa",
        commonName: "Fraise",
        genusId: genuses[11].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 4,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.PERENNIAL,
        origin: "Amérique du Nord",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.HIGH,
        description:
          "La fraise est une plante vivace produisant des fruits rouges, sucrés et juteux. Elle préfère un sol bien drainé et un ensoleillement direct.",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.MAY, Month.JUNE],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/fraise.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Pyrus communis",
        commonName: "Poire",
        genusId: genuses[12].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 4,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.PERENNIAL,
        origin: "Europe et Asie",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.HIGH,
        description:
          "Le poirier est un arbre fruitier pérenne cultivé pour ses fruits sucrés et juteux. Il préfère un sol bien drainé et nécessite un ensoleillement direct.",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/poire.jpg",
        published: true,
      },
    }),

    prisma.plant.create({
      data: {
        taxonomicName: "Malus domestica",
        commonName: "Pomme",
        genusId: genuses[13].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 4,
        soils: ["LOAMY", "SANDY"],
        lifeCycle: LifeCycle.PERENNIAL,
        origin: "Europe et Asie",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.HIGH,
        description:
          "Le pommier est un arbre fruitier pérenne cultivé pour ses fruits sucrés et croquants. Il préfère un sol léger et bien drainé et un ensoleillement direct.",
        cultureMonths: [Month.MARCH, Month.APRIL],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[1].id }] },
        imageUrl: "/pomme.jpg",
        published: true,
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Ocimum basilicum",
        commonName: "Basilic",
        genusId: genuses[14].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 2,
        soils: [Soil.LOAMY, Soil.SANDY],
        lifeCycle: LifeCycle.ANNUAL,
        origin: "Méditerranée",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.MODERATE,
        melliferous: Melliferous.MODERATE,
        description:
          "Le basilic est une herbe aromatique couramment utilisée dans la cuisine méditerranéenne. Il est connu pour son goût piquant et frais, avec des feuilles de couleur verte brillante. Il préfère un sol bien drainé et un emplacement en plein soleil. En plus de ses bienfaits culinaires, il est également apprécié pour ses propriétés médicinales et son rôle attractif pour les abeilles.",
        cultureMonths: [Month.MAY, Month.JUNE, Month.JULY, Month.AUGUST],
        harvestMonths: [Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[0].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/basilic.jpg",
        published: true,
      },
    }),
    prisma.plant.create({
      data: {
        taxonomicName: "Mentha spicata",
        commonName: "Menthe",
        genusId: genuses[15].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 3,
        soils: [Soil.LOAMY, Soil.SANDY],
        lifeCycle: LifeCycle.PERENNIAL,
        origin: "Europe, Asie",
        sunExposure: SunExposure.FULL_SUN,
        waterNeed: WaterNeed.HIGH,
        melliferous: Melliferous.HIGH,
        description:
          "La menthe est une plante vivace aromatique très populaire en cuisine et pour ses vertus médicinales. Elle possède des feuilles vertes aux arômes rafraîchissants et légèrement piquants. Elle prospère dans un sol humide et bien drainé et tolère une exposition partielle au soleil. La menthe est également prisée pour ses qualités apaisantes et digestives, ainsi que pour attirer les pollinisateurs tels que les abeilles.",
        cultureMonths: [Month.MARCH, Month.APRIL, Month.MAY, Month.JUNE],
        harvestMonths: [Month.JULY, Month.AUGUST, Month.SEPTEMBER],
        pests: { connect: [{ id: pests[1].id }] },
        diseases: { connect: [{ id: diseases[0].id }] },
        imageUrl: "/menthe.jpg",
        published: true,
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
