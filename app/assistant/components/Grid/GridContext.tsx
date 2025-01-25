import { RectangleType } from "@/types/grid";

import { createContext, useContext, useState, ReactNode } from "react";

interface GridContextProps {
  getRectangles: () => Array<RectangleType>;
  createRectangle: (rectangle: RectangleType) => void;
  selectRectangle: (rectangle: RectangleType) => void;
  unselectRectangle: () => void;
  getSelectedRectangle: () => RectangleType | null;
  updateRectangle: (rectangle: RectangleType) => void;
}

const GridContext = createContext<GridContextProps | null>(null);

interface GridProviderProps {
  children: ReactNode;
}

interface GridStateProps {
  rectangles: Array<RectangleType>;
  selectedRectangle: RectangleType | null;
}

export function GridProvider({ children }: GridProviderProps) {
  const [gridState, setGridState] = useState<GridStateProps>({
    rectangles: [],
    selectedRectangle: null,
  });

  const getRectangles = () => {
    return gridState.rectangles;
  };

  const createRectangle = (rectangle: RectangleType) => {
    setGridState((prev) => ({
      ...prev,
      rectangles: [...prev.rectangles, rectangle],
      selectedRectangle: rectangle,
    }));
  };

  const getSelectedRectangle = () => {
    return gridState.selectedRectangle;
  };

  const selectRectangle = (rectangle: RectangleType) => {
    setGridState((prev) => ({ ...prev, selectedRectangle: rectangle }));
  };

  const unselectRectangle = () => {
    setGridState((prev) => ({ ...prev, selectedRectangle: null }));
  };

  const updateRectangle = (rectangle: RectangleType) => {
    const updatedRects = gridState.rectangles.map((rect) =>
      rect.id === gridState.selectedRectangle?.id ? rectangle : rect
    );

    setGridState((prev) => ({
      ...prev,
      rectangles: updatedRects,
    }));
  };

  const value: GridContextProps = {
    getRectangles,
    createRectangle,
    selectRectangle,
    unselectRectangle,
    getSelectedRectangle,
    updateRectangle,
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
