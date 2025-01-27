"use client";

import useGridMouse from "@/lib/hooks/use-mouse";
import React, { useRef } from "react";
import ResizeHandles from "./ResizeHandles";
import {
  DEFAULT_RECT_FILL,
  DEFAULT_RECT_STROKE,
  HOVER_RECT_FILL,
  LEFT_CLICK_BUTTON_CODE,
  RIGHT_CLICK_BUTTON_CODE,
  SELECTED_RECT_FILL,
} from "@/lib/utils/canvas";
import GridPattern from "./GridPattern";
import useCanvas, { CanvasMode } from "@/lib/hooks/use-canvas";
import { useAssistantContext } from "../AssistantContext";
import DimensionsTooltip from "./DimensionsTooltip";
import { Vector2Type } from "@/types/canvas";

interface CanvasProps {
  cellSize: number;
}

const AssistantCanvas = ({ cellSize }: CanvasProps) => {
  const canvasRef = useRef(null);
  const startDragPointRef = useRef<Vector2Type | null>(null);

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
    setZoomFactor,
    getMousePositionInCanvas,
    updatePanning,
    updateRectPosition,
    updateRectDrawing,
    updateRectSize,
  } = useCanvas({
    canvasRef: canvasRef,
    cellSize: cellSize,
  });

  const {
    getElements,
    createElement,
    selectElement,
    unselectElement,
    hoverElement,
    unhoverElement,
    getSelectedElement,
    getHoveredElement,
  } = useAssistantContext();

  const handleMouseDown = (
    e: React.MouseEvent<SVGRectElement | SVGSVGElement, MouseEvent>,
    mode: CanvasMode
  ) => {
    e.preventDefault();

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return;

    startDragPointRef.current = { x: e.clientX, y: e.clientY };

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
    setZoomFactor(e.deltaY);
  };

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
                  rx={16}
                  width={element.rectangle.width}
                  height={element.rectangle.height}
                  fill={
                    selectedElement?.id === element.id
                      ? SELECTED_RECT_FILL
                      : getHoveredElement()?.id === element.id
                      ? HOVER_RECT_FILL
                      : DEFAULT_RECT_FILL
                  }
                  stroke={
                    selectedElement?.id === element.id
                      ? "none"
                      : DEFAULT_RECT_STROKE
                  }
                  strokeWidth={0.5}
                  onMouseDown={(e) => {
                    if (e.button === LEFT_CLICK_BUTTON_CODE) {
                      e.stopPropagation();
                      selectElement(element);
                      handleMouseDown(e, CanvasMode.MOVING);
                    }
                  }}
                  onMouseEnter={() => {
                    if (getMode() === CanvasMode.DEFAULT) hoverElement(element);
                  }}
                  onMouseLeave={() => unhoverElement()}
                  className="cursor-move"
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
          <>
            <rect
              x={canvasState.tempRect.x}
              y={canvasState.tempRect.y}
              width={canvasState.tempRect.width}
              height={canvasState.tempRect.height}
              fill={SELECTED_RECT_FILL}
            />
          </>
        )}
      </svg>
      {canvasState.tempRect && startDragPointRef.current && (
        <DimensionsTooltip
          position={{
            x: startDragPointRef.current.x,
            y: startDragPointRef.current.y,
          }}
          width={canvasState.tempRect.width / cellSize}
          height={canvasState.tempRect.height / cellSize}
        />
      )}
    </>
  );
};

export default AssistantCanvas;
