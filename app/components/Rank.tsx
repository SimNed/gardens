import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface RankProps {
  length: number;
  className?: string;
}

const Rank = ({
  length,
  className,
  children,
}: PropsWithChildren<RankProps>) => {
  return (
    <ul className={cn("flex justify-center items-center", className)}>
      {Array.from({ length }, (_, index) => (
        <li key={index}>{children}</li>
      ))}
    </ul>
  );
};

export default Rank;
