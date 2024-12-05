import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils/style";

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
        "w-2/4 min-h-[calc(100vh-4rem)] flex justify-center",
        { "h-[calc(100vh-4rem)]": isFullHeight },
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
