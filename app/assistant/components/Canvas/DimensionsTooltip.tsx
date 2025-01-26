import { Vector2Type } from "@/types/canvas";

interface DimensionsTooltipProps {
  position: Vector2Type;
  width: number;
  height: number;
  xOffset?: number;
  yOffset?: number;
}

export default function DimensionsTooltip({
  position,
  width,
  height,
  xOffset = 0,
  yOffset = -30,
}: DimensionsTooltipProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x + xOffset}px`,
        top: `${position.y + yOffset}px`,
        pointerEvents: "none",
        fontSize: "16px",
        fontWeight: "lighter",
      }}
    >
      {`${width}m x ${height}m`}
    </div>
  );
}
