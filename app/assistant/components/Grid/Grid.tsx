"use client";

import GridCanvas from "./GridCanvas";
import { GridProvider } from "./GridContext";
import { GridSideBar } from "./GridSideBar";

interface GardenAssistantProps {
  width?: number;
  height?: number;
  cellSize?: number;
}

export default function Grid({
  width = 800,
  height = 600,
  cellSize = 20,
}: GardenAssistantProps) {
  return (
    <div className="flex">
      <GridProvider>
        <GridCanvas width={width} height={height} cellSize={cellSize} />
        <GridSideBar />
      </GridProvider>
    </div>
  );
}
