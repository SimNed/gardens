import { useState } from "react";
import { useAssistantContext } from "../../context";
import SideBarElement from "./SideBarElement";
import EditionSideMenu from "./EditionSideMenu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/shadcn-ui/collapsible";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "@/app/lib/utils/style";
import { Separator } from "@radix-ui/react-separator";
import { getSoilLabel, getSunExposureLabel } from "@/app/lib/utils/plant";

interface AssistantSideBarProps {
  cellSize: number;
}

export function AssistantSideBar({ cellSize }: AssistantSideBarProps) {
  const { state } = useAssistantContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  return (
    <>
      <ul className="border-l  border-zinc-300 p-2">
        {state.elements.map((element) => (
          <li key={element.id}>
            <Collapsible>
              <div className="grid grid-cols-[1fr_16fr] items-center justify-between">
                <CollapsibleTrigger>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <SideBarElement
                  element={element}
                  cellSize={cellSize}
                  onModalOpen={() => handleModalOpen(true)}
                />
              </div>
              <CollapsibleContent>
                <div className=" flex justify-around text-xs gap-4">
                  {element.soil ? (
                    <p>{`sol: ${getSoilLabel(element.soil).toLowerCase()}`}</p>
                  ) : (
                    <div className="flex items-center gap-1">
                      <CircleAlert className="w-4 h-4 stroke-white fill-yellow-400" />
                      <p className="text-yellow-600">{"pas de sol"}</p>
                    </div>
                  )}
                  {element.sunExposure ? (
                    <p>
                      {`exposition: ${getSunExposureLabel(
                        element.sunExposure
                      ).toLowerCase()}`}
                    </p>
                  ) : (
                    <div className="flex items-center gap-1">
                      <CircleAlert className="w-4 h-4 stroke-white fill-yellow-400" />
                      <p className="text-yellow-600">{"pas d'exposition"}</p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </li>
        ))}
      </ul>

      <EditionSideMenu
        isOpen={isModalOpen && state.selectedElement !== undefined}
        element={state.selectedElement}
        onClose={() => handleModalOpen(false)}
      />
    </>
  );
}
