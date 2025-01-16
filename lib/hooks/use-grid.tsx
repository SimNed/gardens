import { useCallback, useRef, useState } from "react";
import { DragPointType, RectangleType, Vector2Type } from "@/types/grid";
import { DirectionVariantType } from "@/types/variant";

export enum GridMode {
  DEFAULT,
  PANNING,
  DRAWING,
  MOVING,
  RESIZING,
}

interface UseGridProps {
  rectangles: RectangleType[];
  selectedRectangle: RectangleType | null;
  cellSize: number;
  handleRectangles: (rectangles: RectangleType[]) => void;
  handleSelectedRectangle: (rectangles: RectangleType[]) => void;
}

export interface GridStateProps {
  viewBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  mode: GridMode;
  tempRect: RectangleType | null;
}

const useGrid = ({
  cellSize,
  rectangles,
  selectedRectangle,
  handleRectangles,
}: UseGridProps) => {
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

  const resizeDirectionRef = useRef<DirectionVariantType | null>(null);

  const getMousePositionInGrid = (mousePosition: Vector2Type) => {
    return {
      x: snapToGrid(mousePosition.x, cellSize),
      y: snapToGrid(mousePosition.y, cellSize),
    };
  };

  const getViewBoxString = () => {
    return `${gridState.viewBox.x} ${gridState.viewBox.y} ${gridState.viewBox.width} ${gridState.viewBox.height}`;
  };

  const updatePanning = useCallback(
    (dragDeltas: Vector2Type) => {
      setGridState({
        ...gridState,
        viewBox: {
          ...gridState.viewBox,
          x: gridState.viewBox.x - dragDeltas.x,
          y: gridState.viewBox.y - dragDeltas.y,
        },
      });
    },
    [gridState, setGridState]
  );

  const updateRectPosition = useCallback(
    (dragDeltas: Vector2Type) => {
      const updatedRects = rectangles.map((rect) =>
        rect.id === selectedRectangle?.id
          ? {
              ...rect,
              x: snapToGrid(selectedRectangle!.x + dragDeltas.x, cellSize),
              y: snapToGrid(selectedRectangle!.y + dragDeltas.y, cellSize),
            }
          : rect
      );

      handleRectangles(updatedRects);
    },
    [cellSize, handleRectangles, rectangles, selectedRectangle]
  );

  const updateRectDrawing = useCallback(
    (dragPoints: DragPointType) => {
      setGridState({
        ...gridState,
        tempRect: {
          id: Date.now(),
          x: Math.min(dragPoints.origin.x, dragPoints.current.x),
          y: Math.min(dragPoints.origin.y, dragPoints.current.y),
          width: Math.abs(dragPoints.current.x - dragPoints.origin.x),
          height: Math.abs(dragPoints.current.y - dragPoints.origin.y),
        },
      });
    },
    [gridState, setGridState]
  );

  const updateRectSize = useCallback(
    (dragDeltas: Vector2Type) => {
      const resizeDirection = resizeDirectionRef.current;

      if (!resizeDirection || !selectedRectangle) return;

      const tempRect = { ...selectedRectangle };

      if (resizeDirection.includes("right")) {
        tempRect.width = Math.max(
          cellSize,
          selectedRectangle.width + dragDeltas.x
        );
      }
      if (resizeDirection.includes("left")) {
        const newWidth = selectedRectangle.width - dragDeltas.x;
        if (newWidth >= cellSize) {
          tempRect.x = selectedRectangle.x + dragDeltas.x;
          tempRect.width = newWidth;
        }
      }
      if (resizeDirection.includes("bottom")) {
        tempRect.height = Math.max(
          cellSize,
          selectedRectangle.height + dragDeltas.y
        );
      }
      if (resizeDirection.includes("top")) {
        const newHeight = selectedRectangle.height - dragDeltas.y;
        if (newHeight >= cellSize) {
          tempRect.y = selectedRectangle.y + dragDeltas.y;
          tempRect.height = newHeight;
        }
      }

      const updatedRects = rectangles.map((rect) =>
        rect.id === (selectedRectangle && selectedRectangle.id)
          ? tempRect
          : rect
      );

      handleRectangles(updatedRects);
    },
    [cellSize, handleRectangles, rectangles, selectedRectangle]
  );

  const snapToGrid = (value: number, gridSize: number) =>
    Math.round(value / gridSize) * gridSize;

  return {
    gridState,
    setGridState,
    snapToGrid,
    getMousePositionInGrid,
    getViewBoxString,
    updatePanning,
    updateRectPosition,
    updateRectDrawing,
    updateRectSize,
  };
};

export default useGrid;
