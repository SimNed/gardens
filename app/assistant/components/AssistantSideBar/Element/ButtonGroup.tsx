import { Button } from "@/app/components/shadcn-ui/button";
import { AssistantElementType } from "@/types/assistant";
import { Crosshair, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useAssistantContext } from "../../../context";

interface ButtonGroupProps {
  element: AssistantElementType;
}

export default function ButtonGroup({ element }: ButtonGroupProps) {
  const { openEditor, deleteElement, focusOnFirst } = useAssistantContext();

  return (
    <div className="flex gap-2 [& > button]:rounded-full">
      <Button
        variant="secondary"
        className="rounded-full w-8 h-8"
        size={"icon"}
        onClick={focusOnFirst}
      >
        <Crosshair />
      </Button>
      <Button
        variant="secondary"
        className="rounded-full w-8 h-8"
        size={"icon"}
        onClick={openEditor}
      >
        <Pencil />
      </Button>
      <Button
        variant="secondary"
        className="rounded-full w-8 h-8"
        size={"icon"}
        onClick={() => deleteElement(element)}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
