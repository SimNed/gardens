import { GridStateProps } from "@/app/assistant/components/Grid/GridCanvas";
import { DirectionVariantType } from "@/types/variant";
import { useRef, useState } from "react";
import {
  getMousePositionInGrid,
  getViewBoxPanningUpdate,
  getRectDrawUpdate,
  getRectPositionUpdate,
  getRectSizeUpdate,
} from "../utils/grid";
import useMouse from "./use-mouse";

export enum GridMode {
  DEFAULT,
  PANNING,
  DRAWING,
  MOVING,
  RESIZING,
}

const useGrid = () => {
  const gridRef = useRef(null);
  const resizeDirectionRef = useRef<DirectionVariantType | null>(null);

  const [gridState, setGridState] = useState<GridStateProps>({
    viewBox: {
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    },
    mode: GridMode.DEFAULT,
    tempRect: null,
  });

  const { getDragPoints, setDragPoints, getDragDeltas, getMousePosition } =
    useMouse({
      ref: gridRef,
    });

  const handleMouseDown = (
    e: React.MouseEvent<SVGRectElement | SVGSVGElement, MouseEvent>,
    mode: GridMode
  ) => {
    e.preventDefault();

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInGrid(mousePosition, cellSize);
    if (!mousePositionInGrid) return;

    setDragPoints({
      origin: mousePositionInGrid,
      current: mousePositionInGrid,
    });

    setGridState((prevState) => ({ ...prevState, mode }));
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (gridState.mode === GridMode.DEFAULT) return;

    const mousePosition = getMousePosition(e);

    if (!mousePosition) return;

    const mousePositionInGrid = getMousePositionInGrid(mousePosition, cellSize);

    setDragPoints({ current: mousePositionInGrid });

    switch (gridState.mode) {
      case GridMode.PANNING:
        setGridState((prev) => ({
          ...prev,
          viewBox: getViewBoxPanningUpdate(prev.viewBox, getDragDeltas()),
        }));
        break;
      case GridMode.DRAWING:
        setGridState((prev) => ({
          ...prev,
          tempRect: getRectDrawUpdate(getDragPoints()),
        }));
        break;
      case GridMode.MOVING:
        if (selectedRectangle) {
          handleUpdateRectangle(
            getRectPositionUpdate(selectedRectangle, cellSize, getDragDeltas())
          );
        }
        break;
      case GridMode.RESIZING:
        if (selectedRectangle && resizeDirectionRef.current) {
          handleUpdateRectangle(
            getRectSizeUpdate(
              selectedRectangle,
              getDragDeltas(),
              resizeDirectionRef.current,
              cellSize
            )
          );
        }
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    let currentGridState = {};

    if (gridState.mode === GridMode.DRAWING && gridState.tempRect) {
      if (gridState.tempRect.width > 0 && gridState.tempRect.height > 0) {
        handleCreateRectangle(gridState.tempRect);
        currentGridState = {
          rectangles: [...rectangles, gridState.tempRect],
          selectedRect: gridState.tempRect,
        };
      }
    }

    setGridState((prevState) => ({
      ...prevState,
      ...currentGridState,
      mode: GridMode.DEFAULT,
      tempRect: null,
    }));
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    setGridState((prev) => ({
      ...prev,
      viewBox: {
        ...prev.viewBox,
        width: prev.viewBox.width * (e.deltaY > 0 ? 1.1 : 0.9),
        height: prev.viewBox.height * (e.deltaY > 0 ? 1.1 : 0.9),
      },
    }));
  };

  const handleResizeDirection = (direction: DirectionVariantType) => {
    resizeDirectionRef.current = direction;
  };
};

export default useGrid;

// import { useCallback, useRef, useState } from "react";
// import { DragPointType, RectangleType, Vector2Type } from "@/types/grid";
// import { DirectionVariantType } from "@/types/variant";

// export enum GridMode {
//   DEFAULT,
//   PANNING,
//   DRAWING,
//   MOVING,
//   RESIZING,
// }

// interface UseGridProps {
//   rectangles: RectangleType[];
//   selectedRectangle: RectangleType | null;
//   cellSize: number;
//   handleRectangles: (rectangles: RectangleType[]) => void;
//   handleSelectedRectangle: (rectangles: RectangleType[]) => void;
// }

// export interface GridStateProps {
//   viewBox: {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//   };
//   mode: GridMode;
//   tempRect: RectangleType | null;
// }

// const useGrid = ({
//   cellSize,
//   rectangles,
//   selectedRectangle,
//   handleRectangles,
// }: UseGridProps) => {
//   const [gridState, setGridState] = useState<GridStateProps>({
//     viewBox: {
//       x: 0,
//       y: 0,
//       width: 800,
//       height: 600,
//     },
//     mode: GridMode.DEFAULT,
//     tempRect: null,
//   });

//   const resizeDirectionRef = useRef<DirectionVariantType | null>(null);

//   const getMousePositionInGrid = (mousePosition: Vector2Type) => {
//     return {
//       x: snapToGrid(mousePosition.x, cellSize),
//       y: snapToGrid(mousePosition.y, cellSize),
//     };
//   };

//   const getViewBoxString = () => {
//     return `${gridState.viewBox.x} ${gridState.viewBox.y} ${gridState.viewBox.width} ${gridState.viewBox.height}`;
//   };

//   const updatePanning = useCallback(
//     (dragDeltas: Vector2Type) => {
//       setGridState({
//         ...gridState,
//         viewBox: {
//           ...gridState.viewBox,
//           x: gridState.viewBox.x - dragDeltas.x,
//           y: gridState.viewBox.y - dragDeltas.y,
//         },
//       });
//     },
//     [gridState, setGridState]
//   );

//   const updateRectPosition = useCallback(
//     (dragDeltas: Vector2Type) => {
//       const updatedRects = rectangles.map((rect) =>
//         rect.id === selectedRectangle?.id
//           ? {
//               ...rect,
//               x: snapToGrid(selectedRectangle!.x + dragDeltas.x, cellSize),
//               y: snapToGrid(selectedRectangle!.y + dragDeltas.y, cellSize),
//             }
//           : rect
//       );

//       handleRectangles(updatedRects);
//     },
//     [cellSize, handleRectangles, rectangles, selectedRectangle]
//   );

//   const updateRectDrawing = useCallback(
//     (dragPoints: DragPointType) => {
//       setGridState({
//         ...gridState,
//         tempRect: {
//           id: Date.now(),
//           x: Math.min(dragPoints.origin.x, dragPoints.current.x),
//           y: Math.min(dragPoints.origin.y, dragPoints.current.y),
//           width: Math.abs(dragPoints.current.x - dragPoints.origin.x),
//           height: Math.abs(dragPoints.current.y - dragPoints.origin.y),
//         },
//       });
//     },
//     [gridState, setGridState]
//   );

//   const updateRectSize = useCallback(
//     (dragDeltas: Vector2Type) => {
//       const resizeDirection = resizeDirectionRef.current;

//       if (!resizeDirection || !selectedRectangle) return;

//       const tempRect = { ...selectedRectangle };

//       if (resizeDirection.includes("right")) {
//         tempRect.width = Math.max(
//           cellSize,
//           selectedRectangle.width + dragDeltas.x
//         );
//       }
//       if (resizeDirection.includes("left")) {
//         const newWidth = selectedRectangle.width - dragDeltas.x;
//         if (newWidth >= cellSize) {
//           tempRect.x = selectedRectangle.x + dragDeltas.x;
//           tempRect.width = newWidth;
//         }
//       }
//       if (resizeDirection.includes("bottom")) {
//         tempRect.height = Math.max(
//           cellSize,
//           selectedRectangle.height + dragDeltas.y
//         );
//       }
//       if (resizeDirection.includes("top")) {
//         const newHeight = selectedRectangle.height - dragDeltas.y;
//         if (newHeight >= cellSize) {
//           tempRect.y = selectedRectangle.y + dragDeltas.y;
//           tempRect.height = newHeight;
//         }
//       }

//       const updatedRects = rectangles.map((rect) =>
//         rect.id === (selectedRectangle && selectedRectangle.id)
//           ? tempRect
//           : rect
//       );

//       handleRectangles(updatedRects);
//     },
//     [cellSize, handleRectangles, rectangles, selectedRectangle]
//   );

//   const snapToGrid = (value: number, gridSize: number) =>
//     Math.round(value / gridSize) * gridSize;

//   return {
//     gridState,
//     setGridState,
//     snapToGrid,
//     getMousePositionInGrid,
//     getViewBoxString,
//     updatePanning,
//     updateRectPosition,
//     updateRectDrawing,
//     updateRectSize,
//   };
// };

// export default useGrid;
