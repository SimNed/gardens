"use client";

import { useState } from "react";

import QuizzQuestions from "./QuizzQuestions";
import QuizzResults from "./QuizzResults";

import { QuestionType } from "@/types/quizz";
import { QuizzVariantType } from "@/types/variant";

interface QuizzProps {
  variant: QuizzVariantType;
  questionnaire: Array<QuestionType>;
  duration?: number;
}

export default function Quizz({
  variant,
  questionnaire,
  duration = 10,
}: QuizzProps) {
  const [quizzResults, setQuizzResults] = useState<Array<QuestionType>>([]);
  return quizzResults.length === 0 ? (
    <QuizzQuestions
      variant={variant}
      duration={duration}
      questionnaire={questionnaire}
      handleQuizzResults={setQuizzResults}
    />
  ) : (
    <QuizzResults questionnaire={quizzResults} />
  );
}
