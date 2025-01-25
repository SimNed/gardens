interface GridPatternProps {
  cellSize: number;
  color?: string;
  viewBox: { x: number; y: number; width: number; height: number };
}

const GridPattern = ({
  cellSize,
  color = "rgba(0, 100, 255, 0.2)",
  viewBox,
}: GridPatternProps) => {
  return (
    <>
      Voici un pattern avec une croix alignée sur les lignes de la grille :
      jsxCopy
      <defs>
        <pattern
          id="gridPattern"
          patternUnits="userSpaceOnUse"
          width={cellSize}
          height={cellSize}
          x={0}
          y={0}
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={cellSize}
            stroke={color}
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="0"
            x2={cellSize}
            y2="0"
            stroke={color}
            strokeWidth="1"
          />
          {/* CROSS */}
          <line
            x1="0"
            y1="0"
            x2={cellSize / 5}
            y2="0"
            stroke={"rgba(0, 100, 255, 0.4)"}
            strokeWidth="1"
          />
          <line
            x1={cellSize - (cellSize / 5 - 1)}
            y1="0"
            x2={cellSize}
            y2="0"
            stroke={"rgba(0, 100, 255, 0.4)"}
            strokeWidth="1"
          />
          <line
            x1={0}
            y1={cellSize - (cellSize / 5 - 1)}
            x2={0}
            y2={cellSize}
            stroke={"rgba(0, 100, 255, 0.4)"}
            strokeWidth="1"
          />
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={cellSize / 5}
            stroke={"rgba(0, 100, 255, 0.4)"}
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
};

export default GridPattern;
