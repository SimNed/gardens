import { Vector2Type } from "@/types/canvas";

interface DimensionsTooltipProps {
  position: Vector2Type;
  width: number;
  height: number;
  zoomLevel: number;
  xOffset?: number;
  yOffset?: number;
  fontSize?: number;
  viewBoxPosition: {
    x: number;
    y: number;
  };
}

export default function DimensionsTooltip({
  position,
  width,
  height,
  zoomLevel,
  xOffset = 0,
  yOffset = -20,
  fontSize = 14,
  viewBoxPosition,
}: DimensionsTooltipProps) {
  // Calcul de la position Y initiale
  const initialY = position.y + yOffset * zoomLevel;

  // Si le tooltip est au-dessus de la viewBox, on le place en dessous du point
  const adjustedY =
    initialY + yOffset < viewBoxPosition.y
      ? position.y + height * 40 + yOffset * -1.5 * zoomLevel
      : initialY;

  return (
    <text
      x={position.x + xOffset * zoomLevel}
      y={adjustedY}
      fontSize={fontSize * zoomLevel}
      className="font-mono"
    >
      {`${width.toFixed(1)}m x ${height.toFixed(1)}m`}
    </text>
  );
}
