import Warning from "@/app/components/ui/Warning";
import { AssistantElementType } from "@/types/assistant";
import React from "react";

interface HeaderProps {
  element: AssistantElementType;
  cellSize: number;
}

export default function ElementHeader({ element, cellSize }: HeaderProps) {
  return (
    <div className="w-full flex  justify-between items-cente px-1">
      <div className="flex items-center gap-2">
        {element.rectangle.infos && element.rectangle.infos.length > 0 && (
          <Warning />
        )}
        {element.crop ? (
          <p className="text-xs">{element.crop.commonName}</p>
        ) : (
          <p className="text-zinc-500 text-xs">Pas de culture</p>
        )}
      </div>
      <p className="text-xs">{`${(
        element.rectangle.width /
        cellSize /
        2
      ).toFixed(1)}m x ${(element.rectangle.height / cellSize / 2).toFixed(
        1
      )}m`}</p>
    </div>
  );
}
