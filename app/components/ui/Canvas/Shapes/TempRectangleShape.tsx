import React from "react";
import { RectangleType } from "@/types/canvas";
import DimensionsTooltip from "./DimensionsTooltip";

interface TempRectangleShapeProps {
  rectangle: RectangleType;
}

const SELECTED_RECT_FILL = "rgb(189,224,254)";

export default function TempRectangleShape({
  rectangle,
}: TempRectangleShapeProps) {
  return (
    <>
      <rect
        x={rectangle.x}
        y={rectangle.y}
        width={rectangle.width}
        height={rectangle.height}
        fill={SELECTED_RECT_FILL}
      />

      <DimensionsTooltip rectangle={rectangle} />
    </>
  );
}
