"use client";

import { AssistantSideBar } from "./SideBar/AssistantSideBar";
import { AssistantProvider } from "../context";
import AssistantCanvas from "./Canvas/AssistantCanvas";

export default function Assistant() {
  return (
    <div className="flex h-full">
      <AssistantProvider>
        <div className="grid grid-cols-[3fr_1fr] w-full">
          <AssistantCanvas />
          <AssistantSideBar cellSize={20} />
        </div>
      </AssistantProvider>
    </div>
  );
}
