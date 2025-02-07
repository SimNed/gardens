"use client";

import React, { useRef } from "react";
import ResizeHandles from "./ResizeHandles";
import {
  DEFAULT_RECT_FILL,
  DEFAULT_RECT_STROKE,
  HOVER_RECT_FILL,
  LEFT_CLICK_BUTTON_CODE,
  RIGHT_CLICK_BUTTON_CODE,
  SELECTED_RECT_FILL,
} from "@/app/lib/utils/canvas";
import GridPattern from "./GridPattern";
import { useAssistantContext } from "../../context";
import DimensionsTooltip from "./DimensionsTooltip";
import { CanvasMode, useCanvas } from "@/app/lib/hooks/use-canvas/use-canvas";
import { RectangleType } from "@/types/canvas";

interface CanvasProps {
  cellSize: number;
}

export default function AssistantCanvas({ cellSize }: CanvasProps) {
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
    onRectangleUpdate: (rectangle: RectangleType) => {
      if (state.selectedElement)
        updateElement({ ...state.selectedElement, rectangle });
    },
    onRectangleCreate: (rectangle: RectangleType) => {
      createElement(rectangle);
    },
  });

  const {
    state,
    createElement,
    selectElement,
    unselectElement,
    hoverElement,
    unhoverElement,
    updateElement,
  } = useAssistantContext();

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
        onMouseMove={(e) =>
          handleMouseMove(e, state.selectedElement?.rectangle)
        }
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
            const selectedElement = state.selectedElement;

            return state.elements.map((element) => (
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
                      : state.hoveredElement?.id === element.id
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
                    if (mode === CanvasMode.DEFAULT) hoverElement(element);
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
