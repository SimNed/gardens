import { LEFT_CLICK_BUTTON_CODE } from "@/app/lib/utils/keys";
import { RectangleType, Vector2Type } from "@/types/canvas";
import { CanvasMode, useCanvasContext } from "../context";

interface ResizeHandlesProps {
  shapeIndex: number;
  rectangle: RectangleType;
}

type ResizeHandler = {
  direction: Vector2Type;
  cursor: string;
};

type ResizeSideHandler = ResizeHandler & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type ResizeCornerHandler = ResizeHandler & {
  cx: number;
  cy: number;
};

const RESIZE_HANDLE_FILL = "rgb(92, 105, 128)";

export default function ResizeHandles({
  shapeIndex,
  rectangle,
}: ResizeHandlesProps) {
  // left: -1, right: 1, top: -1, bottom: 1.

  const { state, handleMouseDown, onShapeSelect, setResizeDirection } =
    useCanvasContext();

  const sideHandlers: Array<ResizeSideHandler> = [
    {
      x1: rectangle.x,
      y1: rectangle.y,
      x2: rectangle.x + rectangle.width,
      y2: rectangle.y,
      direction: { x: 0, y: -1 },
      cursor: "n-resize",
    },
    {
      x1: rectangle.x,
      y1: rectangle.y + rectangle.height,
      x2: rectangle.x + rectangle.width,
      y2: rectangle.y + rectangle.height,
      direction: { x: 0, y: 1 },
      cursor: "s-resize",
    },
    {
      x1: rectangle.x,
      y1: rectangle.y,
      x2: rectangle.x,
      y2: rectangle.y + rectangle.height,
      direction: { x: -1, y: 0 },
      cursor: "w-resize",
    },
    {
      x1: rectangle.x + rectangle.width,
      y1: rectangle.y,
      x2: rectangle.x + rectangle.width,
      y2: rectangle.y + rectangle.height,
      direction: { x: 1, y: 0 },
      cursor: "e-resize",
    },
  ];

  const cornerHandlers: Array<ResizeCornerHandler> = [
    {
      cx: rectangle.x,
      cy: rectangle.y,
      direction: { x: -1, y: -1 },
      cursor: "nw-resize",
    },
    {
      cx: rectangle.x + rectangle.width,
      cy: rectangle.y,
      direction: { x: 1, y: -1 },
      cursor: "ne-resize",
    },
    {
      cx: rectangle.x,
      cy: rectangle.y + rectangle.height,
      direction: { x: -1, y: 1 },
      cursor: "sw-resize",
    },
    {
      cx: rectangle.x + rectangle.width,
      cy: rectangle.y + rectangle.height,
      direction: { x: 1, y: 1 },
      cursor: "se-resize",
    },
  ];

  return (
    <>
      {sideHandlers.map((handler, index) => (
        <line
          key={index}
          x1={handler.x1}
          y1={handler.y1}
          x2={handler.x2}
          y2={handler.y2}
          fill={RESIZE_HANDLE_FILL}
          stroke={RESIZE_HANDLE_FILL}
          strokeWidth={5 * state.zoomLevel}
          onMouseDown={(e) => {
            if (e.button === LEFT_CLICK_BUTTON_CODE) {
              e.stopPropagation();
              onShapeSelect(shapeIndex);
              setResizeDirection(handler.direction);
              handleMouseDown(e, CanvasMode.RESIZING);
            }
          }}
          style={{ cursor: handler.cursor }}
        />
      ))}
      {cornerHandlers.map((handler, index) => (
        <circle
          key={index}
          cx={handler.cx}
          cy={handler.cy}
          r={5 * state.zoomLevel}
          onMouseDown={(e) => {
            if (e.button === LEFT_CLICK_BUTTON_CODE) {
              e.stopPropagation();
              onShapeSelect(shapeIndex);
              setResizeDirection(handler.direction);
              handleMouseDown(e, CanvasMode.RESIZING);
            }
          }}
          fill={RESIZE_HANDLE_FILL}
          strokeWidth={3 * state.zoomLevel}
          stroke="white"
          style={{ cursor: handler.cursor }}
        />
      ))}
    </>
  );
}
