import { cn } from "@/lib/utils/style";
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
      className="absolute pointer-events-none z-[99999] font-space"
      style={{
        left: `${position.x + xOffset}px`,
        top: `${position.y + yOffset}px`,
      }}
    >
      {`${width}m x ${height}m`}
    </div>
  );
}
