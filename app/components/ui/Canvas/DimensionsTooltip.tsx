import { Vector2Type } from "@/types/canvas";

interface DimensionsTooltipProps {
  position: Vector2Type;
  width: number;
  height: number;
  zoomLevel: number;
  xOffset?: number;
  yOffset?: number;
  fontSize?: number;
}

export default function DimensionsTooltip({
  position,
  width,
  height,
  zoomLevel,
  xOffset = 0,
  yOffset = -20,
  fontSize = 14,
}: DimensionsTooltipProps) {
  return (
    <text
      x={position.x + xOffset * zoomLevel}
      y={position.y + yOffset * zoomLevel}
      fontSize={fontSize * zoomLevel}
      className="font-mono"
    >
      {`${width.toFixed(1)}m x ${height.toFixed(1)}m`}
    </text>
  );
}
