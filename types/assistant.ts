import { Soil, SunExposure } from "@prisma/client";
import { PlantType } from "./plant";
import { RectangleType } from "./canvas";

export type AssistantElementType = {
  id: number;
  rectangle: RectangleType;
  crop?: PlantType;
  soil?: Soil;
  sunExposure?: SunExposure;
};
