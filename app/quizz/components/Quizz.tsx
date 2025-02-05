"use client";

import { QuizzVariantType } from "@/types/variant";
import Questionnaire from "./Questionnaire/Questionnaire";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/components/shadcn-ui/card";
import { useEffect, useReducer } from "react";
import quizzReducer, { QuizzState } from "../reducer";
import { QuestionType } from "@/types/quizz";
import { Progress } from "@/app/components/shadcn-ui/progress";
import { useProgress } from "@/app/lib/hooks/use-progress";

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
  const initialState: QuizzState = {
    index: 0,
    questionnaire,
  };

  const [state, dispatch] = useReducer(quizzReducer, initialState);

  const { progress, resetProgress } = useProgress({
    duration,
    onComplete: () => dispatch({ type: "next_question" }),
  });

  useEffect(() => {
    if (
      state.questionnaire[state.index].fields.every((field) => field.success)
    ) {
      resetProgress();
      dispatch({ type: "next_question" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.questionnaire]);

  return (
    <Card className="h-fit w-full">
      <CardHeader className="flex gap-2">
        <Progress value={progress} />
      </CardHeader>

      <CardContent className="flex justify-center items-center">
        <Questionnaire
          variant={variant}
          question={state.questionnaire[state.index]}
          handleCorrectField={(index: number) =>
            dispatch({ type: "handle_correct_field", index })
          }
        />
      </CardContent>

      <CardFooter className="text-lg flex justify-center items-center">
        <p className="text-sm p-1 text-center flex-1 bg-secondary rounded-full border border-zinc-200">
          {`${state.index + 1} / ${state.questionnaire.length}`}
        </p>
      </CardFooter>
    </Card>
  );
}

{
  /* <QuizzResults /> */
}
