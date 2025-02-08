"use client";

import { PlantType } from "@/types/plant";
import { AssistantSideBar } from "./SideBar/AssistantSideBar";
import { AssistantProvider } from "../context";
import AssistantCanvas from "./Canvas/AssistantCanvas copy";

interface AssistantProps {
  plants: Array<PlantType>;
}

export default function Assistant({ plants }: AssistantProps) {
  return (
    <div className="flex h-full">
      <AssistantProvider>
        <div className="grid grid-cols-[3fr_1fr] w-full">
          <AssistantCanvas cellSize={20} />
          <AssistantSideBar cellSize={20} />
        </div>
      </AssistantProvider>
    </div>
  );
}
