import { Vector2Type } from "@/types/canvas";
import { RefObject, useCallback, useRef } from "react";

interface UseGridMouseProps {
  ref: RefObject<SVGSVGElement>;
  gridSize?: number;
}

export function useMouse({ ref, gridSize }: UseGridMouseProps) {
  const dragPointsRef = useRef({
    start: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });

  const snapToGrid = useCallback(
    (value: number) =>
      gridSize ? Math.round(value / gridSize) * gridSize : value,
    [gridSize]
  );

  const getMousePosition = useCallback(
    (
      e: React.MouseEvent<SVGSVGElement | SVGRectElement, MouseEvent>,
      withSnap: boolean = true
    ) => {
      if (!ref.current) return;

      const point = ref.current.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;

      const ctm = ref.current.getScreenCTM();

      if (!ctm) return;

      const transformedPoint = point.matrixTransform(ctm.inverse());

      return {
        x: withSnap ? snapToGrid(transformedPoint.x) : transformedPoint.x,
        y: withSnap ? snapToGrid(transformedPoint.y) : transformedPoint.y,
      };
    },
    [ref, snapToGrid]
  );

  const getDragPoints = useCallback(() => {
    return dragPointsRef.current;
  }, []);

  const setDragPoints = useCallback(
    ({ start, end }: { start?: Vector2Type; end?: Vector2Type }) => {
      if (start) {
        dragPointsRef.current.start = start;
        dragPointsRef.current.current = start;
      }
      if (end) dragPointsRef.current.end = end;
    },
    []
  );

  const getDragDeltas = useCallback(() => {
    return {
      x: dragPointsRef.current.end.x - dragPointsRef.current.start.x,
      y: dragPointsRef.current.end.y - dragPointsRef.current.start.y,
    };
  }, []);

  const getUpdatedDragDeltas = useCallback(() => {
    const deltas = {
      x: dragPointsRef.current.end.x - dragPointsRef.current.current.x,
      y: dragPointsRef.current.end.y - dragPointsRef.current.current.y,
    };

    if (deltas.x !== 0 || deltas.y !== 0)
      dragPointsRef.current.current = dragPointsRef.current.end;

    return deltas;
  }, []);

  const isOnDifferentGridCell = useCallback((position: Vector2Type) => {
    return (
      dragPointsRef.current.end.x !== position.x ||
      dragPointsRef.current.end.y !== position.y
    );
  }, []);

  return {
    getMousePosition,
    getDragPoints,
    setDragPoints,
    getDragDeltas,
    getUpdatedDragDeltas,
    isOnDifferentGridCell,
  };
}
