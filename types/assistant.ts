import { Soil, SunExposure } from "@prisma/client";
import { PlantType } from "./plant";
import { RectangleType } from "./grid";

export type GardenBedType = {
  rectangle: RectangleType;
  soil: Soil | null;
  sunExposure: SunExposure | null;
  crop: PlantType | null;
};
