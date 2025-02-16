"use client";

import { useAssistantContext } from "../context";
import { RectangleType } from "@/types/canvas";
import Canvas from "@/app/components/ui/canvas/Canvas";
import { CanvasProvider } from "@/app/components/ui/canvas/context";
// import { useState } from "react";

export default function AssistantCanvas() {
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

  // const [isFocusOnSelect, setIsFocusOnSelect] = useState(false);

  const getElementIndex = (id: number) => {
    return state.elements.map((element) => element.id).indexOf(id);
  };

  return (
    <CanvasProvider
      onShapeCreate={(rectangle: RectangleType) => createElement(rectangle)}
      onShapeUpdate={(rectangle: RectangleType) => {
        if (state.selectedElement)
          updateElement({
            ...state.selectedElement,
            rectangle,
          });
      }}
      onShapeDelete={(index: number) => {
        if (state.selectedElement) deleteElement(state.elements[index]);
      }}
      onShapeSelect={(index: number) => {
        selectElement(state.elements[index]);
      }}
      onShapeUnselect={() => unselectElement()}
      onShapeHover={(index: number) => {
        if (state.elements[index]) hoverElement(state.elements[index]);
      }}
      onShapeUnhover={() => unhoverElement()}
    >
      <Canvas
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
        isKeyPressActive={!state.isEditorOpen}
        // isFocusOnSelect={isFocusOnSelect}
      />
    </CanvasProvider>
  );
}
