import { SunExposure } from "@prisma/client";

export const getListedSunExposures = () => {
  return [
    { key: "Ombre", value: SunExposure.SHADE },
    { key: "Mi-ombre", value: SunExposure.PARTIAL_SHADE },
    { key: "Plein soleil", value: SunExposure.FULL_SUN },
  ];
};
