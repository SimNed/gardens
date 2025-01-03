import {
  Soil,
  LifeCycle,
  SunExposure,
  WaterNeed,
  Melliferous,
  Month,
} from "@prisma/client";
import prisma from "../lib/prisma/db";

async function main() {
  console.log("Seeding database with predefined data...");

  const families = await Promise.all([
    prisma.family.create({
      data: {
        label: "Amaryllidaceae",
        description:
          "Les Amaryllidaceae sont une famille de plantes herbacées, souvent caractérisées par des feuilles en forme de ruban ou lancéolées, et des fleurs généralement en ombelles, souvent avec un périanthe en forme de tube. Elles possèdent des bulbilles ou des bulbes souterrains comme mode de reproduction végétative.",
      },
    }),
    prisma.family.create({
      data: {
        label: "Apiaceae",
        description:
          "Les Apiaceae, aussi appelées ombellifères, se distinguent par leurs inflorescences en ombelles et des feuilles souvent découpées ou pennatiséquées. Les plantes de cette famille présentent souvent des tiges creuses et des fruits appelés schizocarpes.",
      },
    }),
    prisma.family.create({
      data: {
        label: "Brassicaceae",
        description:
          "Les Brassicaceae, ou crucifères, sont caractérisées par des fleurs à quatre pétales disposés en croix et des fruits généralement en siliques. Les feuilles sont souvent alternes et peuvent être simples ou lobées. Elles ont une forte tendance à produire des glucosinolates.",
      },
    }),
    prisma.family.create({
      data: {
        label: "Chenopodiaceae",
        description:
          "Les Chenopodiaceae sont des plantes souvent herbacées, avec des feuilles simples, alternes, parfois charnues. Leur fruit est souvent un akène, et certaines espèces possèdent des adaptations pour croître dans des sols salins (halophytes).",
      },
    }),
    prisma.family.create({
      data: {
        label: "Cucurbitaceae",
        description:
          "Les Cucurbitaceae sont des plantes généralement rampantes ou grimpantes, souvent avec des tiges creuses. Elles possèdent des feuilles larges et palmatilobées, et des fleurs unisexuées, généralement actinomorphes. Le fruit est souvent un fruit charnu, comme une baie ou une capsule.",
      },
    }),
    prisma.family.create({
      data: {
        label: "Fabaceae",
        description:
          "Les Fabaceae, ou légumineuses, sont caractérisées par des feuilles alternes, souvent composées et stipulées. Les fleurs présentent généralement une symétrie bilatérale et un dispositif particulier de pollinisation. Leur fruit est une gousse, et elles ont la capacité de fixer l'azote grâce à une symbiose avec des bactéries rhizobium.",
      },
    }),
    prisma.family.create({
      data: {
        label: "Lamiaceae",
        description:
          "Les Lamiaceae sont des plantes souvent aromatiques avec des tiges carrées et des feuilles opposées, souvent dentées ou crénelées. Les fleurs sont bilatérales, en verticilles ou en épis, et souvent accompagnées de glandes sécrétrices d'huiles essentielles.",
      },
    }),
    prisma.family.create({
      data: {
        label: "Rosaceae",
        description:
          "Les Rosaceae se caractérisent par des feuilles généralement alternes, souvent simples ou composées, avec des stipules. Les fleurs possèdent cinq pétales et sont souvent assemblées en inflorescences. Le fruit peut être un drupe, un akène ou une pomme, selon le genre.",
      },
    }),
    prisma.family.create({
      data: {
        label: "Solanaceae",
        description:
          "Les Solanaceae sont des plantes généralement herbacées, avec des feuilles alternes et souvent rugueuses. Les fleurs sont actinomorphes, généralement avec cinq pétales soudés, et produisent des fruits variés, tels que des baies ou des capsules. Certaines espèces contiennent des alcaloïdes.",
      },
    }),
  ]);

  const genuses = await Promise.all([
    prisma.genus.create({
      data: {
        label: "Allium",
        familyId: families[0].id, // Amaryllidaceae
        description:
          "Le genre Allium inclut des plantes bulbeuses comme l'ail, l'oignon et le poireau. Elles sont caractérisées par des feuilles basales souvent longues et fines, et des fleurs en ombelles, généralement à six tépales. Les bulbes sont un mode de reproduction végétative commun.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Daucus",
        familyId: families[1].id, // Apiaceae
        description:
          "Le genre Daucus, dont l'espèce la plus connue est la carotte, présente des feuilles finement divisées et une inflorescence en ombelle. Les fleurs sont généralement petites et blanches, et les fruits sont des schizocarpes contenant plusieurs graines.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Coriandrum",
        familyId: families[1].id, // Apiaceae
        description:
          "Coriandrum, dont l'espèce type est le coriandre, se distingue par des feuilles aromatiques finement découpées et des fleurs en petites ombelles. Les fruits sont des schizocarpes et contiennent des huiles essentielles caractéristiques.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Spinacia",
        familyId: families[3].id, // Chenopodiaceae
        description:
          "Spinacia, comprenant l'espèce populaire de l'épinard, se caractérise par des feuilles larges, souvent comestibles, et une inflorescence en épi. Le fruit est une petite noix, généralement entourée d'une membrane externe.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Petroselinum",
        familyId: families[1].id, // Apiaceae
        description:
          "Petroselinum, dont le persil fait partie, se caractérise par des feuilles composées et finement divisées, et des fleurs petites en ombelles. Les fruits sont des schizocarpes contenant plusieurs graines.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Cucumis",
        familyId: families[4].id, // Cucurbitaceae
        description:
          "Le genre Cucumis inclut des plantes comme le concombre et le melon. Les plantes de ce genre possèdent des tiges rampantes ou grimpantes, des feuilles larges et souvent lobées, et des fruits charnus, souvent sous forme de baies.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Brassica",
        familyId: families[2].id, // Brassicaceae
        description:
          "Le genre Brassica comprend des plantes comme le chou, le brocoli et la moutarde. Elles se caractérisent par des feuilles alternes souvent lobées et des fleurs disposées en croix. Les fruits sont des siliques contenant des graines.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Phaseolus",
        familyId: families[5].id, // Fabaceae
        description:
          "Phaseolus comprend des légumineuses comme le haricot et le pois chiche. Les plantes de ce genre ont des feuilles alternes composées, des fleurs bilatérales souvent de couleur vive, et produisent des gousses contenant plusieurs graines.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Ocimum",
        familyId: families[6].id, // Lamiaceae
        description:
          "Ocimum, qui inclut le basilic, se caractérise par des feuilles opposées, souvent aromatiques, et des tiges carrées typiques des Lamiaceae. Les fleurs sont bilatérales et souvent regroupées en épis ou en verticilles.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Mentha",
        familyId: families[6].id, // Lamiaceae
        description:
          "Le genre Mentha comprend des plantes comme la menthe. Elles possèdent des feuilles opposées, souvent dentées et aromatiques. Les fleurs sont généralement regroupées en épis et sont de couleur violette ou blanche.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Solanum",
        familyId: families[8].id, // Solanaceae
        description:
          "Solanum, qui inclut la pomme de terre et la tomate, se caractérise par des feuilles alternes, souvent rugueuses, et des fleurs généralement actinomorphes avec cinq pétales soudés. Le fruit est souvent une baie, comme dans le cas de la tomate.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Capsicum",
        familyId: families[8].id, // Solanaceae
        description:
          "Le genre Capsicum regroupe les piments et poivrons. Les plantes ont des feuilles simples et alternes, des fleurs bilatérales, et produisent des fruits charnus de différentes couleurs et tailles. Ces fruits sont souvent consommés frais ou séchés.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Prunus",
        familyId: families[7].id, // Rosaceae
        description:
          "Prunus, comprenant des arbres comme les cerisiers et pruniers, se caractérise par des feuilles alternes, souvent ovales et dentées, et des fleurs généralement en grappes. Le fruit est une drupe, comme la cerise ou la prune.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Fragaria",
        familyId: families[7].id, // Rosaceae
        description:
          "Fragaria comprend des plantes comme la fraise. Elles possèdent des feuilles trifoliées, et les fleurs sont généralement blanches avec cinq pétales. Le fruit est un réceptacle charnu, contenant de nombreuses petites graines à sa surface.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Pyrus",
        familyId: families[7].id, // Rosaceae
        description:
          "Pyrus regroupe des arbres fruitiers comme les poiriers. Ces plantes ont des feuilles simples et alternes, souvent dentées, et des fleurs blanches ou roses en ombelles. Le fruit est une pomme de type poire, caractéristique de ce genre.",
      },
    }),
    prisma.genus.create({
      data: {
        label: "Malus",
        familyId: families[7].id, // Rosaceae
        description:
          "Le genre Malus comprend des arbres comme le pommier. Les plantes de ce genre possèdent des feuilles alternes, simples et dentées, et des fleurs blanches ou roses. Le fruit est une pomme, généralement de forme ronde.",
      },
    }),
  ]);

  const plantCategories = await Promise.all([
    prisma.plantCategory.create({ data: { label: "Plantes potagères" } }),
    prisma.plantCategory.create({ data: { label: "Arbres frutiers" } }),
    prisma.plantCategory.create({ data: { label: "Herbes aromatiques" } }),
    prisma.plantCategory.create({ data: { label: "Adventices" } }),
  ]);

  const pests = await Promise.all([
    prisma.pest.create({
      data: {
        label: "Puceron",
        published: true,
        description:
          "Les pucerons sont des insectes suceurs de sève qui se trouvent principalement sur les jeunes pousses et les feuilles tendres des plantes. Ils possèdent un corps mou et sont souvent de couleur verte, noire ou rouge. Leur présence peut entraîner un jaunissement des feuilles et une déformation des pousses. Ils sont également responsables de la transmission de diverses maladies virales.",
      },
    }),
    prisma.pest.create({
      data: {
        label: "Acarien",
        published: true,
        description:
          "Les acariens sont des arthropodes minuscules, souvent invisibles à l'œil nu, qui se nourrissent des cellules végétales en piquant les feuilles et tiges des plantes. Leur présence se traduit par des taches jaunes ou argentées sur les feuilles, des toiles fines, et parfois une déformation des tissus. Ils peuvent causer un stress important aux plantes, en réduisant leur photosynthèse et en les rendant plus vulnérables aux maladies.",
      },
    }),
  ]);

  const diseases = await Promise.all([
    prisma.disease.create({
      data: {
        label: "Oïdium",
        published: true,
        description:
          "L'oïdium est une maladie fongique qui affecte de nombreuses plantes, en particulier les légumes et les plantes ornementales. Elle se manifeste par la formation d'un feutrage blanc, poudreux sur les feuilles, tiges et parfois les fleurs. Cette maladie peut entraîner un ralentissement de la croissance de la plante, une déformation des feuilles et une réduction de la photosynthèse.",
      },
    }),
    prisma.disease.create({
      data: {
        label: "Rouille",
        published: true,
        description:
          "La rouille est une maladie fongique causée par des champignons du genre Puccinia. Elle se reconnaît par des taches orange, jaunes ou brunes sur les feuilles, qui finissent par se déchirer et se dessécher. Les spores fongiques se propagent par le vent et peuvent infecter de nouvelles plantes, réduisant leur capacité à produire des nutriments et affaiblissant leur résistance aux autres maladies.",
      },
    }),
  ]);

  await Promise.all([
    prisma.plant.create({
      data: {
        taxonomicName: "Allium sativum",
        commonName: "Ail",
        genusId: genuses[0].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: -15,
        soils: [Soil.LOAMY, Soil.SANDY],
        lifeCycle: LifeCycle.PERENNIAL,
        cultureLifeCycle: LifeCycle.ANNUAL,
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
        coldHardiness: -15,
        soils: [Soil.LOAMY, Soil.HUMUS],
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
        coldHardiness: -10,
        soils: [Soil.LOAMY, Soil.SANDY],
        lifeCycle: LifeCycle.ANNUAL,
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
        plantCategoryId: plantCategories[2].id,
        coldHardiness: 0,
        soils: [Soil.LOAMY, Soil.HUMUS],
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
        coldHardiness: -10,
        soils: [Soil.LOAMY, Soil.HUMUS],
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
        plantCategoryId: plantCategories[2].id,
        coldHardiness: -8,
        soils: [Soil.HUMUS, Soil.LOAMY],
        lifeCycle: LifeCycle.PERENNIAL,
        cultureLifeCycle: LifeCycle.BISANNUAL,
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
        coldHardiness: 0,
        soils: [Soil.LOAMY, Soil.SANDY],
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
        soils: [Soil.LOAMY, Soil.SANDY],
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
        coldHardiness: -8,
        soils: [Soil.LOAMY, Soil.HUMUS],
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
        coldHardiness: 0,
        soils: [Soil.LOAMY, Soil.SANDY],
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
        genusId: genuses[10].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: -5,
        soils: [Soil.LOAMY, Soil.SANDY],
        lifeCycle: LifeCycle.PERENNIAL,
        cultureLifeCycle: LifeCycle.ANNUAL,
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
        genusId: genuses[10].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 0,
        soils: [Soil.LOAMY, Soil.HUMUS],
        lifeCycle: LifeCycle.PERENNIAL,
        cultureLifeCycle: LifeCycle.ANNUAL,
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
        genusId: genuses[11].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 0,
        soils: [Soil.LOAMY, Soil.HUMUS],
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
        genusId: genuses[12].id,
        plantCategoryId: plantCategories[1].id,
        coldHardiness: -15,
        soils: [Soil.LOAMY, Soil.SANDY],
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
        genusId: genuses[12].id,
        plantCategoryId: plantCategories[1].id,
        coldHardiness: -20,
        soils: [Soil.LOAMY, Soil.SANDY],
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
        genusId: genuses[13].id,
        plantCategoryId: plantCategories[0].id,
        coldHardiness: 0,
        soils: [Soil.LOAMY, Soil.HUMUS],
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
        genusId: genuses[14].id,
        plantCategoryId: plantCategories[1].id,
        coldHardiness: -20,
        soils: [Soil.LOAMY, Soil.SANDY],
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
        genusId: genuses[15].id,
        plantCategoryId: plantCategories[1].id,
        coldHardiness: -25,
        soils: [Soil.LOAMY, Soil.SANDY],
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
        genusId: genuses[8].id,
        plantCategoryId: plantCategories[2].id,
        coldHardiness: 0,
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
        genusId: genuses[9].id,
        plantCategoryId: plantCategories[2].id,
        coldHardiness: -10,
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
