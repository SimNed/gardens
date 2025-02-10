"use client";

import { useAssistantContext } from "../../context";
import { RectangleType } from "@/types/canvas";
import Canvas from "@/app/components/ui/Canvas/Canvas";

interface CanvasProps {
  gridSize: number;
}

export default function AssistantCanvas({ gridSize }: CanvasProps) {
  const {
    state,
    createElement,
    selectElement,
    unselectElement,
    hoverElement,
    unhoverElement,
    updateElement,
    deleteElement,
  } = useAssistantContext();

  const getElementIndex = (id: number) => {
    return state.elements.map((element) => element.id).indexOf(id);
  };

  return (
    <Canvas
      gridSize={gridSize}
      rectangles={state.elements.map((element) => element.rectangle)}
      selectedIndex={
        state.selectedElement
          ? getElementIndex(state.selectedElement.id)
          : undefined
      }
      hoveredIndex={
        state.hoveredElement
          ? getElementIndex(state.hoveredElement.id)
          : undefined
      }
      onRectangleCreate={(rectangle: RectangleType) => createElement(rectangle)}
      onRectangleUpdate={(rectangle: RectangleType) => {
        if (state.selectedElement)
          updateElement({
            ...state.selectedElement,
            rectangle,
          });
      }}
      onRectangleDelete={(index: number) => {
        if (state.selectedElement) deleteElement(state.elements[index]);
      }}
      onSelect={(index: number) => {
        selectElement(state.elements[index]);
      }}
      onUnselect={() => unselectElement()}
      onHover={(index: number) => {
        if (state.elements[index]) hoverElement(state.elements[index]);
      }}
      onUnhover={() => unhoverElement()}
    />
  );
}
