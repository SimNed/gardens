"use client";

import { GardenBedType } from "@/types/assistant";
import GridCanvas from "./Grid/GridCanvas";
import { PlantType } from "@/types/plant";
import { useState } from "react";
import { GridProvider } from "./Grid/GridContext";

interface GardenAssistantProps {
  plants: Array<PlantType>;
}

interface GardenStateProps {
  gardenBeds: Array<GardenBedType>;
  selectedGardenBed: GardenBedType | null;
}

const GardenAssistant = ({ plants }: GardenAssistantProps) => {
  const [gardenState, setGardenState] = useState<GardenStateProps>({
    gardenBeds: [],
    selectedGardenBed: null,
  });

  const handleCreateGardenBed = (rectangleId: number) => {
    const gardenBed = {
      rectangleId,
      soil: null,
      sunExposure: null,
      crop: null,
    };

    setGardenState((prev) => ({
      gardenBeds: [...prev.gardenBeds, gardenBed],
      selectedGardenBed: gardenBed,
    }));
  };

  // const handleUpdateGardenBed = (rectangle: RectangleType) => {
  //   const updatedGardenBeds = gardenState.gardenBeds.map((gardenBed) => {
  //     return gardenBed.rectangleId === rectangle.id
  //       ? {
  //           ...gardenBed,
  //           rectangle: rectangle,
  //         }
  //       : gardenBed;
  //   });

  //   setGardenState((prev) => ({
  //     ...prev,
  //     gardenBeds: updatedGardenBeds,
  //     selectedGardenBed:
  //       updatedGardenBeds.find(
  //         (gardenBed) => gardenBed.rectangleId === rectangle.id
  //       ) ?? null,
  //   }));
  // };

  // const handleSelectedGardenBed = (rectangle: RectangleType | null) => {
  //   const selectedGardenBed = !rectangle
  //     ? rectangle
  //     : gardenState.gardenBeds.find(
  //         (gardenBed) => gardenBed.rectangleId === rectangle.id
  //       ) ?? null;

  //   setGardenState((prev) => ({
  //     ...prev,
  //     selectedGardenBed: selectedGardenBed,
  //   }));
  // };

  return (
    <div>
      <GridProvider>
        <GridCanvas
          onCreateShape={handleCreateGardenBed}
          // handleUpdateRectangle={handleUpdateGardenBed}
          // handleSelectedRectangle={handleSelectedGardenBed}
        />
      </GridProvider>
    </div>
  );
};

export default GardenAssistant;
