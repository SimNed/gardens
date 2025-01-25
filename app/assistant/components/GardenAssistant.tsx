"use client";

import { PlantType } from "@/types/plant";
import Grid from "./Grid/Grid";

interface GardenAssistantProps {
  plants: Array<PlantType>;
}

const GardenAssistant = ({ plants }: GardenAssistantProps) => {
  return (
    <div>
      <Grid />
    </div>
  );
};

export default GardenAssistant;
