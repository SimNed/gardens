interface GridPatternProps {
  gridSize: number;
  color?: string;
  viewBox: { x: number; y: number; width: number; height: number };
}

export default function GridPattern({
  gridSize,
  color = "rgba(105, 105, 115, .2)",
  viewBox,
}: GridPatternProps) {
  return (
    <>
      Voici un pattern avec une croix alignée sur les lignes de la grille :
      jsxCopy
      <defs>
        <pattern
          id="gridPattern"
          patternUnits="userSpaceOnUse"
          width={gridSize}
          height={gridSize}
          x={0}
          y={0}
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={gridSize}
            stroke={color}
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="0"
            x2={gridSize}
            y2="0"
            stroke={color}
            strokeWidth="1"
          />
          {/* CROSS */}
          <line
            x1="0"
            y1="0"
            x2={gridSize / 5}
            y2="0"
            stroke={"rgba(105, 105, 115, .5)"}
            strokeWidth="1"
          />
          <line
            x1={gridSize - (gridSize / 5 - 1)}
            y1="0"
            x2={gridSize}
            y2="0"
            stroke={"rgba(105, 105, 115, .5)"}
            strokeWidth="1"
          />
          <line
            x1={0}
            y1={gridSize - (gridSize / 5 - 1)}
            x2={0}
            y2={gridSize}
            stroke={"rgba(105, 105, 115, .5)"}
            strokeWidth="1"
          />
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={gridSize / 5}
            stroke={"rgba(105, 105, 115, .5)"}
            strokeWidth="1"
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
