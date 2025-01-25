import { Soil, SunExposure } from "@prisma/client";
import { PlantType } from "./plant";

export type GardenBedType = {
  rectangleId: number;
  soil: Soil | null;
  sunExposure: SunExposure | null;
  crop: PlantType | null;
};
