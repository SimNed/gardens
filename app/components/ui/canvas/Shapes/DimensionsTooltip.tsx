import { RectangleType } from "@/types/canvas";
import { useCanvasContext } from "../context";

interface DimensionsTooltipProps {
  rectangle: RectangleType;
  xOffset?: number;
  yOffset?: number;
  fontSize?: number;
}

export default function DimensionsTooltip({
  rectangle,
  xOffset = 0,
  yOffset = -20,
  fontSize = 14,
}: DimensionsTooltipProps) {
  const { state, gridSize } = useCanvasContext();

  const normalizedWidth = rectangle.width / gridSize / 2;
  const normalizedHeight = rectangle.height / gridSize / 2;

  const initialY = rectangle.y + yOffset * state.zoomLevel;

  const adjustedY =
    initialY + yOffset < state.viewBox.y
      ? rectangle.y + normalizedHeight * 40 + yOffset * -1.5 * state.zoomLevel
      : initialY;

  return (
    <text
      x={rectangle.x + xOffset * state.zoomLevel}
      y={adjustedY}
      fontSize={fontSize * state.zoomLevel}
      className="font-mono"
    >
      {`${normalizedWidth.toFixed(1)}m x ${normalizedHeight.toFixed(1)}m`}
    </text>
  );
}
