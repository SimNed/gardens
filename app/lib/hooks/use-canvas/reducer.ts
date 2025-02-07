import { DragPointType, RectangleType, Vector2Type } from "@/types/canvas";

export interface CanvasState {
  viewBox: RectangleType;
  tempRectangle: RectangleType | null;
}

export type CanvasActions =
  | { type: "update_temp_rectangle"; dragPoints: DragPointType }
  | { type: "reset_temp_rectangle" }
  | { type: "init_view_box"; canvas: SVGSVGElement }
  | { type: "update_panning"; dragDeltas: Vector2Type }
  | { type: "update_zoom_factor"; factor: number };

export default function canvasReducer(
  state: CanvasState,
  action: CanvasActions
) {
  switch (action.type) {
    case "update_temp_rectangle": {
      const tempRectangle = {
        x: Math.min(action.dragPoints.origin.x, action.dragPoints.current.x),
        y: Math.min(action.dragPoints.origin.y, action.dragPoints.current.y),
        width: Math.abs(
          action.dragPoints.current.x - action.dragPoints.origin.x
        ),
        height: Math.abs(
          action.dragPoints.current.y - action.dragPoints.origin.y
        ),
      };

      console.log("temp", tempRectangle);

      return { ...state, tempRectangle };
    }
    case "reset_temp_rectangle": {
      return { ...state, tempRectangle: null };
    }
    case "init_view_box": {
      const viewBox = {
        ...state.viewBox,
        width: action.canvas.width.baseVal.value,
        height: action.canvas.height.baseVal.value,
      };

      return { ...state, viewBox };
    }
    case "update_panning": {
      const viewBox = {
        ...state.viewBox,
        x: state.viewBox.x - action.dragDeltas.x,
        y: state.viewBox.y - action.dragDeltas.y,
      };

      return { ...state, viewBox };
    }
    case "update_zoom_factor": {
      const normalizedZoomFactor = action.factor > 0 ? 1.1 : 0.9;
      const viewBox = {
        ...state.viewBox,
        width: state.viewBox.width * normalizedZoomFactor,
        height: state.viewBox.height * normalizedZoomFactor,
      };

      return { ...state, viewBox };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}
