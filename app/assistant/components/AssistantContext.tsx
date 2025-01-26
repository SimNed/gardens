import { AssistantElementType } from "@/types/assistant";
import { RectangleType } from "@/types/canvas";

import { createContext, useContext, useState, ReactNode } from "react";

interface AssistantContextProps {
  getElements: () => Array<AssistantElementType>;
  createElement: (rectangle: RectangleType) => void;
  selectElement: (element: AssistantElementType) => void;
  unselectElement: () => void;
  hoverElement: (element: AssistantElementType) => void;
  unhoverElement: () => void;
  getSelectedElement: () => AssistantElementType | null;
  getHoveredElement: () => AssistantElementType | null;
  updateElement: (element: AssistantElementType) => void;
  deleteElement: (element: AssistantElementType) => void;
}

const AssistantContext = createContext<AssistantContextProps | null>(null);

interface AssistantProviderProps {
  children: ReactNode;
}

interface AssistantStateProps {
  elements: Array<AssistantElementType>;
  selectedElement: AssistantElementType | null;
  hoveredElement: AssistantElementType | null;
}

export function AssistantProvider({ children }: AssistantProviderProps) {
  const [gridState, setGridState] = useState<AssistantStateProps>({
    elements: [],
    selectedElement: null,
    hoveredElement: null,
  });

  const getElements = () => {
    return gridState.elements;
  };

  const createElement = (rectangle: RectangleType) => {
    const element = { id: Date.now(), rectangle: rectangle };

    setGridState((prev) => ({
      ...prev,
      elements: [...prev.elements, element],
      selectedElement: element,
    }));
  };

  const getSelectedElement = () => {
    return gridState.selectedElement;
  };

  const selectElement = (element: AssistantElementType) => {
    setGridState((prev) => ({ ...prev, selectedElement: element }));
  };

  const unselectElement = () => {
    setGridState((prev) => ({ ...prev, selectedElement: null }));
  };

  const getHoveredElement = () => {
    return gridState.hoveredElement;
  };

  const hoverElement = (element: AssistantElementType) => {
    setGridState((prev) => ({ ...prev, hoveredElement: element }));
  };

  const unhoverElement = () => {
    setGridState((prev) => ({ ...prev, hoveredElement: null }));
  };

  const updateElement = (element: AssistantElementType) => {
    const updatedElements = gridState.elements.map((el) =>
      el.id === element.id ? element : el
    );
    setGridState((prev) => ({
      ...prev,
      elements: updatedElements,
    }));
  };

  const deleteElement = (element: AssistantElementType) => {
    const updatedElements = gridState.elements.filter(
      (el) => el.id !== element.id
    );
    setGridState((prev) => ({
      ...prev,
      elements: updatedElements,
    }));
  };

  const value: AssistantContextProps = {
    getElements,
    createElement,
    getSelectedElement,
    getHoveredElement,
    selectElement,
    unselectElement,
    hoverElement,
    unhoverElement,
    updateElement,
    deleteElement,
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
