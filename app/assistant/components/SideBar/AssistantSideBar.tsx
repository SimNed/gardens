import { useAssistantContext } from "../../context";
import EditionSideMenu from "./AssistantElementEditor";
import AssistantElement from "./Element/AssistantElement";

interface AssistantSideBarProps {
  cellSize: number;
}

export function AssistantSideBar({ cellSize }: AssistantSideBarProps) {
  const { state, closeEditor } = useAssistantContext();

  return (
    <>
      <ul className="border-l border-t border-zinc-300 p-2">
        {state.elements.map((element) => (
          <li key={element.id}>
            <AssistantElement element={element} cellSize={cellSize} />
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
