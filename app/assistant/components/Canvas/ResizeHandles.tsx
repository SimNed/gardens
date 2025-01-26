import {
  LEFT_CLICK_BUTTON_CODE,
  RESIZE_HANDLE_FILL,
  SELECTED_RECT_FILL,
  SELECTED_RECT_STROKE,
} from "@/lib/utils/canvas";
import { RectangleType } from "@/types/canvas";
import { DirectionVariantType } from "@/types/variant";

interface ResizeHandlesProps {
  rectangle: RectangleType;
  size?: number;
  onMouseDown: (
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    direction: DirectionVariantType
  ) => void;
}

type ResizeHandle = {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: DirectionVariantType;
  cursor: string;
};

const ResizeHandles = ({
  rectangle,
  size = 4,
  onMouseDown,
}: ResizeHandlesProps) => {
  const handles: Array<ResizeHandle> = [
    {
      x: rectangle.x + size,
      y: rectangle.y - size / 2,
      width: rectangle.width - size * 2,
      height: size,
      direction: "top",
      cursor: "n-resize",
    },
    {
      x: rectangle.x + size,
      y: rectangle.y + rectangle.height - size / 2,
      width: rectangle.width - size * 2,
      height: size,
      direction: "bottom",
      cursor: "s-resize",
    },
    {
      x: rectangle.x - size / 2,
      y: rectangle.y + size,
      width: size,
      height: rectangle.height - size * 2,
      direction: "left",
      cursor: "w-resize",
    },
    {
      x: rectangle.x + rectangle.width - size / 2,
      y: rectangle.y + size,
      width: size,
      height: rectangle.height - size * 2,
      direction: "right",
      cursor: "e-resize",
    },
    {
      x: rectangle.x - size / 2,
      y: rectangle.y - size / 2,
      width: size,
      height: size,
      direction: "top-left",
      cursor: "nw-resize",
    },
    {
      x: rectangle.x + rectangle.width - size / 2,
      y: rectangle.y - size / 2,
      width: size,
      height: size,
      direction: "top-right",
      cursor: "ne-resize",
    },
    {
      x: rectangle.x - size / 2,
      y: rectangle.y + rectangle.height - size / 2,
      width: size,
      height: size,
      direction: "bottom-left",
      cursor: "sw-resize",
    },
    {
      x: rectangle.x + rectangle.width - size / 2,
      y: rectangle.y + rectangle.height - size / 2,
      width: size,
      height: size,
      direction: "bottom-right",
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
};

export default ResizeHandles;
