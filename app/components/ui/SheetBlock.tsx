import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../shadcn-ui/sheet";

interface SideMenuProps {
  isOpen: boolean;
  isModal: boolean;
  title?: string | ReactNode;
  description?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export default function SideMenu({
  isOpen,
  isModal,
  title,
  description,
  children,
  footer,
  onClose,
}: SideMenuProps) {
  return (
    <Sheet open={isOpen} modal={isModal} onOpenChange={onClose}>
      <SheetContent className="w-full h-full" side={"rightContained"}>
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
