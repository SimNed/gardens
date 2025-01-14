import { RefObject, useCallback, useRef, useState } from "react";
import { GridMode } from "@/app/assistant/components/GridCanvas";
import { DirectionVariantType } from "@/types/variant";
import { DragPointType, RectangleType, Vector2Type } from "@/types/grid";

interface UseGridMouseProps {
  gridRef: RefObject<SVGSVGElement>;
  divisions: number;
}

const useGrid = ({ divisions }: UseGridMouseProps) => {
  const [gridState, setGridState] = useState({
    viewBox: {
      x: 0,
      y: 0,
      width: 400,
      height: 400,
    },
    mode: GridMode.DEFAULT,
    rectangles: [],
    resizeDirectionRef: useRef<DirectionVariantType | null>(null),
  });

  const [rectangles, setRectangles] = useState<RectangleType[]>([]);
  const [selectedRect, setSelectedRect] = useState<RectangleType | null>(null);
  const [tempRect, setTempRect] = useState<RectangleType | null>(null);

  const resizeDirectionRef = useRef<DirectionVariantType | null>(null);

  const setResizeDirection = (direction: DirectionVariantType | null) => {
    resizeDirectionRef.current = direction;
  };

  const getMousePositionInGrid = (mousePosition: Vector2Type) => {
    return {
      x: snapToGrid(mousePosition.x, divisions),
      y: snapToGrid(mousePosition.y, divisions),
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
    [gridState]
  );

  const updateRectPosition = (dragDeltas: Vector2Type) => {
    const updatedRects = rectangles.map((rect) =>
      rect.id === selectedRect?.id
        ? {
            ...rect,
            x: snapToGrid(selectedRect!.x + dragDeltas.x, divisions),
            y: snapToGrid(selectedRect!.y + dragDeltas.y, divisions),
          }
        : rect
    );

    setRectangles(updatedRects);
  };

  const updateRectDrawing = (dragPoints: DragPointType) => {
    setTempRect({
      id: Date.now(),
      x: Math.min(dragPoints.origin.x, dragPoints.current.x),
      y: Math.min(dragPoints.origin.y, dragPoints.current.y),
      width: Math.abs(dragPoints.current.x - dragPoints.origin.x),
      height: Math.abs(dragPoints.current.y - dragPoints.origin.y),
    });
  };

  const updateRectSize = useCallback(
    (dragDeltas: Vector2Type) => {
      const resizeDirection = resizeDirectionRef.current;

      if (!resizeDirection || !selectedRect) return;

      const tempRect = { ...selectedRect };

      if (resizeDirection.includes("right")) {
        tempRect.width = Math.max(divisions, selectedRect.width + dragDeltas.x);
      }
      if (resizeDirection.includes("left")) {
        const newWidth = selectedRect.width - dragDeltas.x;
        if (newWidth >= divisions) {
          tempRect.x = selectedRect.x + dragDeltas.x;
          tempRect.width = newWidth;
        }
      }
      if (resizeDirection.includes("bottom")) {
        tempRect.height = Math.max(
          divisions,
          selectedRect.height + dragDeltas.y
        );
      }
      if (resizeDirection.includes("top")) {
        const newHeight = selectedRect.height - dragDeltas.y;
        if (newHeight >= divisions) {
          tempRect.y = selectedRect.y + dragDeltas.y;
          tempRect.height = newHeight;
        }
      }

      const updatedRects = rectangles.map((rect) =>
        rect.id === selectedRect.id ? tempRect : rect
      );

      setRectangles(updatedRects);
      // setSelectedRect(tempRect);
    },
    [divisions, rectangles, selectedRect]
  );

  const snapToGrid = (value: number, gridSize: number) =>
    Math.round(value / gridSize) * gridSize;

  return {
    getMousePositionInGrid,
    snapToGrid,
    updatePanning,
    getViewBoxString,
    setResizeDirection,
    updateRectPosition,
    updateRectDrawing,
    rectangles,
    setRectangles,
    selectedRect,
    setSelectedRect,
    tempRect,
    setTempRect,
    updateRectSize,
    gridState,
    setGridState,
  };
};

export default useGrid;
