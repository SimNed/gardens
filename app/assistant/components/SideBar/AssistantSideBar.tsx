import { useState } from "react";
import { useAssistantContext } from "../../context";
import EditionModal from "./EditionModal";
import SideBarElement from "./SideBarElement";

interface AssistantSideBarProps {
  cellSize: number;
}

export function AssistantSideBar({ cellSize }: AssistantSideBarProps) {
  const { state } = useAssistantContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  return (
    <>
      <ul className="border-l border-t border-zinc-300 p-2">
        {state.elements.map((element) => (
          <li key={element.id}>
            <SideBarElement
              element={element}
              cellSize={cellSize}
              onModalOpen={() => handleModalOpen(true)}
            />
          </li>
        ))}
      </ul>
      {state.selectedElement && (
        <EditionModal
          isOpen={isModalOpen}
          element={state.selectedElement}
          onClose={() => handleModalOpen(false)}
        />
      )}
    </>
  );
}
