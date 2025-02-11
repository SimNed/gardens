export type Vector2Type = {
  x: number;
  y: number;
};

export type DragPointType = {
  start: Vector2Type;
  end: Vector2Type;
};

export type CanvasShape = {
  x: number;
  y: number;
  infos?: Array<string>;
};

export type RectangleType = CanvasShape & {
  width: number;
  height: number;
};
