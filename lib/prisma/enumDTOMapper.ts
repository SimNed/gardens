import {
  LifeCycle,
  Melliferous,
  Month,
  SunExposure,
  WaterNeed,
} from "@prisma/client";

export function getLifeCycleClientDTO(lifeCycle: LifeCycle) {
  switch (lifeCycle) {
    case LifeCycle.ANNUAL:
      return { index: 1, label: "Annuelle" };
    case LifeCycle.BISANNUAL:
      return { index: 2, label: "Bisannuelle" };
    case LifeCycle.PERENNIAL:
      return { index: 3, label: "Vivace" };
    default:
      return { index: 0, label: "" };
  }
}

export function getSunExposureClientDTO(sunExposure: SunExposure) {
  switch (sunExposure) {
    case SunExposure.SHADE:
      return { index: 1, label: "Ombre" };
    case SunExposure.PARTIAL_SHADE:
      return { index: 2, label: "Mi-ombre" };
    case SunExposure.FULL_SUN:
      return { index: 1, label: "Plein soleil" };
    default:
      return { index: 0, label: "" };
  }
}

export function getWaterNeedClientDTO(waterNeed: WaterNeed) {
  switch (waterNeed) {
    case WaterNeed.LOW:
      return { index: 1, label: "Léger" };
    case WaterNeed.MODERATE:
      return { index: 2, label: "Modéré" };
    case WaterNeed.HIGH:
      return { index: 3, label: "Abondant" };
    default:
      return { index: 0, label: "" };
  }
}

export function getMelliferousClientDTO(melliferous: Melliferous) {
  switch (melliferous) {
    case Melliferous.LOW:
      return { index: 1, label: "Peu mellifère" };
    case Melliferous.MODERATE:
      return { index: 2, label: "Modérement mellifère" };
    case Melliferous.HIGH:
      return { index: 3, label: "Très mellifère" };
    default:
      return { index: 0, label: "" };
  }
}

export function getMonthClientDTO(month: Month) {
  switch (month) {
    case Month.JANUARY:
      return { index: 1, label: "Janvier" };
    case Month.FEBRUARY:
      return { index: 2, label: "Février" };
    case Month.MARCH:
      return { index: 3, label: "Mars" };
    case Month.APRIL:
      return { index: 4, label: "Avril" };
    case Month.MAY:
      return { index: 5, label: "Mai" };
    case Month.JUNE:
      return { index: 6, label: "Juin" };
    case Month.JULY:
      return { index: 7, label: "Juillet" };
    case Month.AUGUST:
      return { index: 8, label: "Août" };
    case Month.SEPTEMBER:
      return { index: 9, label: "Septembre" };
    case Month.OCTOBER:
      return { index: 10, label: "Octobre" };
    case Month.NOVEMBER:
      return { index: 11, label: "Novembre" };
    case Month.DECEMBER:
      return { index: 12, label: "Décembre" };
    default:
      return { index: 0, label: "" };
  }
}
