"use client";

import { useEffect, useState } from "react";
import {
  ItemAnswersType,
  ItemQuestionsType,
  QuizzStateType,
} from "@/types/quizz";
import Image from "next/image";
import ProgressBar from "@/app/components/ProgressBar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/components/shadcn-ui/card";
import Section from "@/app/components/Section";
import QuizzItem from "./QuizzItem";
import QuizzResults from "./QuizzResults";

interface QuizzDisplayerInterface {
  items: ItemQuestionsType[];
  timerDuration?: number;
}

export default function QuizzWithPictureDisplayer({
  items,
  timerDuration = 10,
}: QuizzDisplayerInterface) {
  const [isTimerOver, setIsTimerOver] = useState(false);

  const [quizzState, setQuizzState] = useState<QuizzStateType>({
    currentIndex: 0,
    results: [],
  });

  useEffect(() => {
    if (isTimerOver) setIsTimerOver(false);
  }, [isTimerOver, quizzState]);

  function handleItemResult(result: ItemAnswersType) {
    const tempQuizzState = { ...quizzState };

    tempQuizzState.currentIndex = quizzState.currentIndex + 1;
    tempQuizzState.results = [...quizzState.results, result];

    setQuizzState({ ...tempQuizzState });
  }

  return quizzState.currentIndex < items.length ? (
    <Section variant="sm" className="flex flex-col gap-8 items-center">
      <Card className="h-fit w-full">
        <CardHeader className="flex gap-2">
          <div className="relative w-full h-[200px]">
            <Image
              src={items[quizzState.currentIndex].element}
              alt={"plante mystère"}
              fill
              priority
              sizes="(max-width: 450px) 100vw, (max-width: 200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
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
    </Section>
  ) : (
    <QuizzResults results={quizzState.results} />
  );
}

// return (
//   <Card className="h-fit">
//     <CardHeader className="flex gap-2">
//       <div className="grid gap-2">
//         <QuizzAnswerFields
//           key={quizzState.currentIndex}
//           item={data[quizzState.currentIndex]}
//           isTimerOver={isTimerOver}
//           handleAnswers={handleItemAnswers}
//         />
//       </div>
//       <div className="grid grid-cols-[1fr_5fr] gap-4 justify-center items-center">
//         <p className="text-sm p-1 text-center flex-1 bg-secondary rounded-full border border-zinc-200">{`${
//           quizzState.currentIndex + 1
//         } / ${data.length}`}</p>
//         <ProgressBar
//           duration={timerDuration}
//           onComplete={() => setIsTimerOver(true)}
//         />
//       </div>
//     </CardHeader>
//     <CardContent className="flex justify-center items-center">
//       <div className="relative w-[450px] h-[300px]">
// <Image
//   src={data[quizzState.currentIndex].element}
//   alt={"plante mystère"}
//   fill
//   priority
//   sizes="(max-width: 450px) 100vw, (max-width: 200px) 50vw, 33vw"
//   className="object-cover"
// />
//       </div>
//     </CardContent>
//     <CardFooter className="text-lg flex justify-center items-center">
//       <p>
//         {quizzState.score} / {quizzState.results.length}
//       </p>
//     </CardFooter>
//   </Card>
// );
