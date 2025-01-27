import { Melliferous } from "@prisma/client";

export function getMelliferouses() {
  return [
    { key: "Léger", value: Melliferous.LOW },
    { key: "Modéré", value: Melliferous.MODERATE },
    { key: "Haut", value: Melliferous.HIGH },
  ];
}
