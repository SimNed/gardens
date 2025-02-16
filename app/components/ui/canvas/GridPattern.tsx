import { useCanvasContext } from "./context";

export default function GridPattern() {
  const { state, gridSize } = useCanvasContext();

  const COIN_STROKE_WIDTH = 1;
  const MAIN_STROKE_WIDTH = 1.5 * state.zoomLevel;
  const SECONDARY_STROKE_WIDTH = 1 * state.zoomLevel;

  const COIN_STROKE_COLOR = "#6c757d";
  const MAIN_STROKE_COLOR = "#C7CDD2";
  const SECONDARY_STROKE_COLOR = "#E3E6E9";

  const OFFSET = 0.45;

  return (
    <>
      <defs>
        <pattern
          id="smallGrid"
          width={gridSize}
          height={gridSize}
          patternUnits="userSpaceOnUse"
          x={0}
          y={0}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#ddd"
            strokeWidth={1 * state.zoomLevel}
          />
        </pattern>
        <pattern
          id="mainGrid"
          width={gridSize * 2}
          height={gridSize * 2}
          patternUnits="userSpaceOnUse"
          x={0}
          y={0}
        >
          <rect width="40" height="40" fill="url(#smallGrid)" />
          <path
            d="M 80 0 L 0 0 0 80"
            fill="none"
            stroke="#ccc"
            strokeWidth={2 * state.zoomLevel}
          />
        </pattern>
      </defs>

      <rect
        width={state.viewBox.width}
        height={state.viewBox.height}
        x={state.viewBox.x}
        y={state.viewBox.y}
        fill="url(#mainGrid)"
      />
    </>
  );
}
