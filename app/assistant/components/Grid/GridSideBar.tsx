import { useGridContext } from "./GridContext";

interface GridSideBarProps {}

export function GridSideBar({}: GridSideBarProps) {
  const { getElements } = useGridContext();

  return (
    <ul>
      {getElements().map((element) => (
        <li key={element.id}>{element.id}</li>
      ))}
    </ul>
  );
}
