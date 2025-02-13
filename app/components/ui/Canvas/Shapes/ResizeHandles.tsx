import {
  LEFT_CLICK_BUTTON_CODE,
  RESIZE_HANDLE_FILL,
} from "@/app/lib/utils/canvas";
import { RectangleType, Vector2Type } from "@/types/canvas";

interface ResizeHandlesProps {
  rectangle: RectangleType;
  zoomLevel: number;
  size?: number;
  onMouseDown: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    direction: Vector2Type
  ) => void;
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

export default function ResizeHandles({
  rectangle,
  zoomLevel,
  size = 4,
  onMouseDown,
}: ResizeHandlesProps) {
  // left: -1, right: 1, top: -1, bottom: 1.
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
          strokeWidth={5 * zoomLevel}
          onMouseDown={(e) => {
            if (e.button === LEFT_CLICK_BUTTON_CODE) {
              e.stopPropagation();
              onMouseDown(e, handler.direction);
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
          r={5 * zoomLevel}
          onMouseDown={(e) => {
            if (e.button === LEFT_CLICK_BUTTON_CODE) {
              e.stopPropagation();
              onMouseDown(e, handler.direction);
            }
          }}
          fill={RESIZE_HANDLE_FILL}
          strokeWidth={3 * zoomLevel}
          stroke="white"
          style={{ cursor: handler.cursor }}
        />
      ))}
    </>
  );
}
