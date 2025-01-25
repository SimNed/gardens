export type Vector2Type = {
  x: number;
  y: number;
};

export type ViewBoxType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RectangleType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GridElementType = {
  id: number;
  rectangle: RectangleType;
};

export type DragPointType = {
  origin: { x: number; y: number };
  current: { x: number; y: number };
};
