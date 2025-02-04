import Section from "@/app/components/ui/Section";
import { Separator } from "@/app/components/shadcn-ui/separator";
import { ItemAnswersType } from "@/types/quizz";
import { CircleCheck, CircleX } from "lucide-react";

interface QuizzResultsProps {
  results: ItemAnswersType[];
}

const QuizzResults = ({ results }: QuizzResultsProps) => {
  return (
    <Section variant="md">
      <h2 className="text-3xl text-center">Score</h2>
      <Separator className="my-16" />
      {results.map((result) => (
        <div key={result.element}>
          <div className="flex items-center">
            <ul className="w-full grid grid-cols-4 items-center m-0">
              <li className="font-bold">{result.element}</li>
              {result.answers.map((answer) => (
                <li key={answer.solution}>
                  <div className="flex justify-between items-center gap-2 m-0">
                    <p>{answer.solution}</p>
                  </div>
                </li>
              ))}
            </ul>
            {result.answers.some((answer) => !answer.success) ? (
              <CircleX size={16} className="text-red-500" />
            ) : (
              <CircleCheck size={16} className="text-green-500" />
            )}
          </div>
          <Separator className="m-0" />
        </div>
      ))}
    </Section>
  );
};

export default QuizzResults;
