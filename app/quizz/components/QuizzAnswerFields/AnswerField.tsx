"use client";

import { useEffect, useState } from "react";

import { QuestionType } from "@/types/quizz";

import { Input } from "@/app/components/shadcn-ui/input";
import { CircleCheck } from "lucide-react";

import { sanitizedQuizzString, sanitizedString } from "@/lib/utils/string";
import { cn } from "@/lib/utils/style";

interface AnswerFieldProps {
  question: QuestionType;
  autoFocus?: boolean;
  handleCorrectAnswer: () => void;
}

const AnswerField = ({
  question,
  autoFocus,
  handleCorrectAnswer,
}: AnswerFieldProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setInputValue("");
    setIsCorrect(false);
  }, [question]);

  useEffect(() => {
    if (isCorrect) handleCorrectAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect]);

  return (
    <div className="flex items-center gap-4">
      <Input
        autoFocus={autoFocus}
        className={cn("disabled:cursor-default")}
        placeholder={question.label}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsCorrect(
            sanitizedQuizzString(e.target.value) ===
              sanitizedString(question.solution)
          );
        }}
        value={isCorrect ? question.solution : inputValue}
        disabled={isCorrect}
      />
      {isCorrect && (
        <CircleCheck
          className={cn(
            "text-green-500 transition-all duration-300 ease-out",
            isCorrect ? "scale-x-100" : "scale-x-0"
          )}
        />
      )}
    </div>
  );
};

export default AnswerField;
