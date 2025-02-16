import { useAssistantContext } from "../../context";
import EditionSideMenu from "./Editor/EditionSideMenu";
import SideBarElement from "./Element/SideBarElement";

interface AssistantSideBarProps {
  cellSize: number;
}

export function AssistantSideBar({ cellSize }: AssistantSideBarProps) {
  const { state, closeEditor } = useAssistantContext();

  return (
    <>
      <ul className="border-l  border-zinc-300 p-2">
        {state.elements.map((element) => (
          <li key={element.id}>
            <SideBarElement element={element} cellSize={cellSize} />
          </li>
        ))}
      </ul>

      <EditionSideMenu
        isOpen={state.isEditorOpen && state.selectedElement !== undefined}
        element={state.selectedElement}
        onClose={closeEditor}
      />
    </>
  );
}
