import { Melliferous } from "@prisma/client";

export const getListedMelliferouses = () => {
  return [
    { key: "Léger", value: Melliferous.LOW },
    { key: "Modéré", value: Melliferous.MODERATE },
    { key: "Haut", value: Melliferous.HIGH },
  ];
};
