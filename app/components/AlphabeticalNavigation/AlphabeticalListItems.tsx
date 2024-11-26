"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface AlphabeticalListItemsProps {
  className?: string;
  list: { id: string; label: string }[];
  onClick: (id: string) => void;
}

const AlphabeticalListItems = ({
  className,
  list,
  onClick,
}: AlphabeticalListItemsProps) => {
  return (
    <div className={className}>
      <ScrollArea className="w-full h-full">
        <ul>
          {list.map((e) => (
            <li key={e.id} onClick={() => onClick(e.id)}>
              <p
                className={cn("py-4", {
                  "italic text-sm": e.label.length > 1,
                })}
              >
                {e.label}
              </p>
              <Separator />
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default AlphabeticalListItems;
