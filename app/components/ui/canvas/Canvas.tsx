"use client";

import React, { useEffect } from "react";

import {
  LEFT_CLICK_BUTTON_CODE,
  RIGHT_CLICK_BUTTON_CODE,
} from "@/app/lib/utils/keys";

import { RectangleType } from "@/types/canvas";
import GridPattern from "@/app/components/ui/canvas/GridPattern";
import { useKeyPress } from "@/app/lib/hooks/use-keys-press";
import RectangleShape from "./Shapes/RectangleShape";
import { CanvasMode, useCanvasContext } from "./context";
import TempRectangleShape from "./Shapes/TempRectangleShape";

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
          <TempRectangleShape rectangle={state.tempRectangle} />
        )}
      </svg>
    </>
  );
}
