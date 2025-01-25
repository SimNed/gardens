"use client";

import useGridMouse from "@/lib/hooks/use-mouse";
import React, { useRef } from "react";
import ResizeHandles from "./ResizeHandles";
import { RIGHT_CLICK_BUTTON_CODE } from "@/lib/utils/grid";
import GridPattern from "./GridPattern";
import useGridCanvas, { CanvasMode } from "@/lib/hooks/use-canvas";
import { useGridContext } from "./GridContext";

interface CanvasProps {
  width?: number;
  height?: number;
  cellSize?: number;
  onCreateShape: (shapeId: number) => void;
}

const GridCanvas = ({
  cellSize = 20,
  width = 800,
  height = 600,
}: CanvasProps) => {
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
      width="800"
      height="600"
      viewBox={`${canvasState.viewBox.x} ${canvasState.viewBox.y} ${canvasState.viewBox.width} ${canvasState.viewBox.height}`}
      className="bg-white"
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        if (e.button === RIGHT_CLICK_BUTTON_CODE)
          handleMouseDown(e, CanvasMode.PANNING);
        else {
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
                    ? "rgba(0, 100, 255, 0.4)"
                    : "rgba(0, 100, 255, 0.2)"
                }
                stroke={
                  selectedElement?.id === element.id ? "rgb(0, 0, 255)" : "blue"
                }
                onMouseDown={(e) => {
                  e.stopPropagation();
                  selectElement(element);
                  handleMouseDown(e, CanvasMode.MOVING);
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
          fill="rgba(0, 100, 255, 0.3)"
          stroke="blue"
          strokeWidth="1"
        />
      )}
    </svg>
  );
};

export default GridCanvas;
