import { GridElementType, RectangleType } from "@/types/grid";

import { createContext, useContext, useState, ReactNode } from "react";

interface GridContextProps {
  getElements: () => Array<GridElementType>;
  createElement: (rectangle: RectangleType) => void;
  selectElement: (element: GridElementType) => void;
  unselectElement: () => void;
  getSelectedElement: () => GridElementType | null;
  updateElement: (element: GridElementType) => void;
  deleteElement: (element: GridElementType) => void;
}

const GridContext = createContext<GridContextProps | null>(null);

interface GridProviderProps {
  children: ReactNode;
}

interface GridStateProps {
  elements: Array<GridElementType>;
  selectedElement: GridElementType | null;
}

export function GridProvider({ children }: GridProviderProps) {
  const [gridState, setGridState] = useState<GridStateProps>({
    elements: [],
    selectedElement: null,
  });

  const getElements = () => {
    return gridState.elements;
  };

  const createElement = (rectangle: RectangleType) => {
    const element = { id: Date.now(), rectangle: rectangle };

    setGridState((prev) => ({
      elements: [...prev.elements, element],
      selectedElement: element,
    }));
  };

  const getSelectedElement = () => {
    return gridState.selectedElement;
  };

  const selectElement = (element: GridElementType) => {
    setGridState((prev) => ({ ...prev, selectedElement: element }));
  };

  const unselectElement = () => {
    setGridState((prev) => ({ ...prev, selectedElement: null }));
  };

  const updateElement = (element: GridElementType) => {
    const updatedElements = gridState.elements.map((el) =>
      el.id === element.id ? element : el
    );
    setGridState((prev) => ({
      ...prev,
      elements: updatedElements,
    }));
  };

  const deleteElement = (element: GridElementType) => {
    const updatedElements = gridState.elements.filter(
      (el) => el.id !== element.id
    );
    setGridState((prev) => ({
      ...prev,
      elements: updatedElements,
    }));
  };

  const value: GridContextProps = {
    getElements,
    createElement,
    getSelectedElement,
    selectElement,
    unselectElement,
    updateElement,
    deleteElement,
  };

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
}

export function useGridContext() {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
}
