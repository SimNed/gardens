"use client";

import React, { useEffect } from "react";

import {
  LEFT_CLICK_BUTTON_CODE,
  RIGHT_CLICK_BUTTON_CODE,
  SELECTED_RECT_FILL,
} from "@/app/lib/utils/canvas";

import { CanvasMode } from "@/app/lib/hooks/use-canvas/use-canvas";
import { RectangleType } from "@/types/canvas";
import GridPattern from "@/app/components/ui/Canvas/GridPattern";
import DimensionsTooltip from "@/app/components/ui/Canvas/Shapes/DimensionsTooltip";
import { useKeyPress } from "@/app/lib/hooks/use-keys-press";
import RectangleShape from "./Shapes/RectangleShape";
import { useCanvasContext } from "./context";

interface CanvasProps {
  rectangles: Array<RectangleType>;
  selectedIndex?: number;
  hoveredIndex?: number;
}

export default function Canvas({
  rectangles,
  selectedIndex,
  hoveredIndex,
}: CanvasProps) {
  const {
    state,
    mode,
    canvasRef,
    gridSize,
    dragPoints,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseWheel,
    onShapeUnselect,
    onShapeDelete,
  } = useCanvasContext();

  useKeyPress(() => {
    if (selectedIndex !== undefined) onShapeDelete(selectedIndex);
  }, ["Delete", "Backspace"]);

  useEffect(() => {
    console.log("mode in canvas", mode);
  }, [mode]);

  return (
    <>
      <svg
        ref={canvasRef}
        width="100%"
        height="100%"
        viewBox={`${state.viewBox.x} ${state.viewBox.y} ${state.viewBox.width} ${state.viewBox.height}`}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={(e) => {
          if (e.button === RIGHT_CLICK_BUTTON_CODE)
            handleMouseDown(e, CanvasMode.PANNING);
          else if (e.button === LEFT_CLICK_BUTTON_CODE) {
            onShapeUnselect();
            handleMouseDown(e, CanvasMode.DRAWING);
          }
        }}
        onMouseMove={(e) =>
          handleMouseMove(
            e,
            selectedIndex !== undefined ? rectangles[selectedIndex] : undefined
          )
        }
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={(e) => {
          e.stopPropagation();
          handleMouseWheel(e);
        }}
      >
        <GridPattern />

        <g>
          {(() => {
            return rectangles.map((rectangle, index) => {
              if (index === selectedIndex) return;
              return (
                <RectangleShape
                  key={index}
                  index={index}
                  rectangle={rectangle}
                  isHovered={
                    mode === CanvasMode.DEFAULT && hoveredIndex === index
                  }
                  isSelected={false}
                />
              );
            });
          })()}
        </g>

        {selectedIndex !== undefined && rectangles[selectedIndex] && (
          <RectangleShape
            key={selectedIndex}
            index={selectedIndex}
            rectangle={rectangles[selectedIndex]}
            isHovered={false}
            isSelected={true}
          />
        )}

        {state.tempRectangle && mode === CanvasMode.DRAWING && (
          <rect
            x={state.tempRectangle.x}
            y={state.tempRectangle.y}
            width={state.tempRectangle.width}
            height={state.tempRectangle.height}
            fill={SELECTED_RECT_FILL}
          />
        )}

        {state.tempRectangle && dragPoints.start && (
          <DimensionsTooltip
            position={{
              x: dragPoints.start.x,
              y: dragPoints.start.y,
            }}
            width={state.tempRectangle.width / gridSize / 2}
            height={state.tempRectangle.height / gridSize / 2}
            zoomLevel={state.zoomLevel}
            viewBoxPosition={{ x: state.viewBox.x, y: state.viewBox.y }}
          />
        )}
      </svg>
    </>
  );
}
