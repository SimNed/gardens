"use client";

import { useEffect, useState } from "react";
import { QuizzItemAnswersType, QuizzItemType } from "@/types/QuizzType";
import Image from "next/image";
import ProgressBar from "@/app/components/ProgressBar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import QuizzAnswerFields from "./QuizzItem/QuizzAnswerFields";

interface QuizzDisplayerInterface {
  data: QuizzItemType[];
  timerDuration?: number;
}

const QuizzWithPictureDisplayer = ({
  data,
  timerDuration = 10,
}: QuizzDisplayerInterface) => {
  const [quizzState, setQuizzState] = useState<{
    currentIndex: number;
    score: number;
    results: QuizzItemAnswersType[];
  }>({ currentIndex: 0, score: 0, results: [] });

  const [isTimerOver, setIsTimerOver] = useState(false);

  useEffect(() => {
    if (isTimerOver) {
      setIsTimerOver(false);
    }
  }, [isTimerOver, quizzState]);

  function handleItemAnswers(answers: QuizzItemAnswersType) {
    const newQuizzState = { ...quizzState };

    newQuizzState.currentIndex = quizzState.currentIndex + 1;
    newQuizzState.score = isTimerOver ? quizzState.score : quizzState.score + 1;
    newQuizzState.results = [...quizzState.results, answers];

    setQuizzState({ ...newQuizzState });
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex gap-2">
        <div className="grid gap-2">
          <QuizzAnswerFields
            key={quizzState.currentIndex}
            item={data[quizzState.currentIndex]}
            isTimerOver={isTimerOver}
            handleAnswers={handleItemAnswers}
          />
        </div>
        <div className="grid grid-cols-[1fr_5fr] gap-4 justify-center items-center">
          <p className="text-sm p-1 text-center flex-1 bg-secondary rounded-full border border-zinc-200">{`${
            quizzState.currentIndex + 1
          } / ${data.length}`}</p>
          <ProgressBar
            duration={timerDuration}
            onComplete={() => setIsTimerOver(true)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="relative w-[450px] h-[300px]">
          <Image
            src={data[quizzState.currentIndex].element}
            alt={"plante mystère"}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="text-lg flex justify-center items-center">
        <p>
          {quizzState.score} / {quizzState.results.length}
        </p>
      </CardFooter>
    </Card>
  );
};

export default QuizzWithPictureDisplayer;
