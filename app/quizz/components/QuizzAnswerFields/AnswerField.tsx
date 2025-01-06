"use client";

import { Input } from "@/app/components/shadcn-ui/input";
import { sanitizedQuizzString, sanitizedString } from "@/lib/utils/string";
import { cn } from "@/lib/utils/style";
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface AnswerFieldProps {
  label: string;
  solution: string;
  validateField?: boolean;
  autoFocus?: boolean;
  handleCorrectAnswer: (questionLabel: string) => void;
}

const AnswerField = ({
  label,
  solution,
  validateField = false,
  autoFocus = false,
  handleCorrectAnswer,
}: AnswerFieldProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setInputValue("");
  }, [solution]);

  useEffect(() => {
    if (isSuccess) handleCorrectAnswer(label);
  }, [handleCorrectAnswer, isSuccess, label]);

  return (
    <div className="flex items-center gap-4">
      <Input
        autoFocus={autoFocus}
        className={cn("disabled:cursor-default")}
        placeholder={label}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (
            sanitizedQuizzString(e.target.value) === sanitizedString(solution)
          ) {
            setIsSuccess(true);
          }
        }}
        value={isSuccess ? solution : inputValue}
        disabled={isSuccess}
      />
      {validateField && (
        <CircleCheck
          className={cn(
            "text-green-500 transition-all duration-300 ease-out",
            isSuccess ? "scale-x-100" : "scale-x-0"
          )}
        />
      )}
    </div>
  );
};

export default AnswerField;
