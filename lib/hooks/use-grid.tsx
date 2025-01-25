import { RefObject, useCallback } from "react";
import { DragPointType, Vector2Type, ViewBoxType } from "@/types/grid";
import { useGridContext } from "@/app/assistant/components/Grid/GridContext";

interface UseGridProps {
  gridRef: RefObject<SVGSVGElement>;
  width: number;
  height: number;
  cellSize: number;
}

export enum GridMode {
  DEFAULT,
  PANNING,
  DRAWING,
  MOVING,
  RESIZING,
}

const useGrid = ({ cellSize }: UseGridProps) => {
  const { getSelectedElement, updateElement } = useGridContext();

  // const setResizeDirection = (direction: DirectionVariantType | null) => {
  //   resizeDirectionRef.current = direction;
  // };

  const getMousePositionInGrid = (mousePosition: Vector2Type) => {
    return {
      x: snapToGrid(mousePosition.x, cellSize),
      y: snapToGrid(mousePosition.y, cellSize),
    };
  };

  const updatePanning = useCallback(
    (viewBox: ViewBoxType, dragDeltas: Vector2Type) => {
      return {
        ...viewBox,
        x: viewBox.x - dragDeltas.x,
        y: viewBox.y - dragDeltas.y,
      };
    },
    []
  );

  const updateRectPosition = useCallback(
    (dragDeltas: Vector2Type) => {
      const selectedElement = getSelectedElement();

      if (!selectedElement) return;

      const targetX = snapToGrid(
        selectedElement.rectangle.x + dragDeltas.x,
        cellSize
      );
      const targetY = snapToGrid(
        selectedElement.rectangle.y + dragDeltas.y,
        cellSize
      );

      if (
        targetX !== selectedElement.rectangle.x ||
        targetY !== selectedElement.rectangle.y
      ) {
        const updatedRectangle = {
          ...selectedElement.rectangle,
          x: targetX,
          y: targetY,
        };
        updateElement({ ...selectedElement, rectangle: updatedRectangle });
      }
    },
    [cellSize, getSelectedElement, updateElement]
  );

  const updateRectDrawing = useCallback((dragPoints: DragPointType) => {
    return {
      x: Math.min(dragPoints.origin.x, dragPoints.current.x),
      y: Math.min(dragPoints.origin.y, dragPoints.current.y),
      width: Math.abs(dragPoints.current.x - dragPoints.origin.x),
      height: Math.abs(dragPoints.current.y - dragPoints.origin.y),
    };
  }, []);

  const updateRectSize = useCallback(
    (dragDeltas: Vector2Type) => {
      // const resizeDirection = resizeDirectionRef.current;
      const selectedElement = getSelectedElement();
      const resizeDirection = "top";

      if (!resizeDirection || !selectedElement) return;

      const tempRect = { ...selectedElement.rectangle };

      if (resizeDirection.includes("right")) {
        tempRect.width = Math.max(
          cellSize,
          selectedElement.rectangle.width + dragDeltas.x
        );
      }
      if (resizeDirection.includes("left")) {
        const newWidth = selectedElement.rectangle.width - dragDeltas.x;
        if (newWidth >= cellSize) {
          tempRect.x = selectedElement.rectangle.x + dragDeltas.x;
          tempRect.width = newWidth;
        }
      }
      if (resizeDirection.includes("bottom")) {
        tempRect.height = Math.max(
          cellSize,
          selectedElement.rectangle.height + dragDeltas.y
        );
      }
      if (resizeDirection.includes("top")) {
        const newHeight = selectedElement.rectangle.height - dragDeltas.y;
        if (newHeight >= cellSize) {
          tempRect.y = selectedElement.rectangle.y + dragDeltas.y;
          tempRect.height = newHeight;
        }
      }

      // const updatedRects = gridState.rectangles.map((rect) =>
      //   rect.id === (gridState.selectedRect && gridState.selectedRect.id)
      //     ? tempRect
      //     : rect
      // );

      updateElement({ ...selectedElement, rectangle: tempRect });
    },
    [cellSize, getSelectedElement, updateElement]
  );

  const snapToGrid = (value: number, gridSize: number) =>
    Math.round(value / gridSize) * gridSize;

  return {
    getMousePositionInGrid,
    snapToGrid,
    updatePanning,
    updateRectPosition,
    updateRectDrawing,
    updateRectSize,
  };
};

export default useGrid;
