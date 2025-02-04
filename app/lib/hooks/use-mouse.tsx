import { Vector2Type } from "@/types/canvas";
import { RefObject, useRef } from "react";

interface UseGridMouseProps {
  ref: RefObject<SVGSVGElement>;
}

const useMouse = ({ ref }: UseGridMouseProps) => {
  const getMousePosition = (
    e: React.MouseEvent<SVGSVGElement | SVGRectElement, MouseEvent>
  ) => {
    if (!ref.current) return;

    const point = ref.current.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;

    const ctm = ref.current.getScreenCTM();

    if (!ctm) return;

    const transformedPoint = point.matrixTransform(ctm.inverse());

    return {
      x: transformedPoint.x,
      y: transformedPoint.y,
    };
  };

  const dragPointsRef = useRef({
    origin: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
  });

  const getDragPoints = () => {
    return dragPointsRef.current;
  };

  const setDragPoints = ({
    origin,
    current,
  }: {
    origin?: Vector2Type;
    current?: Vector2Type;
  }) => {
    if (origin) dragPointsRef.current.origin = origin;
    if (current) dragPointsRef.current.current = current;
  };

  const getDragDeltas = () => {
    return {
      x: dragPointsRef.current.current.x - dragPointsRef.current.origin.x,
      y: dragPointsRef.current.current.y - dragPointsRef.current.origin.y,
    };
  };

  return {
    getMousePosition,
    getDragPoints,
    setDragPoints,
    getDragDeltas,
  };
};

export default useMouse;
