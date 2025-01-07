import { forwardRef, KeyboardEventHandler, useEffect, useState } from "react";
import { QuestionType } from "@/types/quizz";
import { Input } from "@/app/components/shadcn-ui/input"; // Assurez-vous que cette ligne est compatible avec les types
import { CircleCheck } from "lucide-react";
import { sanitizedQuizzString, sanitizedString } from "@/lib/utils/string";
import { cn } from "@/lib/utils/style";

// On utilise `forwardRef` pour transmettre la référence de l'élément DOM input.
interface AnswerFieldProps {
  question: QuestionType;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onInit: () => void;
  handleCorrectAnswer: () => void;
}

const AnswerField = forwardRef<HTMLInputElement, AnswerFieldProps>(
  (
    { question, onInit, onKeyDown, handleCorrectAnswer }: AnswerFieldProps,
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
      setInputValue("");
      setIsCorrect(false);
      onInit();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question]);

    useEffect(() => {
      if (isCorrect) handleCorrectAnswer();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCorrect]);

    return (
      <div className="flex items-center gap-4">
        <Input
          ref={ref}
          className={cn("disabled:cursor-default")}
          placeholder={question.label}
          value={isCorrect ? question.solution : inputValue}
          disabled={isCorrect}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsCorrect(
              sanitizedQuizzString(e.target.value) ===
                sanitizedString(question.solution)
            );
          }}
          onKeyDown={onKeyDown}
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
  }
);

AnswerField.displayName = "AnswerField";

export default AnswerField;
