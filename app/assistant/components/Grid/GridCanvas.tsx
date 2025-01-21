"use client";

import useGridMouse from "@/lib/hooks/use-mouse";
import React, { useRef, useState } from "react";
import ResizeHandles from "./ResizeHandles";
import {
  getMousePositionInGrid,
  getRectDrawUpdate,
  getRectPositionUpdate,
  getRectSizeUpdate,
  getViewBoxPanningUpdate,
  getViewBoxString,
  RIGHT_CLICK_BUTTON_CODE,
} from "@/lib/utils/grid";
import GridPattern from "./GridPattern";
import { DirectionVariantType } from "@/types/variant";
import { GridMode } from "@/lib/hooks/use-grid";
import { RectangleType, ViewBoxType } from "@/types/grid";

interface GridCanvasProps {
  rectangles: RectangleType[];
  selectedRectangle: RectangleType | null;
  width?: number;
  height?: number;
  cellSize?: number;
  handleCreateRectangle: (rectangle: RectangleType) => void;
  handleUpdateRectangle: (rectangle: RectangleType) => void;
  handleSelectedRectangle: (rectangle: RectangleType | null) => void;
}

export interface GridStateProps {
  viewBox: ViewBoxType;
  mode: GridMode;
  tempRect: RectangleType | null;
}

function GridCanvas({
  cellSize = 20,
  rectangles,
  selectedRectangle,
  handleCreateRectangle,
  handleUpdateRectangle,
  handleSelectedRectangle,
}: GridCanvasProps) {
  const gridRef = useRef(null);
  const resizeDirectionRef = useRef<DirectionVariantType | null>(null);

  const [gridState, setGridState] = useState<GridStateProps>({
    viewBox: {
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    },
    mode: GridMode.DEFAULT,
    tempRect: null,
  });

  const { getDragPoints, setDragPoints, getDragDeltas, getMousePosition } =
    useGridMouse({
      ref: gridRef,
    });

  const handleMouseDown = (
    e: React.MouseEvent<SVGRectElement | SVGSVGElement, MouseEvent>,
    mode: GridMode
  ) => {
    e.preventDefault();

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInGrid(mousePosition, cellSize);
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

    const mousePositionInGrid = getMousePositionInGrid(mousePosition, cellSize);

    setDragPoints({ current: mousePositionInGrid });

    switch (gridState.mode) {
      case GridMode.PANNING:
        setGridState((prev) => ({
          ...prev,
          viewBox: getViewBoxPanningUpdate(prev.viewBox, getDragDeltas()),
        }));
        break;
      case GridMode.DRAWING:
        setGridState((prev) => ({
          ...prev,
          tempRect: getRectDrawUpdate(getDragPoints()),
        }));
        break;
      case GridMode.MOVING:
        if (selectedRectangle) {
          handleUpdateRectangle(
            getRectPositionUpdate(selectedRectangle, cellSize, getDragDeltas())
          );
        }
        break;
      case GridMode.RESIZING:
        if (selectedRectangle && resizeDirectionRef.current) {
          handleUpdateRectangle(
            getRectSizeUpdate(
              selectedRectangle,
              getDragDeltas(),
              resizeDirectionRef.current,
              cellSize
            )
          );
        }
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    let currentGridState = {};

    if (gridState.mode === GridMode.DRAWING && gridState.tempRect) {
      if (gridState.tempRect.width > 0 && gridState.tempRect.height > 0) {
        handleCreateRectangle(gridState.tempRect);
        currentGridState = {
          rectangles: [...rectangles, gridState.tempRect],
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
    resizeDirectionRef.current = direction;
  };

  return (
    <svg
      ref={gridRef}
      width="800"
      height="600"
      viewBox={getViewBoxString(gridState.viewBox)}
      className="bg-white"
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        setGridState((prevState) => ({ ...prevState, selectedRect: null }));
        if (e.button === RIGHT_CLICK_BUTTON_CODE)
          handleMouseDown(e, GridMode.PANNING);
        else {
          handleSelectedRectangle(null);
          handleMouseDown(e, GridMode.DRAWING);
        }
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
        {rectangles.map((rect) => (
          <g key={rect.id}>
            <rect
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill={
                selectedRectangle?.id === rect.id
                  ? "rgba(0, 100, 255, 0.4)"
                  : "rgba(0, 100, 255, 0.2)"
              }
              stroke={
                selectedRectangle?.id === rect.id ? "rgb(0, 0, 255)" : "blue"
              }
              onMouseDown={(e) => {
                e.stopPropagation();
                handleSelectedRectangle(rect);
                handleMouseDown(e, GridMode.MOVING);
              }}
              style={{ cursor: "move" }}
            />
            {selectedRectangle?.id === rect.id && (
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
