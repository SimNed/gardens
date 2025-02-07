import { RefObject, useCallback, useEffect, useReducer, useRef } from "react";
import { RectangleType, Vector2Type } from "@/types/canvas";
import { DirectionVariantType } from "@/types/variant";
import canvasReducer, { CanvasState } from "./reducer";
import { useMouse } from "../use-mouse";

interface UseCanvasProps {
  canvasRef: RefObject<SVGSVGElement>;
  cellSize: number;
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
  cellSize,
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
  };

  const [state, dispatch] = useReducer(canvasReducer, initialState);

  const modeRef = useRef<CanvasMode>(CanvasMode.DEFAULT);
  const resizeDirectionRef = useRef<DirectionVariantType | null>(null);
  const startDragPointRef = useRef<Vector2Type | null>(null);

  const { getDragPoints, setDragPoints, getDragDeltas, getMousePosition } =
    useMouse({
      ref: canvasRef,
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

    // canvasRef.current?.onmousedown

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return;

    startDragPointRef.current = { x: e.clientX, y: e.clientY };

    const mousePositionInGrid = getMousePositionInCanvas(mousePosition);
    if (!mousePositionInGrid) return;

    setDragPoints({
      origin: mousePositionInGrid,
      current: mousePositionInGrid,
    });

    modeRef.current = mode;
  };

  const handleMouseMove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    rectangle?: RectangleType
  ) => {
    const mode = modeRef.current;

    if (mode === CanvasMode.DEFAULT) return;

    const mousePosition = getMousePosition(e);

    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInCanvas(mousePosition);

    setDragPoints({ current: mousePositionInGrid });

    const dragDeltas = getDragDeltas();

    switch (mode) {
      case CanvasMode.PANNING:
        dispatch({ type: "update_panning", dragDeltas });
        break;
      case CanvasMode.DRAWING:
        dispatch({
          type: "update_temp_rectangle",
          dragPoints: getDragPoints(),
        });
        break;
      case CanvasMode.MOVING:
        if (rectangle) {
          const updatedRect = updateRectPosition(rectangle, dragDeltas);
          onRectangleUpdate(updatedRect);
        }
        break;
      case CanvasMode.RESIZING:
        if (rectangle) {
          const updatedRect = updateRectSize(rectangle, dragDeltas);
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
    dispatch({ type: "update_zoom_factor", factor: e.deltaY });
  };

  const getMousePositionInCanvas = (mousePosition: Vector2Type) => {
    return {
      x: snapToGrid(mousePosition.x, cellSize),
      y: snapToGrid(mousePosition.y, cellSize),
    };
  };

  const snapToGrid = (value: number, gridSize: number) =>
    Math.round(value / gridSize) * gridSize;

  const updateRectPosition = useCallback(
    (rectangle: RectangleType, dragDeltas: Vector2Type) => {
      const targetX = snapToGrid(rectangle.x + dragDeltas.x, cellSize);
      const targetY = snapToGrid(rectangle.y + dragDeltas.y, cellSize);

      if (targetX !== rectangle.x || targetY !== rectangle.y) {
        return {
          ...rectangle,
          x: targetX,
          y: targetY,
        };
      }

      return rectangle;
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateRectSize = useCallback(
    (rectangle: RectangleType, dragDeltas: Vector2Type) => {
      const direction = resizeDirectionRef.current;

      if (!direction) return rectangle;

      const tempRectangle = { ...rectangle };

      if (direction.includes("right")) {
        const newWidth = snapToGrid(rectangle.width + dragDeltas.x, cellSize);
        tempRectangle.width = Math.max(cellSize, newWidth);
      }
      if (direction.includes("left")) {
        const newWidth = snapToGrid(rectangle.width - dragDeltas.x, cellSize);
        if (newWidth >= cellSize) {
          tempRectangle.x = snapToGrid(rectangle.x + dragDeltas.x, cellSize);
          tempRectangle.width = newWidth;
        }
      }
      if (direction.includes("bottom")) {
        const newHeight = snapToGrid(rectangle.height + dragDeltas.y, cellSize);
        tempRectangle.height = Math.max(cellSize, newHeight);
      }
      if (direction.includes("top")) {
        const newHeight = snapToGrid(rectangle.height - dragDeltas.y, cellSize);
        if (newHeight >= cellSize) {
          tempRectangle.y = snapToGrid(rectangle.y + dragDeltas.y, cellSize);
          tempRectangle.height = newHeight;
        }
      }

      return tempRectangle;
    },
    [cellSize]
  );

  return {
    state,
    mode: modeRef.current,
    dragPointsOrigin: startDragPointRef.current,

    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,

    setResizeDirection: (direction: DirectionVariantType) =>
      (resizeDirectionRef.current = direction),
  };
}
