import { Soil } from "@prisma/client";

export function getSoils() {
  return [
    { key: "Argileux", value: Soil.CLAY },
    { key: "Limoneux", value: Soil.LOAMY },
    { key: "Sableux", value: Soil.SANDY },
    { key: "Humifère", value: Soil.HUMUS },
  ];
}
