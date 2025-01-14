"use client";

import useGridMouse from "@/lib/hooks/use-mouse";
import React, { useRef } from "react";
import ResizeHandles from "./ResizeHandles";
import { RIGHT_CLICK_BUTTON_CODE } from "@/lib/utils/grid";
import GridPattern from "./GridPattern";
import { DirectionVariantType } from "@/types/variant";
import useGrid from "@/lib/hooks/use-grid";

export enum GridMode {
  DEFAULT,
  PANNING,
  DRAWING,
  MOVING,
  RESIZING,
}

const GRID_SIZE = 20;

const GridEditor = () => {
  const gridRef = useRef(null);

  const { getDragPoints, setDragPoints, getDragDeltas, getMousePosition } =
    useGridMouse({
      ref: gridRef,
    });

  const {
    rectangles,
    selectedRect,
    tempRect,
    gridState,
    setGridState,
    getMousePositionInGrid,
    setResizeDirection,
    updatePanning,
    updateRectDrawing,
    updateRectPosition,
    updateRectSize,
    setRectangles,
    setTempRect,
    setSelectedRect,
    getViewBoxString,
  } = useGrid({
    gridRef: gridRef,
    divisions: GRID_SIZE,
  });

  const handleMouseDown = (
    e: React.MouseEvent<SVGRectElement | SVGSVGElement, MouseEvent>,
    mode: GridMode
  ) => {
    e.preventDefault();

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInGrid(mousePosition);
    if (!mousePositionInGrid) return;

    setDragPoints({
      origin: mousePositionInGrid,
      current: mousePositionInGrid,
    });

    setGridState({ ...gridState, mode });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (gridState.mode === GridMode.DEFAULT) return;

    const mousePosition = getMousePosition(e);

    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInGrid(mousePosition);

    setDragPoints({ current: mousePositionInGrid });

    const dragDeltas = getDragDeltas();

    switch (gridState.mode) {
      case GridMode.PANNING:
        updatePanning(dragDeltas);
        break;
      case GridMode.DRAWING:
        const dragPoints = getDragPoints();
        updateRectDrawing(dragPoints);
        break;
      case GridMode.MOVING:
        if (selectedRect) updateRectPosition(dragDeltas);
        break;
      case GridMode.RESIZING:
        updateRectSize(dragDeltas);
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    if (gridState.mode === GridMode.DRAWING && tempRect) {
      if (tempRect.width > 0 && tempRect.height > 0) {
        setRectangles([...rectangles, tempRect]);
        setSelectedRect(tempRect);
      }
    }

    setGridState({ ...gridState, mode: GridMode.DEFAULT });

    setTempRect(null);
    setResizeDirection(null);
  };

  const handleResizeDirection = (direction: DirectionVariantType) => {
    setResizeDirection(direction);
  };

  return (
    <div
      className="border border-gray-300 rounded"
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg
        ref={gridRef}
        width="400"
        height="400"
        viewBox={getViewBoxString()}
        className="bg-white"
        onMouseDown={(e) => {
          setSelectedRect(null);
          if (e.button === RIGHT_CLICK_BUTTON_CODE)
            handleMouseDown(e, GridMode.PANNING);
          else handleMouseDown(e, GridMode.DRAWING);
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <GridPattern gridSize={GRID_SIZE} viewBox={gridState.viewBox} />

        <g>
          {rectangles.map((rect) => (
            <g key={rect.id}>
              <rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill={
                  selectedRect?.id === rect.id
                    ? "rgba(0, 100, 255, 0.4)"
                    : "rgba(0, 100, 255, 0.2)"
                }
                stroke={
                  selectedRect?.id === rect.id ? "rgb(0, 0, 255)" : "blue"
                }
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setSelectedRect(rect);
                  handleMouseDown(e, GridMode.MOVING);
                }}
                style={{ cursor: "move" }}
              />
              {selectedRect?.id === rect.id && (
                <ResizeHandles
                  rectangle={rect}
                  onMouseDown={(e, direction) => {
                    e.stopPropagation();
                    handleResizeDirection(direction);
                    handleMouseDown(e, GridMode.RESIZING);
                  }}
                />
              )}
            </g>
          ))}
        </g>

        {gridState.mode === GridMode.DRAWING && tempRect && (
          <rect
            x={tempRect.x}
            y={tempRect.y}
            width={tempRect.width}
            height={tempRect.height}
            fill="rgba(0, 100, 255, 0.3)"
            stroke="blue"
            strokeWidth="1"
          />
        )}
      </svg>
    </div>
  );
};

export default GridEditor;
