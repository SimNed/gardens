"use client";

import { Input } from "@/components/ui/input";
import { sanitizedString } from "@/lib/utils";
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
    console.log(solution);
  }, [solution]);

  useEffect(() => {
    if (isSuccess) handleCorrectAnswer(label);
  }, [handleCorrectAnswer, isSuccess, label]);

  return (
    <div className="flex items-center gap-4">
      <Input
        autoFocus={autoFocus}
        className="disabled:cursor-default"
        placeholder={label}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (sanitizedString(e.target.value) === sanitizedString(solution)) {
            setIsSuccess(true);
          }
        }}
        value={isSuccess ? solution : inputValue}
        disabled={isSuccess}
      />
      {validateField && isSuccess && <CircleCheck className="text-green-500" />}
    </div>
  );
};

export default AnswerField;
