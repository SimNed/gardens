import { RefObject, useCallback, useEffect, useReducer, useRef } from "react";
import { RectangleType, Vector2Type } from "@/types/canvas";
import canvasReducer, { CanvasState } from "./reducer";
import { useMouse } from "../use-canvas-mouse";

interface UseCanvasProps {
  canvasRef: RefObject<SVGSVGElement>;
  gridSize: number;
  onRectangleCreate: (rectangle: RectangleType) => void;
  onRectangleUpdate: (rectangle: RectangleType) => void;
}

export enum CanvasMode {
  DEFAULT,
  PANNING,
  DRAWING,
  MOVING,
  RESIZING,
}

export function useCanvas({
  canvasRef,
  gridSize,
  onRectangleUpdate,
  onRectangleCreate,
}: UseCanvasProps) {
  const initialState: CanvasState = {
    viewBox: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    } as RectangleType,
    tempRectangle: null,
    zoomLevel: 1,
  };

  const [state, dispatch] = useReducer(canvasReducer, initialState);

  const modeRef = useRef<CanvasMode>(CanvasMode.DEFAULT);
  const resizeDirectionRef = useRef<Vector2Type | null>(null);

  const {
    getDragPoints,
    setDragPoints,
    getDragDeltas,
    getUpdatedDragDeltas,
    getMousePosition,
    isOnDifferentGridCell,
  } = useMouse({
    ref: canvasRef,
    gridSize,
  });

  useEffect(() => {
    if (canvasRef.current)
      dispatch({ type: "init_view_box", canvas: canvasRef.current });
  }, [canvasRef]);

  const handleMouseDown = (
    e: React.MouseEvent<SVGRectElement | SVGSVGElement, MouseEvent>,
    mode: CanvasMode
  ) => {
    e.preventDefault();

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return;

    setDragPoints({
      start: mousePosition,
      end: mousePosition,
    });

    modeRef.current = mode;
  };

  const handleMouseMove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    rectangle?: RectangleType
  ) => {
    if (modeRef.current === CanvasMode.DEFAULT) return;

    const mousePosition = getMousePosition(e);

    if (!mousePosition || !isOnDifferentGridCell(mousePosition)) return;

    setDragPoints({ end: mousePosition });

    const updatedDragDeltas = getUpdatedDragDeltas();

    switch (modeRef.current) {
      case CanvasMode.PANNING:
        dispatch({ type: "update_panning", dragDeltas: getDragDeltas() });
        break;
      case CanvasMode.DRAWING:
        dispatch({
          type: "update_temp_rectangle",
          dragPoints: getDragPoints(),
        });
        break;
      case CanvasMode.MOVING:
        if (rectangle) {
          const updatedRect = updateRectPosition(rectangle, updatedDragDeltas);
          onRectangleUpdate(updatedRect);
        }
        break;
      case CanvasMode.RESIZING:
        if (rectangle) {
          const updatedRect = updateRectSize(rectangle, updatedDragDeltas);
          onRectangleUpdate(updatedRect);
        }
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    if (
      modeRef.current === CanvasMode.DRAWING &&
      state.tempRectangle &&
      state.tempRectangle.width > 0 &&
      state.tempRectangle.height > 0
    ) {
      onRectangleCreate(state.tempRectangle);
    }

    modeRef.current = CanvasMode.DEFAULT;
    dispatch({ type: "reset_temp_rectangle" });
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (modeRef.current !== CanvasMode.DEFAULT) return;
    dispatch({
      type: "update_zoom_factor",
      factor: e.deltaY,
      position: getMousePosition(e) || { x: 0, y: 0 },
    });
  };

  const updateRectPosition = (
    rectangle: RectangleType,
    dragDeltas: Vector2Type
  ) => {
    if (dragDeltas.x === 0 && dragDeltas.y === 0) return rectangle;

    const targetX = rectangle.x + dragDeltas.x;
    const targetY = rectangle.y + dragDeltas.y;

    return {
      ...rectangle,
      x: targetX,
      y: targetY,
    };
  };

  const updateRectSize = useCallback(
    (rectangle: RectangleType, dragDeltas: Vector2Type) => {
      const direction = resizeDirectionRef.current;

      if (!direction) return rectangle;

      const tempRectangle = { ...rectangle };

      if (direction.x === 1) {
        const newWidth = rectangle.width + dragDeltas.x;
        tempRectangle.width = Math.max(gridSize, newWidth);
      }
      if (direction.x === -1) {
        const newWidth = rectangle.width - dragDeltas.x;
        if (newWidth >= gridSize) {
          tempRectangle.x = rectangle.x + dragDeltas.x;
          tempRectangle.width = newWidth;
        }
      }
      if (direction.y === 1) {
        const newHeight = rectangle.height + dragDeltas.y;
        tempRectangle.height = Math.max(gridSize, newHeight);
      }
      if (direction.y === -1) {
        const newHeight = rectangle.height - dragDeltas.y;
        if (newHeight >= gridSize) {
          tempRectangle.y = rectangle.y + dragDeltas.y;
          tempRectangle.height = newHeight;
        }
      }

      return tempRectangle;
    },
    [gridSize]
  );

  return {
    state,
    mode: modeRef.current,
    dragPoints: getDragPoints(),

    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,

    setResizeDirection: (direction: Vector2Type) =>
      (resizeDirectionRef.current = direction),
  };
}
