import {
  DragPointType,
  RectangleType,
  Vector2Type,
  ViewBoxType,
} from "@/types/grid";
import { DirectionVariantType } from "@/types/variant";

export const LEFT_CLICK_BUTTON_CODE = 0;
export const RIGHT_CLICK_BUTTON_CODE = 2;

export const DEFAULT_RECT_FILL = "rgba(0, 100, 255, 0.2)";
export const SELECTED_RECT_FILL = "rgba(0, 100, 255, 0.4)";
export const DEFAULT_RECT_STROKE = "blue";
export const SELECTED_RECT_STROKE = "rgb(0, 0, 255)";

export const getMousePositionInGrid = (
  mousePosition: Vector2Type,
  cellSize: number
) => {
  return {
    x: snapToGrid(mousePosition.x, cellSize),
    y: snapToGrid(mousePosition.y, cellSize),
  };
};

export const snapToGrid = (value: number, gridSize: number) =>
  Math.round(value / gridSize) * gridSize;

export const getViewBoxString = (viewBox: ViewBoxType) => {
  return `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;
};

// PAN

export const getViewBoxPanningUpdate = (
  viewBox: ViewBoxType,
  dragDeltas: Vector2Type
) => {
  return {
    ...viewBox,
    x: viewBox.x - dragDeltas.x,
    y: viewBox.y - dragDeltas.y,
  };
};

// MOVE

export const getRectPositionUpdate = (
  rectangle: RectangleType,
  cellSize: number,
  dragDeltas: Vector2Type
) => {
  return {
    ...rectangle,
    x: snapToGrid(rectangle.x + dragDeltas.x, cellSize),
    y: snapToGrid(rectangle.y + dragDeltas.y, cellSize),
  };
};

// DRAW

export const getRectDrawUpdate = (dragPoints: DragPointType) => {
  return {
    id: Date.now(),
    x: Math.min(dragPoints.origin.x, dragPoints.current.x),
    y: Math.min(dragPoints.origin.y, dragPoints.current.y),
    width: Math.abs(dragPoints.current.x - dragPoints.origin.x),
    height: Math.abs(dragPoints.current.y - dragPoints.origin.y),
  };
};

// RESIZE

export const getRectSizeUpdate = (
  rectangle: RectangleType,
  dragDeltas: Vector2Type,
  resizeDirection: DirectionVariantType,
  cellSize: number
) => {
  const tempRectangle = { ...rectangle };

  if (resizeDirection.includes("right")) {
    tempRectangle.width = Math.max(cellSize, rectangle.width + dragDeltas.x);
  }
  if (resizeDirection.includes("left")) {
    const newWidth = rectangle.width - dragDeltas.x;
    if (newWidth >= cellSize) {
      tempRectangle.x = rectangle.x + dragDeltas.x;
      tempRectangle.width = newWidth;
    }
  }
  if (resizeDirection.includes("bottom")) {
    tempRectangle.height = Math.max(cellSize, rectangle.height + dragDeltas.y);
  }
  if (resizeDirection.includes("top")) {
    const newHeight = rectangle.height - dragDeltas.y;
    if (newHeight >= cellSize) {
      tempRectangle.y = rectangle.y + dragDeltas.y;
      tempRectangle.height = newHeight;
    }
  }

  return tempRectangle;
};
