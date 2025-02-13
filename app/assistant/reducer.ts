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
  const getElementWarnings = (element: AssistantElementType) => {
    const warnings = [];

    if (!element.soil) warnings.push("pas de sol");
    if (!element.sunExposure) warnings.push("pas d'exposition");

    return warnings;
  };

  switch (action.type) {
    case "create_element": {
      const element = {
        id: Date.now(),
        rectangle: { ...action.rectangle },
      };

      element.rectangle.infos = getElementWarnings(element);

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
        element.id === action.element.id
          ? {
              ...action.element,
              rectangle: {
                ...action.element.rectangle,
                infos: getElementWarnings(action.element),
              },
            }
          : element
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
        selectedElement: undefined,
        hoveredElement: undefined,
        elements: updatedElements,
      };
    }

    default: {
      throw Error("Unknown action");
    }
  }
}
