import { useAssistantContext } from "./AssistantContext";

interface AssistantSideBarProps {}

export function AssistantSideBar({}: AssistantSideBarProps) {
  const { getElements } = useAssistantContext();

  return (
    <ul>
      {getElements().map((element) => (
        <li key={element.id}>{element.id}</li>
      ))}
    </ul>
  );
}
