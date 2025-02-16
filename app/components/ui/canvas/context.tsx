import { DragPointType, RectangleType, Vector2Type } from "@/types/canvas";

import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
  useRef,
  useCallback,
  RefObject,
} from "react";

import { useMouse } from "@/app/lib/hooks/use-canvas-mouse";
import { updateRectPosition, updateRectSize } from "./utils";
import canvasReducer, { CanvasState } from "./reducer";

export enum CanvasMode {
  DEFAULT,
  PANNING,
  DRAWING,
  MOVING,
  RESIZING,
}

export const DEFAULT_RECT_FILL = "rgb(240, 240, 245)";
export const DEFAULT_RECT_STROKE = "rgb(150, 150, 170)";
export const SELECTED_RECT_FILL = "rgb(189,224,254)";
export const HOVER_RECT_FILL = "rgb(189,224,254)";
export const HOVER_RECT_STROKE = "rgb(200,200,220)";

interface CanvasContextProps {
  state: CanvasState;
  mode: CanvasMode;
  canvasRef: RefObject<SVGSVGElement>;
  dragPoints: DragPointType;
  gridSize: number;
  handleMouseDown: (
    e: React.MouseEvent<SVGRectElement | SVGSVGElement, MouseEvent>,
    mode: CanvasMode
  ) => void;
  handleMouseMove: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    rectangle?: RectangleType
  ) => void;
  handleMouseUp: () => void;
  handleMouseWheel: (e: React.WheelEvent<SVGSVGElement>) => void;
  onShapeCreate: (shape: RectangleType) => void;
  onShapeUpdate: (shape: RectangleType) => void;
  onShapeDelete: (index: number) => void;
  onShapeSelect: (index: number) => void;
  onShapeUnselect: () => void;
  onShapeHover: (index: number) => void;
  onShapeUnhover: () => void;
  focusOnShape: (shape: RectangleType) => void;
  setResizeDirection: (direction: Vector2Type) => void;
}

const CanvasContext = createContext<CanvasContextProps | null>(null);

interface CanvasProviderProps {
  children: ReactNode;
  gridSize?: number;
  onShapeCreate: (shape: RectangleType) => void;
  onShapeUpdate: (shape: RectangleType) => void;
  onShapeDelete: (index: number) => void;
  onShapeSelect: (index: number) => void;
  onShapeUnselect: () => void;
  onShapeHover: (index: number) => void;
  onShapeUnhover: () => void;
}

export function CanvasProvider({
  children,
  gridSize = 20,
  onShapeCreate,
  onShapeUpdate,
  onShapeDelete,
  onShapeSelect,
  onShapeUnselect,
  onShapeHover,
  onShapeUnhover,
}: CanvasProviderProps) {
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

  const canvasRef = useRef(null);
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

  const [state, dispatch] = useReducer(canvasReducer, initialState);

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

  const handleMouseMove = useCallback(
    (
      e: React.MouseEvent<SVGSVGElement, MouseEvent>,
      rectangle?: RectangleType
    ) => {
      if (modeRef.current === CanvasMode.DEFAULT) return;

      const mousePosition = getMousePosition(
        e,
        modeRef.current !== CanvasMode.PANNING
      );

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
            const updatedRect = updateRectPosition(
              rectangle,
              updatedDragDeltas
            );
            onShapeUpdate(updatedRect);
          }
          break;
        case CanvasMode.RESIZING:
          if (rectangle && resizeDirectionRef.current) {
            const updatedRect = updateRectSize(
              rectangle,
              gridSize,
              resizeDirectionRef.current,
              updatedDragDeltas
            );
            onShapeUpdate(updatedRect);
          }
          break;
        default:
          break;
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onShapeUpdate]
  );

  const handleMouseUp = () => {
    if (
      modeRef.current === CanvasMode.DRAWING &&
      state.tempRectangle &&
      state.tempRectangle.width > 0 &&
      state.tempRectangle.height > 0
    ) {
      onShapeCreate(state.tempRectangle);
    }

    modeRef.current = CanvasMode.DEFAULT;
    dispatch({ type: "reset_temp_rectangle" });
  };

  const handleMouseWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      e.preventDefault();
      if (modeRef.current !== CanvasMode.DEFAULT) return;
      dispatch({
        type: "update_zoom_factor",
        factor: e.deltaY,
        position: getMousePosition(e) || { x: 0, y: 0 },
      });
    },
    [getMousePosition]
  );

  const value: CanvasContextProps = {
    state,
    gridSize,
    dragPoints: getDragPoints(),
    mode: modeRef.current,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseWheel,
    onShapeCreate,
    onShapeUpdate,
    onShapeDelete,
    onShapeSelect,
    onShapeUnselect,
    onShapeHover,
    onShapeUnhover,
    focusOnShape: (shape: RectangleType) => {
      dispatch({ type: "focus_on_shape", shape });
    },
    setResizeDirection: (direction: Vector2Type) =>
      (resizeDirectionRef.current = direction),
  };

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}

export function useCanvasContext() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvasContext must be used within a CanvasProvider");
  }
  return context;
}
