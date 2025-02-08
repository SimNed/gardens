"use client";

import React, { useRef } from "react";

import {
  DEFAULT_RECT_FILL,
  DEFAULT_RECT_STROKE,
  HOVER_RECT_FILL,
  LEFT_CLICK_BUTTON_CODE,
  RIGHT_CLICK_BUTTON_CODE,
  SELECTED_RECT_FILL,
} from "@/app/lib/utils/canvas";

import { CanvasMode, useCanvas } from "@/app/lib/hooks/use-canvas/use-canvas";
import { RectangleType } from "@/types/canvas";
import GridPattern from "@/app/components/ui/Canvas/GridPattern";
import ResizeHandles from "@/app/components/ui/Canvas/ResizeHandles";
import DimensionsTooltip from "@/app/components/ui/Canvas/DimensionsTooltip";

interface CanvasProps {
  rectangles: Array<RectangleType>;
  selectedIndex?: number;
  hoveredIndex?: number;
  cellSize?: number;
  onRectangleCreate: (rectangle: RectangleType) => void;
  onRectangleUpdate: (rectangle: RectangleType) => void;
  onSelect: (index: number) => void;
  onUnselect: () => void;
  onHover: (index: number) => void;
  onUnhover: () => void;
}

export default function Canvas({
  cellSize = 20,
  rectangles,
  selectedIndex,
  hoveredIndex,
  onRectangleCreate,
  onRectangleUpdate,
  onSelect,
  onUnselect,
  onHover,
  onUnhover,
}: CanvasProps) {
  const canvasRef = useRef(null);

  const {
    state: canvasState,
    mode,
    dragPointsOrigin,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    setResizeDirection,
  } = useCanvas({
    canvasRef: canvasRef,
    cellSize: cellSize,
    onRectangleUpdate,
    onRectangleCreate,
  });

  return (
    <>
      <svg
        ref={canvasRef}
        width="100%"
        height="100%"
        viewBox={`${canvasState.viewBox.x} ${canvasState.viewBox.y} ${canvasState.viewBox.width} ${canvasState.viewBox.height}`}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={(e) => {
          if (e.button === RIGHT_CLICK_BUTTON_CODE)
            handleMouseDown(e, CanvasMode.PANNING);
          else if (e.button === LEFT_CLICK_BUTTON_CODE) {
            onUnselect();
            handleMouseDown(e, CanvasMode.DRAWING);
          }
        }}
        onMouseMove={(e) =>
          handleMouseMove(
            e,
            selectedIndex ? rectangles[selectedIndex] : undefined
          )
        }
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={(e) => {
          e.stopPropagation();
          console.log(selectedIndex);
          handleWheel(e);
        }}
      >
        <GridPattern cellSize={cellSize} viewBox={canvasState.viewBox} />
        <g>
          {(() => {
            return rectangles.map((rectangle, index) => (
              <g key={index}>
                <rect
                  x={rectangle.x}
                  y={rectangle.y}
                  rx={16}
                  width={rectangle.width}
                  height={rectangle.height}
                  fill={
                    selectedIndex === index
                      ? SELECTED_RECT_FILL
                      : hoveredIndex === index
                      ? HOVER_RECT_FILL
                      : DEFAULT_RECT_FILL
                  }
                  stroke={
                    selectedIndex === index ? "none" : DEFAULT_RECT_STROKE
                  }
                  strokeWidth={0.5}
                  onMouseDown={(e) => {
                    if (e.button === LEFT_CLICK_BUTTON_CODE) {
                      e.stopPropagation();
                      onSelect(index);
                      handleMouseDown(e, CanvasMode.MOVING);
                    }
                  }}
                  onMouseEnter={() => {
                    if (mode === CanvasMode.DEFAULT) onHover(index);
                  }}
                  onMouseLeave={() => onUnhover()}
                  className="cursor-move"
                />
                {selectedIndex === index && (
                  <ResizeHandles
                    rectangle={rectangle}
                    onMouseDown={(e, direction) => {
                      e.stopPropagation();
                      onSelect(index);
                      setResizeDirection(direction);
                      handleMouseDown(e, CanvasMode.RESIZING);
                    }}
                  />
                )}
              </g>
            ));
          })()}
        </g>

        {mode === CanvasMode.DRAWING && canvasState.tempRectangle && (
          <>
            <rect
              x={canvasState.tempRectangle.x}
              y={canvasState.tempRectangle.y}
              width={canvasState.tempRectangle.width}
              height={canvasState.tempRectangle.height}
              fill={SELECTED_RECT_FILL}
            />
          </>
        )}
      </svg>
      {canvasState.tempRectangle && dragPointsOrigin && (
        <DimensionsTooltip
          position={{
            x: dragPointsOrigin.x,
            y: dragPointsOrigin.y,
          }}
          width={canvasState.tempRectangle.width / cellSize}
          height={canvasState.tempRectangle.height / cellSize}
        />
      )}
    </>
  );
}
