import { WaterNeed } from "@prisma/client";

export const getListedWaterNeeds = () => {
  return [
    { key: "Léger", value: WaterNeed.LOW },
    { key: "Modéré", value: WaterNeed.MODERATE },
    { key: "Haut", value: WaterNeed.HIGH },
  ];
};
