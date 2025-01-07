"use client";

import { useEffect, useState } from "react";
import AnswerField from "./AnswerField";
import { ItemAnswersType, ItemQuestionsType } from "@/types/quizz";

interface QuizzItemProps {
  item: ItemQuestionsType;
  isTimerOver: boolean;
  handleResult: (itemAnswers: ItemAnswersType) => void;
}

const QuizzItem = ({ item, isTimerOver, handleResult }: QuizzItemProps) => {
  const [result, setResult] = useState<ItemAnswersType>(initResult());

  useEffect(() => {
    if (isTimerOver) {
      handleResult({ ...result });
      setResult(initResult());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerOver]);

  useEffect(() => {
    if (result.answers.every((answer) => answer.success === true)) {
      handleResult({ ...result });
      setResult(initResult());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  function initResult() {
    return {
      element: item.element,
      answers: item.questions.map((question) => {
        return { solution: question.solution, success: false };
      }),
    };
  }

  function handleCorrectAnswer(i: number) {
    const answers = [...result.answers];
    answers[i] = { ...result.answers[i], success: true };

    setResult({ ...result, answers });
  }

  return (
    <div className="grid gap-2">
      {item.questions.map((question, i) => (
        <AnswerField
          key={question.label}
          question={question}
          autoFocus={true}
          handleCorrectAnswer={() => handleCorrectAnswer(i)}
        />
      ))}
    </div>
  );
};

export default QuizzItem;
