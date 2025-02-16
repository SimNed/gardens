import { Button } from "@/app/components/shadcn-ui/button";
import { AssistantElementType } from "@/types/assistant";
import { Crosshair, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useAssistantContext } from "../../../context";

interface AssistantElementActionsProps {
  element: AssistantElementType;
}

export default function AssistantElementActions({
  element,
}: AssistantElementActionsProps) {
  const { openEditor, deleteElement } = useAssistantContext();

  return (
    <div className="flex gap-2 [&>button]:rounded-full [&>button:hover]:bg-zinc-400 items-center">
      {/* <Button
        variant="secondary"
        className="rounded-full w-8 h-8"
        size={"icon"}
        onClick={}
      >
        <Crosshair />
      </Button> */}
      <Button variant="secondary" size="icon-sm" onClick={openEditor}>
        <Pencil />
      </Button>
      <Button
        variant="secondary"
        size="icon-sm"
        onClick={() => deleteElement(element)}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
