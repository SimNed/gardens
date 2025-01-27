import { useAssistantContext } from "../AssistantContext";
import SideBarElement from "./SideBarElement";

interface AssistantSideBarProps {
  cellSize: number;
}

export function AssistantSideBar({ cellSize }: AssistantSideBarProps) {
  const { getElements } = useAssistantContext();

  return (
    <ul className="border-l border-t border-zinc-300 p-2">
      {getElements().map((element) => (
        <li key={element.id}>
          <SideBarElement element={element} cellSize={cellSize} />
        </li>
      ))}
    </ul>
  );
}
