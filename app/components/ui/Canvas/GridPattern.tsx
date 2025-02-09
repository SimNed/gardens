import { RectangleType } from "@/types/canvas";

interface GridPatternProps {
  gridSize: number;
  zoomLevel: number;
  color?: string;
  viewBox: RectangleType;
}

export default function GridPattern({
  gridSize,
  zoomLevel,
  viewBox,
}: GridPatternProps) {
  const crossStrokeWidth = 1;
  const mainLinesWidth = 1.5 * zoomLevel;
  const interLinesWidth = 1 * zoomLevel;

  const crossStrokeColor = "#6c757d";
  const mainLinesColor = "#ADB5BD";
  const interLinesColor = "#C7CDD2";

  const crossOffset = 0.4;
  return (
    <>
      <defs>
        <pattern
          id="gridPattern"
          patternUnits="userSpaceOnUse"
          width={gridSize * 2}
          height={gridSize * 2}
          x={0}
          y={0}
        >
          {/* MAIN LINES */}
          <line //left
            x1={0}
            y1="0"
            x2={0}
            y2={gridSize * 2}
            stroke={mainLinesColor}
            strokeWidth={mainLinesWidth}
          />
          <line //right
            x1={gridSize * 2 - crossOffset}
            y1={0 - crossOffset}
            x2={gridSize * 2 - crossOffset}
            y2={0 - crossOffset}
            stroke={mainLinesColor}
            strokeWidth={mainLinesWidth}
          />
          <line //top
            x1={0}
            y1={0}
            x2={gridSize * 2 - crossOffset}
            y2={0}
            stroke={mainLinesColor}
            strokeWidth={mainLinesWidth}
          />
          <line //bottom
            x1={0}
            y1={gridSize * 2 + crossOffset}
            x2={gridSize * 2 - crossOffset}
            y2={gridSize * 2 + crossOffset}
            stroke={mainLinesColor}
            strokeWidth={mainLinesWidth}
          />

          {/* INTERLINES */}

          <line //vertical
            x1={gridSize}
            y1="0"
            x2={gridSize}
            y2={gridSize * 2}
            stroke={interLinesColor}
            strokeWidth={interLinesWidth}
          />
          <line //horizontal
            x1="0"
            y1={gridSize}
            x2={gridSize * 2}
            y2={gridSize}
            stroke={interLinesColor}
            strokeWidth={interLinesWidth}
          />

          {/* COINS */}

          {/* left-up */}
          <line
            x1={-crossOffset}
            y1={-crossOffset}
            x2={gridSize / 5 - crossOffset}
            y2={-crossOffset}
            stroke={crossStrokeColor}
            strokeWidth={crossStrokeWidth}
          />
          <line
            x1={-crossOffset}
            y1={-crossOffset}
            x2={-crossOffset}
            y2={gridSize / 5 - crossOffset}
            stroke={crossStrokeColor}
            strokeWidth={crossStrokeWidth}
          />

          {/* right-up */}
          <line
            x1={gridSize * 2 - gridSize / 5 + crossOffset}
            y1={-crossOffset}
            x2={gridSize * 2 + crossOffset}
            y2={-crossOffset}
            stroke={crossStrokeColor}
            strokeWidth={crossStrokeWidth}
          />
          <line
            x1={gridSize * 2 + crossOffset}
            y1={-crossOffset}
            x2={gridSize * 2 + crossOffset}
            y2={gridSize / 5 - crossOffset}
            stroke={crossStrokeColor}
            strokeWidth={crossStrokeWidth}
          />

          {/* left-down */}
          <line
            x1={-crossOffset}
            y1={gridSize * 2 + crossOffset}
            x2={gridSize / 5 - crossOffset}
            y2={gridSize * 2 + crossOffset}
            stroke={crossStrokeColor}
            strokeWidth={crossStrokeWidth}
          />
          <line
            x1={-crossOffset}
            y1={gridSize * 2 - gridSize / 5 + crossOffset}
            x2={-crossOffset}
            y2={gridSize * 2 + crossOffset}
            stroke={crossStrokeColor}
            strokeWidth={crossStrokeWidth}
          />

          {/* right-down */}
          <line
            x1={gridSize * 2 - gridSize / 5 + crossOffset}
            y1={gridSize * 2 + crossOffset}
            x2={gridSize * 2 + crossOffset}
            y2={gridSize * 2 + crossOffset}
            stroke={crossStrokeColor}
            strokeWidth={crossStrokeWidth}
          />
          <line
            x1={gridSize * 2 + crossOffset}
            y1={gridSize * 2 - gridSize / 5 + crossOffset}
            x2={gridSize * 2 + crossOffset}
            y2={gridSize * 2 + crossOffset}
            stroke={crossStrokeColor}
            strokeWidth={crossStrokeWidth}
          />
        </pattern>
      </defs>
      <rect
        x={viewBox.x}
        y={viewBox.y}
        width={viewBox.width}
        height={viewBox.height}
        fill="url(#gridPattern)"
        style={{ pointerEvents: "none" }}
      />
    </>
  );
}
