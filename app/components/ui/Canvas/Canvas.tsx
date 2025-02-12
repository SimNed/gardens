"use client";

import React, { useRef } from "react";

import {
  DEFAULT_RECT_FILL,
  DEFAULT_RECT_STROKE,
  HOVER_RECT_FILL,
  HOVER_RECT_STROKE,
  LEFT_CLICK_BUTTON_CODE,
  RIGHT_CLICK_BUTTON_CODE,
  SELECTED_RECT_FILL,
} from "@/app/lib/utils/canvas";

import { CanvasMode, useCanvas } from "@/app/lib/hooks/use-canvas/use-canvas";
import { RectangleType } from "@/types/canvas";
import GridPattern from "@/app/components/ui/Canvas/GridPattern";
import ResizeHandles from "@/app/components/ui/Canvas/ResizeHandles";
import DimensionsTooltip from "@/app/components/ui/Canvas/DimensionsTooltip";
import ShapeInfos from "./ShapeInfos";
import { useKeyPress } from "@/app/lib/hooks/use-keys-press";

interface CanvasProps {
  rectangles: Array<RectangleType>;
  selectedIndex?: number;
  hoveredIndex?: number;
  gridSize?: number;
  onRectangleCreate: (rectangle: RectangleType) => void;
  onRectangleUpdate: (rectangle: RectangleType) => void;
  onRectangleDelete: (index: number) => void;
  onSelect: (index: number) => void;
  onUnselect: () => void;
  onHover: (index: number) => void;
  onUnhover: () => void;
}

export default function Canvas({
  gridSize = 20,
  rectangles,
  selectedIndex,
  hoveredIndex,
  onRectangleCreate,
  onRectangleUpdate,
  onRectangleDelete,
  onSelect,
  onUnselect,
  onHover,
  onUnhover,
}: CanvasProps) {
  const canvasRef = useRef(null);

  const {
    state,
    mode,
    dragPoints,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    setResizeDirection,
  } = useCanvas({
    canvasRef: canvasRef,
    gridSize: gridSize,
    onRectangleCreate,
    onRectangleUpdate,
  });

  useKeyPress(() => {
    if (selectedIndex !== undefined) onRectangleDelete(selectedIndex);
  }, ["Delete", "Backspace"]);

  const getSortedRectangles = (
    index: number | undefined,
    rectangles: Array<RectangleType>
  ) => {
    const rectanglesWithIndices = rectangles.map((rectangle, idx) => ({
      ...rectangle,
      originalIndex: idx,
    }));

    return index !== undefined
      ? [
          ...rectanglesWithIndices.filter((_rectangle, idx) => index !== idx),
          rectanglesWithIndices[index],
        ]
      : rectanglesWithIndices;
  };

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
            onUnselect();
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
          handleWheel(e);
        }}
      >
        <GridPattern
          gridSize={gridSize}
          viewBox={state.viewBox}
          zoomLevel={state.zoomLevel / 2}
        />
        <g>
          {(() => {
            return getSortedRectangles(selectedIndex, rectangles).map(
              (rectangle, index) => (
                <g key={index}>
                  <rect
                    x={rectangle.x}
                    y={rectangle.y}
                    rx={16}
                    width={rectangle.width}
                    height={rectangle.height}
                    fill={
                      selectedIndex === rectangle.originalIndex
                        ? SELECTED_RECT_FILL
                        : hoveredIndex === rectangle.originalIndex
                        ? HOVER_RECT_FILL
                        : DEFAULT_RECT_FILL
                    }
                    stroke={
                      selectedIndex === rectangle.originalIndex
                        ? "none"
                        : hoveredIndex === rectangle.originalIndex
                        ? HOVER_RECT_STROKE
                        : DEFAULT_RECT_STROKE
                    }
                    strokeWidth={
                      selectedIndex === rectangle.originalIndex ||
                      hoveredIndex === rectangle.originalIndex
                        ? 3
                        : 0.5
                    }
                    onMouseDown={(e) => {
                      if (e.button === LEFT_CLICK_BUTTON_CODE) {
                        e.stopPropagation();
                        onSelect(rectangle.originalIndex);
                        handleMouseDown(e, CanvasMode.MOVING);
                      }
                    }}
                    onMouseEnter={() => {
                      if (mode === CanvasMode.DEFAULT)
                        onHover(rectangle.originalIndex);
                    }}
                    onMouseLeave={() => onUnhover()}
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
                        viewBox={`${0} ${0} ${
                          state.viewBox.width / state.zoomLevel
                        } ${state.viewBox.height / state.zoomLevel}`}
                        gridSize={gridSize}
                        infos={rectangle.infos}
                      />
                    )}

                  {selectedIndex === rectangle.originalIndex && (
                    <ResizeHandles
                      rectangle={rectangle}
                      zoomLevel={state.zoomLevel}
                      onMouseDown={(e, direction) => {
                        e.stopPropagation();
                        onSelect(rectangle.originalIndex);
                        setResizeDirection(direction);
                        handleMouseDown(e, CanvasMode.RESIZING);
                      }}
                    />
                  )}
                </g>
              )
            );
          })()}
        </g>

        {mode === CanvasMode.DRAWING && state.tempRectangle && (
          <>
            <rect
              x={state.tempRectangle.x}
              y={state.tempRectangle.y}
              width={state.tempRectangle.width}
              height={state.tempRectangle.height}
              fill={SELECTED_RECT_FILL}
            />
          </>
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
          />
        )}
        {selectedIndex !== undefined &&
          rectangles[selectedIndex] &&
          (mode === CanvasMode.RESIZING || mode === CanvasMode.DEFAULT) && (
            <DimensionsTooltip
              position={{
                x: rectangles[selectedIndex].x,
                y: rectangles[selectedIndex].y,
              }}
              width={rectangles[selectedIndex].width / gridSize / 2}
              height={rectangles[selectedIndex].height / gridSize / 2}
              zoomLevel={state.zoomLevel}
            />
          )}
        {hoveredIndex !== undefined &&
          hoveredIndex !== selectedIndex &&
          (mode === CanvasMode.RESIZING || mode === CanvasMode.DEFAULT) && (
            <DimensionsTooltip
              position={{
                x: rectangles[hoveredIndex].x,
                y: rectangles[hoveredIndex].y,
              }}
              width={rectangles[hoveredIndex].width / gridSize / 2}
              height={rectangles[hoveredIndex].height / gridSize / 2}
              zoomLevel={state.zoomLevel}
            />
          )}
      </svg>
    </>
  );
}
