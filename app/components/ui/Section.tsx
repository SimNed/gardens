import { PropsWithChildren } from "react";
import { cn } from "@/app/lib/utils/style";
import { SizeVariantType } from "@/types/variant";

interface SectionProps {
  variant?: SizeVariantType;
  className?: string;
  isFullHeight?: boolean;
}

const Section = ({
  className,
  variant = "md",
  isFullHeight = false,
  children,
}: PropsWithChildren<SectionProps>) => {
  function getVariantClasses(currentVariant: SizeVariantType) {
    switch (currentVariant) {
      case "sm":
        return "w-[400px] p-2";
      case "md":
        return "w-[800px] p-4";
      case "lg":
        return "w-[1000px] p-6";
      case "xl":
        return "w-[1200px] p-8";
      case "full":
        return "w-[100%]";
      default:
        return "w-auto";
    }
  }

  return (
    <section
      className={cn(
        "flex flex-col w-[$] justify-center my-6",
        getVariantClasses(variant),
        { "h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] my-0": isFullHeight },
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
