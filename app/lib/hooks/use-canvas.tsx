import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { DragPointType, RectangleType, Vector2Type } from "@/types/canvas";
import { useAssistantContext } from "@/app/assistant/context";
import { DirectionVariantType } from "@/types/variant";

interface UseCanvasProps {
  canvasRef: RefObject<SVGSVGElement>;
  cellSize: number;
}

export enum CanvasMode {
  DEFAULT,
  PANNING,
  DRAWING,
  MOVING,
  RESIZING,
}

interface CanvasStateProps {
  viewBox: RectangleType;
  tempRect: RectangleType | null;
}

const useCanvas = ({ canvasRef, cellSize }: UseCanvasProps) => {
  const { state, updateElement } = useAssistantContext();

  const [canvasState, setCanvasState] = useState<CanvasStateProps>({
    viewBox: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    tempRect: null,
  });

  const modeRef = useRef<CanvasMode>(CanvasMode.DEFAULT);
  const resizeDirectionRef = useRef<DirectionVariantType | null>(null);

  useEffect(() => {
    if (canvasRef.current)
      setCanvasState((prev) => ({
        ...prev,
        viewBox: {
          ...prev.viewBox,
          width: canvasRef.current!.width.baseVal.value,
          height: canvasRef.current!.height.baseVal.value,
        },
      }));
  }, [canvasRef]);

  const setViewBox = (viewBox: RectangleType) => {
    setCanvasState((prev) => ({ ...prev, viewBox }));
  };

  const setTempRectangle = (tempRect: RectangleType | null) => {
    setCanvasState((prev) => ({ ...prev, tempRect }));
  };

  const getMode = () => {
    return modeRef.current;
  };

  const setMode = (mode: CanvasMode) => {
    modeRef.current = mode;
  };

  const setResizeDirection = (direction: DirectionVariantType | null) => {
    resizeDirectionRef.current = direction;
  };

  const setZoomFactor = (zoomFactor: number) => {
    const normalizedZoomFactor = zoomFactor > 0 ? 1.1 : 0.9;
    setCanvasState((prev) => ({
      ...prev,
      viewBox: {
        ...prev.viewBox,
        width: canvasState.viewBox.width * normalizedZoomFactor,
        height: canvasState.viewBox.height * normalizedZoomFactor,
      },
    }));
  };

  const getMousePositionInCanvas = (mousePosition: Vector2Type) => {
    return {
      x: snapToGrid(mousePosition.x, cellSize),
      y: snapToGrid(mousePosition.y, cellSize),
    };
  };

  const updatePanning = useCallback(
    (viewBox: RectangleType, dragDeltas: Vector2Type) => {
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
      const selectedElement = state.selectedElement;

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
    [cellSize, updateElement]
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
      const selectedElement = state.selectedElement;
      const resizeDirection = resizeDirectionRef.current;

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

      updateElement({ ...selectedElement, rectangle: tempRect });
    },
    [cellSize, updateElement]
  );

  const snapToGrid = (value: number, gridSize: number) =>
    Math.round(value / gridSize) * gridSize;

  return {
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
  };
};

export default useCanvas;
