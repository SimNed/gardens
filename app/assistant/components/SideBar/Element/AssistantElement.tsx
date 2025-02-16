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
import AssistantElementActions from "./AssistantElementActions";
import AssistantElementItem from "./AssistantElementItem";
import AssistantElementInfos from "./AssistantElementInfos";

interface AssistantElementProps {
  element: AssistantElementType;
  cellSize: number;
}

export default function AssistantElement({
  element,
  cellSize,
}: AssistantElementProps) {
  const { state, hoverElement, unhoverElement, selectElement } =
    useAssistantContext();

  return (
    <Collapsible>
      <div className="grid grid-cols-[1fr_16fr] items-center justify-between">
        <CollapsibleTrigger>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <div
          className={cn({
            " bg-[rgba(0,100,255,0.1)]":
              state.hoveredElement?.id === element.id,
            "bg-[rgba(0,100,255,0.3)]":
              state.selectedElement?.id === element.id,
          })}
          onClick={() => {
            selectElement(element);
          }}
          onMouseEnter={() => hoverElement(element)}
          onMouseLeave={() => unhoverElement()}
        >
          <div className="flex justify-between items-center gap-3">
            <AssistantElementItem element={element} cellSize={cellSize} />
            <AssistantElementActions element={element} />
          </div>
          <Separator />
        </div>
      </div>
      <CollapsibleContent>
        <AssistantElementInfos element={element} />
      </CollapsibleContent>
    </Collapsible>
  );
}
