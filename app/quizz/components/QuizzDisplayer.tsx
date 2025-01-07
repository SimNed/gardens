"use client";

import { useEffect, useState } from "react";
import {
  ItemAnswersType,
  ItemQuestionsType,
  QuizzStateType,
} from "@/types/quizz";
import ProgressBar from "@/app/components/ProgressBar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/components/shadcn-ui/card";
import QuizzItem from "./QuizzItem";
import QuizzResults from "./QuizzResults";

interface QuizzDisplayerInterface {
  items: ItemQuestionsType[];
  timerDuration?: number;
}

const QuizzDisplayer = ({
  items,
  timerDuration = 10,
}: QuizzDisplayerInterface) => {
  const [isTimerOver, setIsTimerOver] = useState(false);

  const [quizzState, setQuizzState] = useState<QuizzStateType>({
    currentIndex: 0,
    results: [],
  });

  useEffect(() => {
    if (isTimerOver) setIsTimerOver(false);
    return;
  }, [isTimerOver, quizzState]);

  function handleItemResult(result: ItemAnswersType) {
    const tempQuizzState = { ...quizzState };

    tempQuizzState.currentIndex = quizzState.currentIndex + 1;
    tempQuizzState.results = [...quizzState.results, result];

    setQuizzState({ ...tempQuizzState });
  }

  return quizzState.currentIndex <= items.length ? (
    <Card className="h-fit">
      <CardHeader className="flex gap-2">
        <h1 className="text-2xl font-semibold">
          {items[quizzState.currentIndex].element}
        </h1>
        <ProgressBar
          duration={timerDuration}
          onComplete={() => setIsTimerOver(true)}
        />
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <QuizzItem
          item={items[quizzState.currentIndex]}
          isTimerOver={isTimerOver}
          handleResult={(result) => handleItemResult(result)}
        />
      </CardContent>
      <CardFooter className="text-lg flex justify-center items-center">
        <p className="text-sm p-1 text-center flex-1 bg-secondary rounded-full border border-zinc-200">
          {`${quizzState.currentIndex + 1} / ${items.length}`}
        </p>
      </CardFooter>
    </Card>
  ) : (
    <QuizzResults results={quizzState.results} />
  );
};

export default QuizzDisplayer;
