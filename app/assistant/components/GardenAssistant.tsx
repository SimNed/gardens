"use client";

import { GardenProvider } from "../GardenContext";
import GridCanvas from "./Grid/GridCanvas";
import { PlantType } from "@/types/plant";

interface GardenAssistantProps {
  plants: Array<PlantType>;
}

const GardenAssistant = ({ plants }: GardenAssistantProps) => {
  console.log(plants);

  return (
    <div>
      <GardenProvider>
        <GridCanvas />
      </GardenProvider>
    </div>
  );
};

export default GardenAssistant;
