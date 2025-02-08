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
      className="font-mono text-sm font-light pointer-events-none z-50 absolute"
      style={{
        left: `${position.x + xOffset}px`,
        top: `${position.y + yOffset}px`,
      }}
    >
      {`${width}m x ${height}m`}
    </div>
  );
}
