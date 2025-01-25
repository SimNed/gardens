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
  const { getSelectedRectangle, updateRectangle } = useGridContext();

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
      const selectedRectangle = getSelectedRectangle();

      if (!selectedRectangle) return;

      const targetX = snapToGrid(selectedRectangle.x + dragDeltas.x, cellSize);
      const targetY = snapToGrid(selectedRectangle.y + dragDeltas.y, cellSize);

      if (targetX !== selectedRectangle.x || targetY !== selectedRectangle.y) {
        const updatedRectangle = {
          ...selectedRectangle,
          x: targetX,
          y: targetY,
        };
        updateRectangle(updatedRectangle);
      }
    },
    [cellSize, getSelectedRectangle, updateRectangle]
  );

  const updateRectDrawing = useCallback((dragPoints: DragPointType) => {
    return {
      id: Date.now(),
      x: Math.min(dragPoints.origin.x, dragPoints.current.x),
      y: Math.min(dragPoints.origin.y, dragPoints.current.y),
      width: Math.abs(dragPoints.current.x - dragPoints.origin.x),
      height: Math.abs(dragPoints.current.y - dragPoints.origin.y),
    };
  }, []);

  // const updateRectSize = useCallback(
  //   (dragDeltas: Vector2Type) => {
  //     const resizeDirection = resizeDirectionRef.current;

  //     if (!resizeDirection || !gridState.selectedRect) return;

  //     const tempRect = { ...gridState.selectedRect };

  //     if (resizeDirection.includes("right")) {
  //       tempRect.width = Math.max(
  //         cellSize,
  //         gridState.selectedRect.width + dragDeltas.x
  //       );
  //     }
  //     if (resizeDirection.includes("left")) {
  //       const newWidth = gridState.selectedRect.width - dragDeltas.x;
  //       if (newWidth >= cellSize) {
  //         tempRect.x = gridState.selectedRect.x + dragDeltas.x;
  //         tempRect.width = newWidth;
  //       }
  //     }
  //     if (resizeDirection.includes("bottom")) {
  //       tempRect.height = Math.max(
  //         cellSize,
  //         gridState.selectedRect.height + dragDeltas.y
  //       );
  //     }
  //     if (resizeDirection.includes("top")) {
  //       const newHeight = gridState.selectedRect.height - dragDeltas.y;
  //       if (newHeight >= cellSize) {
  //         tempRect.y = gridState.selectedRect.y + dragDeltas.y;
  //         tempRect.height = newHeight;
  //       }
  //     }

  //     const updatedRects = gridState.rectangles.map((rect) =>
  //       rect.id === (gridState.selectedRect && gridState.selectedRect.id)
  //         ? tempRect
  //         : rect
  //     );

  //     setGridState({ ...gridState, rectangles: updatedRects });
  //   },
  //   [cellSize, gridState]
  // );

  const snapToGrid = (value: number, gridSize: number) =>
    Math.round(value / gridSize) * gridSize;

  return {
    getMousePositionInGrid,
    snapToGrid,
    updatePanning,
    updateRectPosition,
    updateRectDrawing,
  };
};

export default useGrid;
