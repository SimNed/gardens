"use client";

import { GardenBedType } from "@/types/assistant";
import { GardenProvider } from "../GardenContext";
import GridCanvas from "./Grid/GridCanvas";
import { PlantType } from "@/types/plant";
import { useState } from "react";
import { RectangleType } from "@/types/grid";

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

  const getRectangles = () => {
    return gardenState.gardenBeds.map((gardenBed) => gardenBed.rectangle);
  };

  const handleCreateGardenBed = (rectangle: RectangleType) => {
    const gardenBed = {
      rectangle: rectangle,
      soil: null,
      sunExposure: null,
      crop: null,
    };

    setGardenState((prev) => ({
      gardenBeds: [...prev.gardenBeds, gardenBed],
      selectedGardenBed: gardenBed,
    }));
  };

  const handleUpdateGardenBed = (rectangle: RectangleType) => {
    const updatedGardenBeds = gardenState.gardenBeds.map((gardenBed) => {
      return gardenBed.rectangle.id === rectangle.id
        ? {
            ...gardenBed,
            rectangle: rectangle,
          }
        : gardenBed;
    });

    setGardenState((prev) => ({
      ...prev,
      gardenBeds: updatedGardenBeds,
      selectedGardenBed:
        updatedGardenBeds.find(
          (gardenBed) => gardenBed.rectangle.id === rectangle.id
        ) ?? null,
    }));
  };

  const handleSelectedGardenBed = (rectangle: RectangleType | null) => {
    const selectedGardenBed = !rectangle
      ? rectangle
      : gardenState.gardenBeds.find(
          (gardenBed) => gardenBed.rectangle.id === rectangle.id
        ) ?? null;

    setGardenState((prev) => ({
      ...prev,
      selectedGardenBed: selectedGardenBed,
    }));
  };

  return (
    <div>
      <GardenProvider>
        <GridCanvas
          rectangles={getRectangles()}
          selectedRectangle={gardenState.selectedGardenBed?.rectangle ?? null}
          handleCreateRectangle={handleCreateGardenBed}
          handleUpdateRectangle={handleUpdateGardenBed}
          handleSelectedRectangle={handleSelectedGardenBed}
        />
      </GardenProvider>
    </div>
  );
};

export default GardenAssistant;
