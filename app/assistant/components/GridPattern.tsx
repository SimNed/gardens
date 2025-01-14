interface GridPatternProps {
  gridSize: number;
  color?: string;
  viewBox: { x: number; y: number; width: number; height: number };
}

const GridPattern = ({
  gridSize,
  color = "#DDD",
  viewBox,
}: GridPatternProps) => {
  return (
    <>
      <defs>
        <pattern
          id="gridPattern"
          patternUnits="userSpaceOnUse"
          width={gridSize}
          height={gridSize}
          x={viewBox.x}
          y={viewBox.y}
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
          <circle cx={1} cy={1} r="1" fill={color} />
          <circle cx={gridSize} cy={1} r="1" fill={color} />
          <circle cx={1} cy={gridSize} r="1" fill={color} />
          <circle cx={gridSize} cy={gridSize} r="1" fill={color} />
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
