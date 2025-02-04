"use client";

import { forwardRef, useEffect, useState } from "react";
import { FieldQuestionType } from "@/types/quizz";
import { Input } from "@/app/components/shadcn-ui/input";
import { CircleCheck } from "lucide-react";
import { cn } from "@/app/lib/utils/style";
import { IsFieldCorrect } from "@/app/lib/utils/quizz";

interface QuestionnaireFieldProps {
  field: FieldQuestionType;
  handleCorrectField: (index: number) => void;
}

const QuestionnaireField = forwardRef<
  HTMLInputElement,
  QuestionnaireFieldProps
>(({ field, handleCorrectField }, ref) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [field]);

  const handleChange = (value: string) => {
    setValue(value);
    if (IsFieldCorrect(value, field)) handleCorrectField(field.index);
  };

  return (
    <div className="flex items-center gap-2 p-2 w-full">
      <Input
        ref={ref}
        className={cn("disabled:cursor-default")}
        placeholder={field.label}
        value={field.success ? field.solution : value}
        disabled={field.success}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      {field.success && (
        <CircleCheck
          className={cn(
            "text-green-500 transition-all duration-300 ease-out",
            field.success ? "scale-x-100" : "scale-x-0"
          )}
        />
      )}
    </div>
  );
});

QuestionnaireField.displayName = "QuestionnaireField";

export default QuestionnaireField;
