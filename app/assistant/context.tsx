import { AssistantElementType } from "@/types/assistant";
import { RectangleType } from "@/types/canvas";

import { createContext, useContext, ReactNode, useReducer } from "react";
import assistantReducer, { AssistantState } from "./reducer";

interface AssistantContextProps {
  state: AssistantState;
  createElement: (rectangle: RectangleType) => void;
  selectElement: (element: AssistantElementType) => void;
  unselectElement: () => void;
  hoverElement: (element: AssistantElementType) => void;
  unhoverElement: () => void;
  updateElement: (element: AssistantElementType) => void;
  deleteElement: (element: AssistantElementType) => void;
  openEditor: () => void;
  closeEditor: () => void;
}

const AssistantContext = createContext<AssistantContextProps | null>(null);

interface AssistantProviderProps {
  children: ReactNode;
}

export function AssistantProvider({ children }: AssistantProviderProps) {
  const initialState: AssistantState = {
    elements: [],
    selectedElement: undefined,
    hoveredElement: undefined,
    isEditorOpen: false,
  };

  const [state, dispatch] = useReducer(assistantReducer, initialState);

  const value: AssistantContextProps = {
    state,
    createElement: (rectangle: RectangleType) =>
      dispatch({ type: "create_element", rectangle }),
    selectElement: (element: AssistantElementType) =>
      dispatch({ type: "select_element", element }),
    unselectElement: () => dispatch({ type: "unselect_element" }),
    hoverElement: (element: AssistantElementType) =>
      dispatch({ type: "hover_element", element }),
    unhoverElement: () => dispatch({ type: "unhover_element" }),
    updateElement: (element: AssistantElementType) =>
      dispatch({ type: "udpate_element", element }),
    deleteElement: (element: AssistantElementType) =>
      dispatch({ type: "delete_element", element }),
    openEditor: () => dispatch({ type: "set_editor_opening", value: true }),
    closeEditor: () => dispatch({ type: "set_editor_opening", value: false }),
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistantContext() {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error(
      "useAssistantContext must be used within a AssistantProvider"
    );
  }
  return context;
}
