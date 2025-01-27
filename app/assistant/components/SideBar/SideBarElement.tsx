import { Separator } from "@/app/components/shadcn-ui/separator";
import { cn } from "@/lib/utils/style";
import { AssistantElementType } from "@/types/assistant";
import { useAssistantContext } from "../AssistantContext";

interface SideBarElementProps {
  element: AssistantElementType;
  cellSize: number;
}

export default function SideBarElement({
  element,
  cellSize,
}: SideBarElementProps) {
  const {
    hoverElement,
    unhoverElement,
    selectElement,
    getHoveredElement,
    getSelectedElement,
  } = useAssistantContext();

  return (
    <div
      className={cn("cursor-pointer", {
        "bg-[rgba(0,100,255,0.1)]": getHoveredElement()?.id === element.id,
        "bg-[rgba(0,100,255,0.3)]": getSelectedElement()?.id === element.id,
      })}
      onClick={() => selectElement(element)}
      onMouseEnter={() => hoverElement(element)}
      onMouseLeave={() => unhoverElement()}
    >
      <p className="text-sm">{`${element.rectangle.width / cellSize}m x ${
        element.rectangle.height / cellSize
      }m`}</p>
      <Separator />
    </div>
  );
}
