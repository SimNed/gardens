"use client";

import { Vector2Type } from "@/types/canvas";
import React, { useState } from "react";

interface ShapeInfosprops {
  viewBox: string;
  position: Vector2Type;
  gridSize: number;
  zoomLevel?: number;
  infos: Array<string>;
}

export default function ShapeInfos({
  viewBox,
  position,
  gridSize,
  zoomLevel = 1,
  infos,
}: ShapeInfosprops) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      x={position.x + (gridSize / 2) * zoomLevel}
      y={position.y - (gridSize / 2) * zoomLevel}
    >
      <g
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="  fill-yellow-400 hover:stroke-black stroke-white"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </g>
      <g className="cursor-default">
        <text
          x="20"
          y="30"
          fontSize={12}
          className="font-mono  fill-black font-bold"
        >
          {infos.length}
        </text>
        {isHovered && (
          <g>
            {infos.map((info, index) => (
              <text
                key={index}
                x="40"
                y={12 + index * gridSize}
                fontSize={14}
                className="stroke-none fill-black "
              >
                {info}
              </text>
            ))}
          </g>
        )}
      </g>
    </svg>
  );
}
