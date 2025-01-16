"use client";

import useGridMouse from "@/lib/hooks/use-mouse";
import React, { useRef } from "react";
import ResizeHandles from "./ResizeHandles";
import { RIGHT_CLICK_BUTTON_CODE } from "@/lib/utils/grid";
import GridPattern from "./GridPattern";
import { DirectionVariantType } from "@/types/variant";
import useGrid, { GridMode } from "@/lib/hooks/use-grid";
import { useGardenContext } from "../../GardenContext";

interface GridCanvasProps {
  width?: number;
  height?: number;
  cellSize?: number;
}

function GridCanvas({ cellSize = 20 }: GridCanvasProps) {
  const gridRef = useRef(null);

  const { gardenState, getRectangles } = useGardenContext();

  const { getDragPoints, setDragPoints, getDragDeltas, getMousePosition } =
    useGridMouse({
      ref: gridRef,
    });

  const {
    updatePanning,
    updateRectDrawing,
    updateRectPosition,
    updateRectSize,
    getMousePositionInGrid,
    getViewBoxString,
    gridState,
    setGridState,
  } = useGrid({
    rectangles: getRectangles(),
    selectedRectangle: gardenState.selectedGardenBed
      ? gardenState.selectedGardenBed.rectangle
      : null,
    cellSize,
    handleRectangles: () => {},
    handleSelectedRectangle: () => {},
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

    setGridState((prevState) => ({ ...prevState, mode }));
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
        if (gardenState.selectedGardenBed) updateRectPosition(dragDeltas);
        break;
      case GridMode.RESIZING:
        updateRectSize(dragDeltas);
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    let currentGridState = {};

    if (gridState.mode === GridMode.DRAWING && gridState.tempRect) {
      if (gridState.tempRect.width > 0 && gridState.tempRect.height > 0) {
        currentGridState = {
          rectangles: [getRectangles(), gridState.tempRect],
          selectedRect: gridState.tempRect,
        };
      }
    }

    setGridState((prevState) => ({
      ...prevState,
      ...currentGridState,
      mode: GridMode.DEFAULT,
      tempRect: null,
    }));
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    setGridState((prev) => ({
      ...prev,
      viewBox: {
        ...prev.viewBox,
        width: prev.viewBox.width * (e.deltaY > 0 ? 1.1 : 0.9),
        height: prev.viewBox.height * (e.deltaY > 0 ? 1.1 : 0.9),
      },
    }));
  };

  const handleResizeDirection = (direction: DirectionVariantType) => {
    setGridState((prev) => ({ ...prev, resizeDirection: direction }));
  };

  return (
    <svg
      ref={gridRef}
      width="800"
      height="600"
      viewBox={getViewBoxString()}
      className="bg-white"
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        setGridState((prevState) => ({ ...prevState, selectedRect: null }));
        if (e.button === RIGHT_CLICK_BUTTON_CODE)
          handleMouseDown(e, GridMode.PANNING);
        else handleMouseDown(e, GridMode.DRAWING);
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={(e) => {
        e.stopPropagation();
        handleWheel(e);
      }}
    >
      <GridPattern cellSize={cellSize} viewBox={gridState.viewBox} />

      <g>
        {getRectangles().map((rect) => (
          <g key={rect.id}>
            <rect
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill={
                gardenState.selectedGardenBed?.rectangle.id === rect.id
                  ? "rgba(0, 100, 255, 0.4)"
                  : "rgba(0, 100, 255, 0.2)"
              }
              stroke={
                gardenState.selectedGardenBed?.rectangle.id === rect.id
                  ? "rgb(0, 0, 255)"
                  : "blue"
              }
              onMouseDown={(e) => {
                e.stopPropagation();
                setGridState((prevState) => ({
                  ...prevState,
                  selectedRect: rect,
                }));
                handleMouseDown(e, GridMode.MOVING);
              }}
              style={{ cursor: "move" }}
            />
            {gardenState.selectedGardenBed?.rectangle.id === rect.id && (
              <ResizeHandles
                rectangle={rect}
                onMouseDown={(e, direction) => {
                  e.stopPropagation();
                  setGridState((prevState) => ({
                    ...prevState,
                    selectedRect: rect,
                  }));
                  handleResizeDirection(direction);
                  handleMouseDown(e, GridMode.RESIZING);
                }}
              />
            )}
          </g>
        ))}
      </g>

      {gridState.mode === GridMode.DRAWING && gridState.tempRect && (
        <rect
          x={gridState.tempRect.x}
          y={gridState.tempRect.y}
          width={gridState.tempRect.width}
          height={gridState.tempRect.height}
          fill="rgba(0, 100, 255, 0.3)"
          stroke="blue"
          strokeWidth="1"
        />
      )}
    </svg>
  );
}

export default GridCanvas;
