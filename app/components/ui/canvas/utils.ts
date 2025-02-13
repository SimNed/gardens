import { RectangleType, Vector2Type } from "@/types/canvas";

export const updateRectPosition = (
  rectangle: RectangleType,
  dragDeltas: Vector2Type
) => {
  if (dragDeltas.x === 0 && dragDeltas.y === 0) return rectangle;

  const targetX = rectangle.x + dragDeltas.x;
  const targetY = rectangle.y + dragDeltas.y;

  return {
    ...rectangle,
    x: targetX,
    y: targetY,
  };
};

export const updateRectSize = (
  rectangle: RectangleType,
  gridSize: number,
  direction: Vector2Type,
  dragDeltas: Vector2Type
) => {
  if (!direction) return rectangle;

  const tempRectangle = { ...rectangle };

  if (direction.x === 1) {
    const newWidth = rectangle.width + dragDeltas.x;
    tempRectangle.width = Math.max(gridSize, newWidth);
  }
  if (direction.x === -1) {
    const newWidth = rectangle.width - dragDeltas.x;
    if (newWidth >= gridSize) {
      tempRectangle.x = rectangle.x + dragDeltas.x;
      tempRectangle.width = newWidth;
    }
  }
  if (direction.y === 1) {
    const newHeight = rectangle.height + dragDeltas.y;
    tempRectangle.height = Math.max(gridSize, newHeight);
  }
  if (direction.y === -1) {
    const newHeight = rectangle.height - dragDeltas.y;
    if (newHeight >= gridSize) {
      tempRectangle.y = rectangle.y + dragDeltas.y;
      tempRectangle.height = newHeight;
    }
  }

  return tempRectangle;
};
