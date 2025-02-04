import { Month } from "@prisma/client";

const monthLabels: Record<Month, string> = {
  JANUARY: "Janvier",
  FEBRUARY: "Février",
  MARCH: "Mars",
  APRIL: "Avril",
  MAY: "Mai",
  JUNE: "Juin",
  JULY: "Juillet",
  AUGUST: "Août",
  SEPTEMBER: "Septembre",
  OCTOBER: "Octobre",
  NOVEMBER: "Novembre",
  DECEMBER: "Décembre",
};

export function getMonthLabel(month: Month) {
  return monthLabels[month];
}

export function getMonthIndex(month: Month) {
  return Object.keys(Month).indexOf(month);
}

export function getShortenedMonths() {
  return Object.values(monthLabels).map((month) => month.charAt(0));
}
