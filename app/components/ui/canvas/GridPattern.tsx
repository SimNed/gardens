import { useCanvasContext } from "./context";

export default function GridPattern() {
  const { state, gridSize } = useCanvasContext();

  const COIN_STROKE_WIDTH = 1;
  const MAIN_STROKE_WIDTH = 1.5 * state.zoomLevel;
  const SECONDARY_STROKE_WIDTH = 1 * state.zoomLevel;

  const COIN_STROKE_COLOR = "#6c757d";
  const MAIN_STROKE_COLOR = "#ADB5BD";
  const SECONDARY_STROKE_COLOR = "#C7CDD2";

  const OFFSET = 0.4;

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
            stroke={MAIN_STROKE_COLOR}
            strokeWidth={MAIN_STROKE_WIDTH}
          />
          <line //right
            x1={gridSize * 2 - OFFSET}
            y1={0 - OFFSET}
            x2={gridSize * 2 - OFFSET}
            y2={0 - OFFSET}
            stroke={MAIN_STROKE_COLOR}
            strokeWidth={MAIN_STROKE_WIDTH}
          />
          <line //top
            x1={0}
            y1={0}
            x2={gridSize * 2 - OFFSET}
            y2={0}
            stroke={MAIN_STROKE_COLOR}
            strokeWidth={MAIN_STROKE_WIDTH}
          />
          <line //bottom
            x1={0}
            y1={gridSize * 2 + OFFSET}
            x2={gridSize * 2 - OFFSET}
            y2={gridSize * 2 + OFFSET}
            stroke={MAIN_STROKE_COLOR}
            strokeWidth={MAIN_STROKE_WIDTH}
          />

          {/* SECONDARY LINES */}

          <line //vertical
            x1={gridSize}
            y1="0"
            x2={gridSize}
            y2={gridSize * 2}
            stroke={SECONDARY_STROKE_COLOR}
            strokeWidth={SECONDARY_STROKE_WIDTH}
          />
          <line //horizontal
            x1="0"
            y1={gridSize}
            x2={gridSize * 2}
            y2={gridSize}
            stroke={SECONDARY_STROKE_COLOR}
            strokeWidth={SECONDARY_STROKE_WIDTH}
          />

          {/* COINS */}

          {/* left-up */}
          <line
            x1={-OFFSET}
            y1={-OFFSET}
            x2={gridSize / 5 - OFFSET}
            y2={-OFFSET}
            stroke={COIN_STROKE_COLOR}
            strokeWidth={COIN_STROKE_WIDTH}
          />
          <line
            x1={-OFFSET}
            y1={-OFFSET}
            x2={-OFFSET}
            y2={gridSize / 5 - OFFSET}
            stroke={COIN_STROKE_COLOR}
            strokeWidth={COIN_STROKE_WIDTH}
          />

          {/* right-up */}
          <line
            x1={gridSize * 2 - gridSize / 5 + OFFSET}
            y1={-OFFSET}
            x2={gridSize * 2 + OFFSET}
            y2={-OFFSET}
            stroke={COIN_STROKE_COLOR}
            strokeWidth={COIN_STROKE_WIDTH}
          />
          <line
            x1={gridSize * 2 + OFFSET}
            y1={-OFFSET}
            x2={gridSize * 2 + OFFSET}
            y2={gridSize / 5 - OFFSET}
            stroke={COIN_STROKE_COLOR}
            strokeWidth={COIN_STROKE_WIDTH}
          />

          {/* left-down */}
          <line
            x1={-OFFSET}
            y1={gridSize * 2 + OFFSET}
            x2={gridSize / 5 - OFFSET}
            y2={gridSize * 2 + OFFSET}
            stroke={COIN_STROKE_COLOR}
            strokeWidth={COIN_STROKE_WIDTH}
          />
          <line
            x1={-OFFSET}
            y1={gridSize * 2 - gridSize / 5 + OFFSET}
            x2={-OFFSET}
            y2={gridSize * 2 + OFFSET}
            stroke={COIN_STROKE_COLOR}
            strokeWidth={COIN_STROKE_WIDTH}
          />

          {/* right-down */}
          <line
            x1={gridSize * 2 - gridSize / 5 + OFFSET}
            y1={gridSize * 2 + OFFSET}
            x2={gridSize * 2 + OFFSET}
            y2={gridSize * 2 + OFFSET}
            stroke={COIN_STROKE_COLOR}
            strokeWidth={COIN_STROKE_WIDTH}
          />
          <line
            x1={gridSize * 2 + OFFSET}
            y1={gridSize * 2 - gridSize / 5 + OFFSET}
            x2={gridSize * 2 + OFFSET}
            y2={gridSize * 2 + OFFSET}
            stroke={COIN_STROKE_COLOR}
            strokeWidth={COIN_STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect
        x={state.viewBox.x}
        y={state.viewBox.y}
        width={state.viewBox.width}
        height={state.viewBox.height}
        fill="url(#gridPattern)"
        style={{ pointerEvents: "none" }}
      />
    </>
  );
}
