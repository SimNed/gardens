import { Separator } from "@/app/components/shadcn-ui/separator";
import { cn } from "@/app/lib/utils/style";
import { AssistantElementType } from "@/types/assistant";
import { useAssistantContext } from "../../context";
import { Button } from "@/app/components/shadcn-ui/button";

interface SideBarElementProps {
  element: AssistantElementType;
  cellSize: number;
}

export default function SideBarElement({
  element,
  cellSize,
}: SideBarElementProps) {
  const { state, hoverElement, unhoverElement, selectElement } =
    useAssistantContext();

  return (
    <div
      className={cn("cursor-pointer", {
        "bg-[rgba(0,100,255,0.1)]": state.hoveredElement?.id === element.id,
        "bg-[rgba(0,100,255,0.3)]": state.selectedElement?.id === element.id,
      })}
      onClick={() => selectElement(element)}
      onMouseEnter={() => hoverElement(element)}
      onMouseLeave={() => unhoverElement()}
    >
      <div className="flex justify-between items-center px-2">
        <p className="text-sm">{`${element.rectangle.width / cellSize}m x ${
          element.rectangle.height / cellSize
        }m`}</p>
        <Button variant="outline">Edit</Button>
      </div>
      <Separator />
    </div>
  );
}
