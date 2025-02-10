import { Vector2Type } from "@/types/canvas";
import React from "react";

interface ShapeInfosprops {
  viewBox: string;
  position: Vector2Type;
  gridSize: number;
  zoomLevel?: number;
}

export default function ShapeInfos({
  viewBox,
  position,
  gridSize,
  zoomLevel = 1,
}: ShapeInfosprops) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      x={position.x + (gridSize / 2) * zoomLevel}
      y={position.y - (gridSize / 2) * zoomLevel}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className=" hover:cursor-pointer fill-yellow-400 stroke-white hover:stroke-black"
      style={{ transform: "scale(2)", transformOrigin: "center" }}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}
