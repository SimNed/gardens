"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface AlphabeticalListItemsProps {
  list: { id: string; label: string }[];
  onClick: (id: string) => void;
  isLoading?: boolean;
}

const AlphabeticalListItems = ({
  list,
  onClick,
}: AlphabeticalListItemsProps) => {
  return (
    <div className="flex-1 max-h-full h-full overflow-hidden">
      <ScrollArea className="w-full h-full">
        <ul className="">
          {list.map((e) => (
            <li
              key={e.id}
              onClick={() => onClick(e.id)}
              className="hover:bg-slate-200 hover:cursor-pointer px-2"
            >
              <p className="py-4 italic text-sm">{e.label}</p>
              <Separator />
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default AlphabeticalListItems;
