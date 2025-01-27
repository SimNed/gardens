import { WaterNeed } from "@prisma/client";

export function getWaterNeeds() {
  return [
    { key: "Léger", value: WaterNeed.LOW },
    { key: "Modéré", value: WaterNeed.MODERATE },
    { key: "Haut", value: WaterNeed.HIGH },
  ];
}
