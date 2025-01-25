"use client";

import useGridMouse from "@/lib/hooks/use-mouse";
import React, { useRef, useState } from "react";
import ResizeHandles from "./ResizeHandles";
import { RIGHT_CLICK_BUTTON_CODE } from "@/lib/utils/grid";
import GridPattern from "./GridPattern";
// import { DirectionVariantType } from "@/types/variant";
import useGrid, { GridMode } from "@/lib/hooks/use-grid";
import { useGridContext } from "./GridContext";
import { RectangleType, ViewBoxType } from "@/types/grid";

interface GridCanvasProps {
  width?: number;
  height?: number;
  cellSize?: number;
  onCreateShape: (shapeId: number) => void;
}

const GridCanvas = ({
  cellSize = 20,
  width = 800,
  height = 600,
}: GridCanvasProps) => {
  const gridRef = useRef(null);
  const gridModeRef = useRef(GridMode.DEFAULT);
  // const resizeDirectionRef = useRef<DirectionVariantType | null>(null);

  const [tempRect, setTempRect] = useState<RectangleType | null>(null);
  const [viewBox, setViewbox] = useState<ViewBoxType>({
    x: 0,
    y: 0,
    width: width,
    height: height,
  });

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
  } = useGrid({
    gridRef: gridRef,
    cellSize: cellSize,
    width: width,
    height: height,
  });

  const {
    getElements,
    createElement,
    selectElement,
    unselectElement,
    getSelectedElement,
  } = useGridContext();

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

    gridModeRef.current = mode;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (gridModeRef.current === GridMode.DEFAULT) return;

    const mousePosition = getMousePosition(e);

    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInGrid(mousePosition);

    setDragPoints({ current: mousePositionInGrid });

    const dragDeltas = getDragDeltas();

    switch (gridModeRef.current) {
      case GridMode.PANNING:
        setViewbox(updatePanning(viewBox, dragDeltas));
        break;
      case GridMode.DRAWING:
        const dragPoints = getDragPoints();
        setTempRect(updateRectDrawing(dragPoints));
        break;
      case GridMode.MOVING:
        if (getSelectedElement()) updateRectPosition(dragDeltas);
        break;
      case GridMode.RESIZING:
        updateRectSize(dragDeltas);
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    if (
      gridModeRef.current === GridMode.DRAWING &&
      tempRect &&
      tempRect.width > 0 &&
      tempRect.height > 0
    ) {
      createElement(tempRect);
    }

    gridModeRef.current = GridMode.DEFAULT;
    setTempRect(null);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    setViewbox((prev) => ({
      ...prev,
      width: prev.width * (e.deltaY > 0 ? 1.1 : 0.9),
      height: prev.height * (e.deltaY > 0 ? 1.1 : 0.9),
    }));
  };

  // const handleResizeDirection = (direction: DirectionVariantType) => {
  //   setResizeDirection(direction);
  // };

  return (
    <svg
      ref={gridRef}
      width="800"
      height="600"
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      className="bg-white"
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        if (e.button === RIGHT_CLICK_BUTTON_CODE)
          handleMouseDown(e, GridMode.PANNING);
        else {
          unselectElement();
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
      <GridPattern cellSize={cellSize} viewBox={viewBox} />
      <g>
        {getElements().map((element) => (
          <g key={element.id}>
            <rect
              x={element.rectangle.x}
              y={element.rectangle.y}
              width={element.rectangle.width}
              height={element.rectangle.height}
              fill={
                getSelectedElement()?.id === element.id
                  ? "rgba(0, 100, 255, 0.4)"
                  : "rgba(0, 100, 255, 0.2)"
              }
              stroke={
                getSelectedElement()?.id === element.id
                  ? "rgb(0, 0, 255)"
                  : "blue"
              }
              onMouseDown={(e) => {
                e.stopPropagation();
                selectElement(element);
                handleMouseDown(e, GridMode.MOVING);
              }}
              style={{ cursor: "move" }}
            />
            {getSelectedElement()?.id === element.id && (
              <ResizeHandles
                rectangle={element.rectangle}
                onMouseDown={(e, direction) => {
                  e.stopPropagation();
                  // selectRectangle(rect);
                  // handleResizeDirection(direction);
                  handleMouseDown(e, GridMode.RESIZING);
                }}
              />
            )}
          </g>
        ))}
      </g>

      {gridModeRef.current === GridMode.DRAWING && tempRect && (
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
  );
};

export default GridCanvas;
