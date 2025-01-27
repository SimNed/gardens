import { LifeCycle } from "@prisma/client";

export function getLifeCycles() {
  return [
    { key: "Annuelle", value: LifeCycle.ANNUAL },
    { key: "Bisannuelle", value: LifeCycle.BISANNUAL },
    { key: "Vivace", value: LifeCycle.PERENNIAL },
  ];
}
