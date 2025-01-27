import { SunExposure } from "@prisma/client";

export function getSunExposures() {
  return [
    { key: "Ombre", value: SunExposure.SHADE },
    { key: "Mi-ombre", value: SunExposure.PARTIAL_SHADE },
    { key: "Plein soleil", value: SunExposure.FULL_SUN },
  ];
}
