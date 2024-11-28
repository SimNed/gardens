"use client";

import { ALPHABET } from "@/lib/consts";
import { cn } from "@/lib/utils";

interface AlphabeticalListIndexProps {
  className?: string;
  activeIndex: string;
  handleIndexLetterSelection: (letter: string) => void;
}

const AlphabeticalListIndex = ({
  className,
  activeIndex,
  handleIndexLetterSelection,
}: AlphabeticalListIndexProps) => {
  return (
    <ul className={className}>
      {ALPHABET.map((l) => (
        <li
          key={l}
          className={cn(
            "font-bold text-xs py-1 text-center px-2  hover:text-black border-b border-zinc-200 hover:bg-slate-200 hover:cursor-pointer",
            l === activeIndex ? "text-black bg-slate-200" : "text-zinc-400"
          )}
          onClick={() => handleIndexLetterSelection(l)}
        >
          {l.toUpperCase()}
        </li>
      ))}
    </ul>
  );
};

export default AlphabeticalListIndex;
