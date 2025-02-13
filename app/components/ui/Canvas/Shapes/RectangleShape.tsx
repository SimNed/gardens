import React from "react";
import ResizeHandles from "./ResizeHandles";
import ShapeInfos from "./ShapeInfos";
import { RectangleType } from "@/types/canvas";
import DimensionsTooltip from "./DimensionsTooltip";
import { CanvasMode, useCanvasContext } from "../context";
import { LEFT_CLICK_BUTTON_CODE } from "@/app/lib/utils/keys";

interface RectangleShapeProps {
  index: number;
  rectangle: RectangleType;
  isSelected: boolean;
  isHovered: boolean;
  isTemp?: boolean;
}

const DEFAULT_RECT_FILL = "rgb(240, 240, 245)";
const DEFAULT_RECT_STROKE = "rgb(150, 150, 170)";

const SELECTED_RECT_FILL = "rgb(189,224,254)";

const HOVER_RECT_FILL = "rgb(189,224,254)";
const HOVER_RECT_STROKE = "rgb(200,200,220)";

export default function RectangleShape({
  index,
  rectangle,
  isSelected,
  isHovered,
}: RectangleShapeProps) {
  const {
    state,
    mode,
    gridSize,
    handleMouseDown,
    onShapeSelect,
    onShapeHover,
    onShapeUnhover,
  } = useCanvasContext();
  const fillColor = isSelected
    ? SELECTED_RECT_FILL
    : isHovered
    ? HOVER_RECT_FILL
    : DEFAULT_RECT_FILL;

  const strokeColor = isSelected
    ? "none"
    : isHovered
    ? HOVER_RECT_STROKE
    : DEFAULT_RECT_STROKE;

  return (
    <g>
      <rect
        x={rectangle.x}
        y={rectangle.y}
        rx={16}
        width={rectangle.width}
        height={rectangle.height}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSelected || isHovered ? 3 : 0.5}
        onMouseDown={(e) => {
          if (e.button === LEFT_CLICK_BUTTON_CODE) {
            e.stopPropagation();
            onShapeSelect(index);
            handleMouseDown(e, CanvasMode.MOVING);
          }
        }}
        onMouseEnter={() => {
          if (mode === CanvasMode.DEFAULT) onShapeHover(index);
        }}
        onMouseLeave={() => onShapeUnhover()}
        className="cursor-move"
      />

      {rectangle.infos &&
        mode !== CanvasMode.RESIZING &&
        mode !== CanvasMode.MOVING && (
          <ShapeInfos
            position={{
              x: rectangle.x + rectangle.width,
              y: rectangle.y,
            }}
            viewBox={`${0} ${0} ${state.viewBox.width / state.zoomLevel} ${
              state.viewBox.height / state.zoomLevel
            }`}
            gridSize={gridSize}
            infos={rectangle.infos}
          />
        )}

      {isSelected && <ResizeHandles shapeIndex={index} rectangle={rectangle} />}

      {(isSelected || isHovered) &&
        (mode === CanvasMode.RESIZING || mode === CanvasMode.DEFAULT) && (
          <DimensionsTooltip rectangle={rectangle} />
        )}
    </g>
  );
}
