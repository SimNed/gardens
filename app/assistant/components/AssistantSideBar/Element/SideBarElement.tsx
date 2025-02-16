import { Separator } from "@/app/components/shadcn-ui/separator";
import { cn } from "@/app/lib/utils/style";
import { AssistantElementType } from "@/types/assistant";
import { useAssistantContext } from "../../../context";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/shadcn-ui/collapsible";
import ButtonGroup from "./ButtonGroup";
import ElementInfos from "./ElementInfos";
import ElementHeader from "./ElementHeader";

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
    <Collapsible>
      <div className="grid grid-cols-[1fr_16fr] items-center justify-between">
        <CollapsibleTrigger>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <div
          className={cn("cursor-pointer border-2 border-transparent", {
            " border-[rgba(0,100,255,0.1)]":
              state.hoveredElement?.id === element.id,
            "border-[rgba(0,100,255,0.3)]":
              state.selectedElement?.id === element.id,
          })}
          onClick={() => {
            selectElement(element);
          }}
          onMouseEnter={() => hoverElement(element)}
          onMouseLeave={() => unhoverElement()}
        >
          <div className="flex justify-between items-center gap-3">
            <ElementHeader element={element} cellSize={cellSize} />
            <ButtonGroup element={element} />
          </div>
          <Separator />
        </div>
      </div>
      <CollapsibleContent>
        <ElementInfos element={element} />
      </CollapsibleContent>
    </Collapsible>
  );
}
