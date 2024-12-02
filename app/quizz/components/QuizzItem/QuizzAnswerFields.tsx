"use client";

import { useEffect, useState } from "react";
import { QuizzItemAnswersType, QuizzItemType } from "@/types/QuizzType";
import AnswerField from "./AnswerField";

interface QuizzAnswerFieldsProps {
  item: QuizzItemType;
  isTimerOver: boolean;
  handleAnswers: (itemAnswers: QuizzItemAnswersType) => void;
}

const QuizzAnswerFields = ({
  item,
  isTimerOver,
  handleAnswers,
}: QuizzAnswerFieldsProps) => {
  const [itemAnswers, setItemAnswers] = useState<QuizzItemAnswersType>({});

  useEffect(() => {
    const initialItemAnswers: QuizzItemAnswersType = {};
    item.questions.forEach((q) => {
      initialItemAnswers[q.label] = { solution: q.solution, success: false };
    });
    setItemAnswers(initialItemAnswers);
  }, [item.questions]);

  useEffect(() => {
    if (
      Object.keys(itemAnswers).length > 0 &&
      !Object.values(itemAnswers).some((v) => v.success === false)
    ) {
      handleAnswers(itemAnswers);
    }
  }, [handleAnswers, itemAnswers]);

  useEffect(() => {
    if (isTimerOver) {
      handleAnswers(itemAnswers);
    }
  }, [handleAnswers, isTimerOver, itemAnswers]);

  function handleCorrectAnswer(questionLabel: string) {
    setItemAnswers((itemAnswers) => {
      const currentAnswer = itemAnswers[questionLabel];

      return currentAnswer && currentAnswer.success === true
        ? itemAnswers
        : {
            ...itemAnswers,
            [questionLabel]: { ...currentAnswer, success: true },
          };
    });
  }

  return (
    <div className="grid gap-2">
      {item.questions.map((q, index) => (
        <AnswerField
          key={q.label}
          label={q.label}
          solution={q.solution}
          validateField={item.questions.length > 0}
          autoFocus={index === 0}
          handleCorrectAnswer={(questionLabel: string) =>
            handleCorrectAnswer(questionLabel)
          }
        />
      ))}
    </div>
  );
};

export default QuizzAnswerFields;
