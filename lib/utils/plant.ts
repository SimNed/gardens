import {
  LifeCycle,
  Melliferous,
  Soil,
  SunExposure,
  WaterNeed,
} from "@prisma/client";

const lifeCycleLabels: Record<LifeCycle, string> = {
  ANNUAL: "Annuelle",
  BISANNUAL: "Bisannuelle",
  PERENNIAL: "Vivace",
};

export function getLifeCycleLabel(lifeCycle: LifeCycle) {
  return lifeCycleLabels[lifeCycle];
}

const sunExposureLabels: Record<SunExposure, string> = {
  SHADE: "Ombre",
  PARTIAL_SHADE: "Mi-ombre",
  FULL_SUN: "Plein soleil",
};

export function getSunExposureLabel(sunExposure: SunExposure) {
  return sunExposureLabels[sunExposure];
}

export function getSunExposureRank(sunExposure: SunExposure) {
  return Object.keys(SunExposure).indexOf(sunExposure) + 1;
}

const waterNeedLabels: Record<Melliferous, string> = {
  LOW: "Léger",
  MODERATE: "Modéré",
  HIGH: "Abondant",
};

export function getWaterNeedLabel(waterNeed: WaterNeed) {
  return waterNeedLabels[waterNeed];
}

export function getWaterNeedRank(waterNeed: WaterNeed) {
  return Object.keys(WaterNeed).indexOf(waterNeed) + 1;
}

const melliferousLabels: Record<Melliferous, string> = {
  LOW: "Peu mellifère",
  MODERATE: "Modérement mellifère",
  HIGH: "Très mellifère",
};

export function getMelliferousLabel(melliferous: Melliferous) {
  return melliferousLabels[melliferous];
}

export function getMelliferousRank(melliferous: Melliferous) {
  return Object.keys(Melliferous).indexOf(melliferous) + 1;
}

const soilLabels: Record<Soil, string> = {
  CLAY: "Argileux",
  HUMUS: "Humifère",
  LOAMY: "Limoneux",
  SANDY: "Sableux",
};

export function getSoilLabel(soil: Soil) {
  return soilLabels[soil];
}
