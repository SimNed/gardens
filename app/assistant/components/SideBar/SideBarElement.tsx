import { Separator } from "@/app/components/shadcn-ui/separator";
import { cn } from "@/app/lib/utils/style";
import { AssistantElementType } from "@/types/assistant";
import { useAssistantContext } from "../../context";
import { Button } from "@/app/components/shadcn-ui/button";
import { Trash2 } from "lucide-react";
import { getSoilLabel } from "@/app/lib/utils/plant";

interface SideBarElementProps {
  element: AssistantElementType;
  cellSize: number;
  onModalOpen: () => void;
}

export default function SideBarElement({
  element,
  cellSize,
  onModalOpen,
}: SideBarElementProps) {
  const { state, hoverElement, unhoverElement, selectElement, deleteElement } =
    useAssistantContext();

  return (
    <div
      className={cn("cursor-pointer", {
        "bg-[rgba(0,100,255,0.1)]": state.hoveredElement?.id === element.id,
        "bg-[rgba(0,100,255,0.3)]": state.selectedElement?.id === element.id,
      })}
      onClick={() => {
        selectElement(element);
      }}
      onMouseEnter={() => hoverElement(element)}
      onMouseLeave={() => unhoverElement()}
    >
      <div className="flex justify-between items-center gap-3">
        <div className="w-full grid grid-cols-[5fr_5fr_3fr] justify-between items-cente px-1">
          {element.crop ? (
            <p className="text-xs">{element.crop.commonName}</p>
          ) : (
            <p className="text-zinc-500 text-xs">Pas de culture</p>
          )}
          {element.soil && (
            <p className="text-xs">
              {getSoilLabel(element.soil).toLowerCase()}
            </p>
          )}
          <p className="text-xs">{`${(
            element.rectangle.width /
            cellSize /
            2
          ).toFixed(1)}m x ${(element.rectangle.height / cellSize / 2).toFixed(
            1
          )}m`}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onModalOpen}>
            Edit
          </Button>
          <Button variant="secondary" onClick={() => deleteElement(element)}>
            <Trash2 />
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
}
