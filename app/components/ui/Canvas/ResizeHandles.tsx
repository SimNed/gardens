import {
  LEFT_CLICK_BUTTON_CODE,
  RESIZE_HANDLE_FILL,
} from "@/app/lib/utils/canvas";
import { RectangleType, Vector2Type } from "@/types/canvas";

interface ResizeHandlesProps {
  rectangle: RectangleType;
  size?: number;
  onMouseDown: (
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    direction: Vector2Type
  ) => void;
}

type ResizeHandle = {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: Vector2Type;
  cursor: string;
};

export default function ResizeHandles({
  rectangle,
  size = 4,
  onMouseDown,
}: ResizeHandlesProps) {
  // left: -1, right: 1, top: -1, bottom: 1.

  const handles: Array<ResizeHandle> = [
    {
      x: rectangle.x + size,
      y: rectangle.y - size / 2,
      width: rectangle.width - size * 2,
      height: size,
      direction: { x: 0, y: -1 },
      cursor: "n-resize",
    },
    {
      x: rectangle.x + size,
      y: rectangle.y + rectangle.height - size / 2,
      width: rectangle.width - size * 2,
      height: size,
      direction: { x: 0, y: 1 },
      cursor: "s-resize",
    },
    {
      x: rectangle.x - size / 2,
      y: rectangle.y + size,
      width: size,
      height: rectangle.height - size * 2,
      direction: { x: -1, y: 0 },
      cursor: "w-resize",
    },
    {
      x: rectangle.x + rectangle.width - size / 2,
      y: rectangle.y + size,
      width: size,
      height: rectangle.height - size * 2,
      direction: { x: 1, y: 0 },
      cursor: "e-resize",
    },
    {
      x: rectangle.x - size / 2,
      y: rectangle.y - size / 2,
      width: size,
      height: size,
      direction: { x: -1, y: -1 },
      cursor: "nw-resize",
    },
    {
      x: rectangle.x + rectangle.width - size / 2,
      y: rectangle.y - size / 2,
      width: size,
      height: size,
      direction: { x: 1, y: -1 },
      cursor: "ne-resize",
    },
    {
      x: rectangle.x - size / 2,
      y: rectangle.y + rectangle.height - size / 2,
      width: size,
      height: size,
      direction: { x: -1, y: 1 },
      cursor: "sw-resize",
    },
    {
      x: rectangle.x + rectangle.width - size / 2,
      y: rectangle.y + rectangle.height - size / 2,
      width: size,
      height: size,
      direction: { x: 1, y: 1 },
      cursor: "se-resize",
    },
  ];

  return (
    <>
      {handles.map((handle) => (
        <rect
          key={handle.cursor}
          x={handle.x}
          y={handle.y}
          width={handle.width}
          height={handle.height}
          fill={RESIZE_HANDLE_FILL}
          onMouseDown={(e) => {
            if (e.button === LEFT_CLICK_BUTTON_CODE) {
              e.stopPropagation();
              onMouseDown(e, handle.direction);
            }
          }}
          style={{ cursor: handle.cursor }}
        />
      ))}
    </>
  );
}
