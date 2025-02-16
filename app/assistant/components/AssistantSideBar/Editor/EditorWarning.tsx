import Warning from "@/app/components/ui/Warning";
import React from "react";

interface EditorWarningProps {
  message: string;
}

export default function EditorWarning({ message }: EditorWarningProps) {
  return (
    <div className="flex items-center gap-1">
      <Warning />
      <p className="p-0 m-0 text-xs text-muted-foreground">{message}</p>
    </div>
  );
}
