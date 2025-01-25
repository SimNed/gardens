"use client";

import useGridMouse from "@/lib/hooks/use-mouse";
import React, { useRef } from "react";
import ResizeHandles from "./ResizeHandles";
import {
  DEFAULT_RECT_FILL,
  DEFAULT_RECT_STROKE,
  LEFT_CLICK_BUTTON_CODE,
  RIGHT_CLICK_BUTTON_CODE,
  SELECTED_RECT_FILL,
  SELECTED_RECT_STROKE,
} from "@/lib/utils/grid";
import GridPattern from "./GridPattern";
import useGridCanvas, { CanvasMode } from "@/lib/hooks/use-canvas";
import { useGridContext } from "./GridContext";

interface CanvasProps {
  width: number;
  height: number;
  cellSize: number;
}

const GridCanvas = ({ cellSize, width, height }: CanvasProps) => {
  const canvasRef = useRef(null);

  const { getDragPoints, setDragPoints, getDragDeltas, getMousePosition } =
    useGridMouse({
      ref: canvasRef,
    });

  const {
    canvasState,
    setViewBox,
    setTempRectangle,
    getMode,
    setMode,
    setResizeDirection,
    getMousePositionInCanvas,
    updatePanning,
    updateRectPosition,
    updateRectDrawing,
    updateRectSize,
  } = useGridCanvas({
    canvasRef: canvasRef,
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
    mode: CanvasMode
  ) => {
    e.preventDefault();

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInCanvas(mousePosition);
    if (!mousePositionInGrid) return;

    setDragPoints({
      origin: mousePositionInGrid,
      current: mousePositionInGrid,
    });

    setMode(mode);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const mode = getMode();

    if (mode === CanvasMode.DEFAULT) return;

    const mousePosition = getMousePosition(e);

    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInCanvas(mousePosition);

    setDragPoints({ current: mousePositionInGrid });

    const dragDeltas = getDragDeltas();

    switch (mode) {
      case CanvasMode.PANNING:
        setViewBox(updatePanning(canvasState.viewBox, dragDeltas));
        break;
      case CanvasMode.DRAWING:
        const dragPoints = getDragPoints();
        setTempRectangle(updateRectDrawing(dragPoints));
        break;
      case CanvasMode.MOVING:
        if (getSelectedElement()) updateRectPosition(dragDeltas);
        break;
      case CanvasMode.RESIZING:
        updateRectSize(dragDeltas);
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    if (
      getMode() === CanvasMode.DRAWING &&
      canvasState.tempRect &&
      canvasState.tempRect.width > 0 &&
      canvasState.tempRect.height > 0
    ) {
      createElement(canvasState.tempRect);
    }

    setMode(CanvasMode.DEFAULT);
    setTempRectangle(null);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    setViewBox({
      ...canvasState.viewBox,
      width: canvasState.viewBox.width * (e.deltaY > 0 ? 1.1 : 0.9),
      height: canvasState.viewBox.height * (e.deltaY > 0 ? 1.1 : 0.9),
    });
  };

  return (
    <svg
      ref={canvasRef}
      width={width}
      height={height}
      viewBox={`${canvasState.viewBox.x} ${canvasState.viewBox.y} ${canvasState.viewBox.width} ${canvasState.viewBox.height}`}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        if (e.button === RIGHT_CLICK_BUTTON_CODE)
          handleMouseDown(e, CanvasMode.PANNING);
        else if (e.button === LEFT_CLICK_BUTTON_CODE) {
          unselectElement();
          handleMouseDown(e, CanvasMode.DRAWING);
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
      <GridPattern cellSize={cellSize} viewBox={canvasState.viewBox} />
      <g>
        {(() => {
          const selectedElement = getSelectedElement();

          return getElements().map((element) => (
            <g key={element.id}>
              <rect
                x={element.rectangle.x}
                y={element.rectangle.y}
                width={element.rectangle.width}
                height={element.rectangle.height}
                fill={
                  selectedElement?.id === element.id
                    ? SELECTED_RECT_FILL
                    : DEFAULT_RECT_FILL
                }
                stroke={
                  selectedElement?.id === element.id
                    ? SELECTED_RECT_STROKE
                    : DEFAULT_RECT_STROKE
                }
                onMouseDown={(e) => {
                  if (e.button === LEFT_CLICK_BUTTON_CODE) {
                    e.stopPropagation();
                    selectElement(element);
                    handleMouseDown(e, CanvasMode.MOVING);
                  }
                }}
                style={{ cursor: "move" }}
              />
              {selectedElement?.id === element.id && (
                <ResizeHandles
                  rectangle={element.rectangle}
                  onMouseDown={(e, direction) => {
                    e.stopPropagation();
                    selectElement(element);
                    setResizeDirection(direction);
                    handleMouseDown(e, CanvasMode.RESIZING);
                  }}
                />
              )}
            </g>
          ));
        })()}
      </g>

      {getMode() === CanvasMode.DRAWING && canvasState.tempRect && (
        <rect
          x={canvasState.tempRect.x}
          y={canvasState.tempRect.y}
          width={canvasState.tempRect.width}
          height={canvasState.tempRect.height}
          fill={SELECTED_RECT_FILL}
          stroke={SELECTED_RECT_STROKE}
          strokeWidth="1"
        />
      )}
    </svg>
  );
};

export default GridCanvas;
