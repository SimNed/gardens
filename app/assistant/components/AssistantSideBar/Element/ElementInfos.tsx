import { getSoilLabel, getSunExposureLabel } from "@/app/lib/utils/plant";
import { AssistantElementType } from "@/types/assistant";
import { CircleAlert } from "lucide-react";
import React from "react";

interface ElementInfosProps {
  element: AssistantElementType;
}

export default function ElementInfos({ element }: ElementInfosProps) {
  return (
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
  );
}
