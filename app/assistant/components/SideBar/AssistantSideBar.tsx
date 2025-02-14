import { useState } from "react";
import { useAssistantContext } from "../../context";
import SideBarElement from "./SideBarElement";
import EditionSideMenu from "./EditionSideMenu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/shadcn-ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils/style";

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
                Yes. Free to use for personal and commercial projects. No
                attribution required.
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
