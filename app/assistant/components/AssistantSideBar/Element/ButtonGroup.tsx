import { Button } from "@/app/components/shadcn-ui/button";
import { AssistantElementType } from "@/types/assistant";
import { Trash2 } from "lucide-react";
import React from "react";
import { useAssistantContext } from "../../../context";

interface ButtonGroupProps {
  element: AssistantElementType;
}

export default function ButtonGroup({ element }: ButtonGroupProps) {
  const { openEditor, deleteElement } = useAssistantContext();

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={openEditor}>
        Edit
      </Button>
      <Button variant="secondary" onClick={() => deleteElement(element)}>
        <Trash2 />
      </Button>
    </div>
  );
}
