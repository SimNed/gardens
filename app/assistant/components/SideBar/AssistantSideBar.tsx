import { useAssistantContext } from "../../context";
import SideBarElement from "./SideBarElement";

interface AssistantSideBarProps {
  cellSize: number;
}

export function AssistantSideBar({ cellSize }: AssistantSideBarProps) {
  const { state } = useAssistantContext();

  return (
    <ul className="border-l border-t border-zinc-300 p-2">
      {state.elements.map((element) => (
        <li key={element.id}>
          <SideBarElement element={element} cellSize={cellSize} />
        </li>
      ))}
    </ul>
  );
}
