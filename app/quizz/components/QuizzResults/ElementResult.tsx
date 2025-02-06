import { QuestionType } from "@/types/quizz";
import FieldResult from "./FieldResult";
import { CircleX, CircleCheck } from "lucide-react";

interface ElementResultProps {
  question: QuestionType;
}

export default function ElementResult({ question }: ElementResultProps) {
  return (
    <div className="flex items-center">
      <ul className="w-full grid grid-cols-4 items-center m-0">
        <li>{question.element}</li>
        {question.fields.map((field) => (
          <FieldResult key={field.index} field={field} />
        ))}
      </ul>
      {question.fields.some((field) => !field.success) ? (
        <CircleX size={16} className="text-red-500" />
      ) : (
        <CircleCheck size={16} className="text-green-500" />
      )}
    </div>
  );
}
