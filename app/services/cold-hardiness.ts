import { cache } from "react";
import prisma from "../lib/prisma/db";

export const getColdHardinessRange = cache(async () => {
  const coldHardinessRange = await prisma.plant.aggregate({
    _min: {
      coldHardiness: true,
    },
    _max: {
      coldHardiness: true,
    },
  });

  return {
    min: coldHardinessRange._min.coldHardiness ?? -9,
    max: coldHardinessRange._max.coldHardiness ?? 9,
  };
});
