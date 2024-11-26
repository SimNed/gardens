"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import AlphabeticalListItems from "./AlphabeticalListItems";
import AlphabeticalListIndex from "./AlphabeticalListIndex";

interface AlphabeticalNavigationProps {
  list: { id: string; label: string }[];
  onItemClick: (id: string) => void;
  onFilterChange: (filter: string) => void;
}

const AlphabeticalNavigation = ({
  list,
  onItemClick,
  onFilterChange,
}: AlphabeticalNavigationProps) => {
  return (
    <>
      <div className="flex items-center my-2">
        <Input
          id="name"
          type="text"
          placeholder="recherche"
          className="w-full"
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
      <Separator />
      <div className="flex max-h-full gap-6 overflow-hidden">
        <AlphabeticalListIndex className="grid grid-cols-26  p-2 justify-center border-r border-zinc-200 [&>li:last-child]:border-none" />
        <AlphabeticalListItems
          className="flex-1 max-h-full h-full overflow-hidden"
          list={list}
          onClick={onItemClick}
        />
      </div>
    </>
  );
};

export default AlphabeticalNavigation;
