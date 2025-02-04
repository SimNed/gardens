"use client";

import Image from "next/image";

import { QuestionType } from "@/types/quizz";
import { useInputNavigation } from "@/app/lib/hooks/use-input-navigation";
import QuestionnaireField from "./QuestionnaireField";
import { QuizzVariantType } from "@/types/variant";
import { useRef } from "react";

interface QuestionnaireProps {
  variant: QuizzVariantType;
  question: QuestionType;
  timerDuration?: number;
  handleCorrectField: (index: number) => void;
}

export default function Questionnaire({
  variant,
  question,
  handleCorrectField,
}: QuestionnaireProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    question.fields.map(() => null)
  );

  useInputNavigation({ inputRefs });

  return (
    <div>
      {variant === "image" ? (
        <div className="relative w-full h-[200px]">
          <Image
            src={question.element}
            alt={"plante mystère"}
            fill
            priority
            sizes="(max-width: 450px) 100vw, (max-width: 200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <h1>{question.element}</h1>
      )}
      <div className="w-full">
        {question.fields.map((field) => (
          <QuestionnaireField
            key={field.label}
            ref={(element) => {
              inputRefs.current[field.index] = element;
            }}
            field={field}
            handleCorrectField={handleCorrectField}
          />
        ))}
      </div>
    </div>
  );
}
