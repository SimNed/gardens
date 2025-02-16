import Warning from "@/app/components/ui/Warning";
import { getSoilLabel, getSunExposureLabel } from "@/app/lib/utils/plant";
import { AssistantElementType } from "@/types/assistant";
import React from "react";

interface AssistantElementInfosProps {
  element: AssistantElementType;
}

export default function AssistantElementInfos({
  element,
}: AssistantElementInfosProps) {
  return (
    <div className=" flex justify-around text-xs gap-4">
      {element.soil ? (
        <p>{`sol: ${getSoilLabel(element.soil).toLowerCase()}`}</p>
      ) : (
        <div className="flex items-center gap-1">
          <Warning />
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
          <Warning />
          <p className="text-yellow-600">{"pas d'exposition"}</p>
        </div>
      )}
    </div>
  );
}
