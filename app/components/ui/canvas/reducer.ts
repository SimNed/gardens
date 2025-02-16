import { DragPointType, RectangleType, Vector2Type } from "@/types/canvas";

export interface CanvasState {
  viewBox: RectangleType;
  tempRectangle: RectangleType | null;
  zoomLevel: number;
}

export type CanvasActions =
  | { type: "update_temp_rectangle"; dragPoints: DragPointType }
  | { type: "reset_temp_rectangle" }
  | { type: "init_view_box"; canvas: SVGSVGElement }
  | { type: "update_panning"; dragDeltas: Vector2Type }
  | { type: "update_zoom_factor"; factor: number; position: Vector2Type }
  | { type: "focus_on_shape"; shape: RectangleType };

export default function canvasReducer(
  state: CanvasState,
  action: CanvasActions
) {
  switch (action.type) {
    case "update_temp_rectangle": {
      const tempRectangle = {
        x: Math.min(action.dragPoints.start.x, action.dragPoints.end.x),
        y: Math.min(action.dragPoints.start.y, action.dragPoints.end.y),
        width: Math.abs(action.dragPoints.end.x - action.dragPoints.start.x),
        height: Math.abs(action.dragPoints.end.y - action.dragPoints.start.y),
      };

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
      const zoomRange = { min: 0.25, max: 2.5 };
      const normalizedZoomFactor = action.factor > 0 ? 1.04 : 0.96;

      const nextZoomLevel = state.zoomLevel * normalizedZoomFactor;

      if (nextZoomLevel < zoomRange.min || nextZoomLevel > zoomRange.max)
        return state;

      const newWidth = state.viewBox.width * normalizedZoomFactor;
      const newHeight = state.viewBox.height * normalizedZoomFactor;

      const dx = action.position.x - state.viewBox.x;
      const dy = action.position.y - state.viewBox.y;

      const newX = state.viewBox.x + dx * (1 - normalizedZoomFactor);
      const newY = state.viewBox.y + dy * (1 - normalizedZoomFactor);

      const viewBox = {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      };

      return {
        ...state,
        viewBox,
        zoomLevel: nextZoomLevel,
      };
    }
    case "focus_on_shape": {
      const shapeCenter = {
        x: action.shape.x + action.shape.width / 2,
        y: action.shape.y + action.shape.height / 2,
      };

      const viewBox = {
        ...state.viewBox,
        x: shapeCenter.x - state.viewBox.width / 2,
        y: shapeCenter.y - state.viewBox.height / 2,
      };

      return {
        ...state,
        viewBox,
      };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}
