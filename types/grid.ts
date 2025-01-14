export type Vector2Type = {
  x: number;
  y: number;
};

export type RectangleType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DragPointType = {
  origin: { x: number; y: number };
  current: { x: number; y: number };
};
