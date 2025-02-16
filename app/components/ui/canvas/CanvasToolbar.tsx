import React, { ReactNode } from "react";
import { Button } from "../../shadcn-ui/button";
import { Crosshair } from "lucide-react";
import { useCanvasContext } from "./context";
import { RectangleType } from "@/types/canvas";

interface CanvasToolbarProps {
  rectangles: Array<RectangleType>;
  selectedIndex?: number;
  actions?: Array<CanvasToolbarActions>;
}

type CanvasToolbarActions = {
  icon: ReactNode;
  callback: () => void;
};

export default function CanvasToolbar({
  rectangles,
  selectedIndex,
  actions = [],
}: CanvasToolbarProps) {
  const { focusOnShape } = useCanvasContext();

  const defaultToolbarActions: Array<CanvasToolbarActions> = [
    {
      icon: <Crosshair />,
      callback: () => {
        if (selectedIndex !== undefined) {
          focusOnShape(rectangles[selectedIndex]);
        }
      },
    },
  ];

  return (
    <div className="flex justify-end items-center p-2 bg-red-white border-y border-zinc-300">
      {[...defaultToolbarActions, ...actions].map((action, index) => (
        <Button
          key={index}
          variant="secondary"
          size="icon-sm"
          className="rounded-full border border-zinc-300"
          onClick={action.callback} // Le callback est déjà conditionnel
        >
          {action.icon}
        </Button>
      ))}
    </div>
  );
}
