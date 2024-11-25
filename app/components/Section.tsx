import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface SectionProps {
  className?: string;
  isFullHeight?: boolean;
}

const Section = ({
  className,
  isFullHeight = false,
  children,
}: PropsWithChildren<SectionProps>) => {
  return (
    <section
      className={cn(
        "max-w-5xl min-h-[calc(100vh-4rem)]",
        { "h-[calc(100vh-4rem)]": isFullHeight },
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
