"use client";

import { ALPHABET } from "@/lib/consts";

interface AlphabeticalListIndexProps {
  className?: string;
}

const AlphabeticalListIndex = ({ className }: AlphabeticalListIndexProps) => {
  return (
    <ul className={className}>
      {ALPHABET.map((l) => (
        <li
          key={l}
          className="font-bold text-xs py-1 text-center px-2 border-b border-zinc-200 hover:bg-slate-200"
        >
          {l.toUpperCase()}
        </li>
      ))}
    </ul>
  );
};

export default AlphabeticalListIndex;
