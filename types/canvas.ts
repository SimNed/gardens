export type Vector2Type = {
  x: number;
  y: number;
};

export type DragPointType = {
  start: Vector2Type;
  end: Vector2Type;
};

export type RectangleType = {
  x: number;
  y: number;
  width: number;
  height: number;
  infos?: Array<string>;
};
