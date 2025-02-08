import { AssistantElementType } from "@/types/assistant";
import { RectangleType } from "@/types/canvas";

export interface AssistantState {
  elements: Array<AssistantElementType>;
  selectedElement?: AssistantElementType;
  hoveredElement?: AssistantElementType;
}

type AssistantActions =
  | { type: "create_element"; rectangle: RectangleType }
  | { type: "select_element"; element: AssistantElementType }
  | { type: "unselect_element" }
  | { type: "hover_element"; element: AssistantElementType }
  | { type: "unhover_element" }
  | { type: "udpate_element"; element: AssistantElementType }
  | { type: "delete_element"; element: AssistantElementType };

export default function assistantReducer(
  state: AssistantState,
  action: AssistantActions
) {
  switch (action.type) {
    case "create_element": {
      const element = {
        id: Date.now(),
        rectangle: action.rectangle,
      };

      return {
        ...state,
        elements: [...state.elements, element],
        selectedElement: element,
      };
    }

    case "select_element": {
      return { ...state, selectedElement: action.element };
    }

    case "unselect_element": {
      return { ...state, selectedElement: undefined };
    }

    case "hover_element": {
      return { ...state, hoveredElement: action.element };
    }

    case "unhover_element": {
      return { ...state, hoveredElement: undefined };
    }

    case "udpate_element": {
      const updatedElements = state.elements.map((element) =>
        element.id === action.element.id ? action.element : element
      );

      return {
        ...state,
        elements: updatedElements,
      };
    }

    case "delete_element": {
      const updatedElements = state.elements.filter(
        (element) => element.id !== action.element.id
      );

      return {
        ...state,
        elements: updatedElements,
      };
    }

    default: {
      throw Error("Unknown action");
    }
  }
}
