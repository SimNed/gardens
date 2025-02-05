import Section from "@/app/components/ui/Section";
import { Separator } from "@/app/components/shadcn-ui/separator";
import { CircleCheck, CircleX } from "lucide-react";
import { QuestionType } from "@/types/quizz";

interface QuizzResultsProps {
  questionnaire: Array<QuestionType>;
}

const QuizzResults = ({ questionnaire }: QuizzResultsProps) => {
  return (
    <Section variant="md">
      <h2 className="text-3xl text-center">Score</h2>
      <Separator className="my-16" />
      {questionnaire.map((question) => (
        <div key={question.element}>
          <div className="flex items-center">
            <ul className="w-full grid grid-cols-4 items-center m-0">
              <li className="font-bold">{question.element}</li>
              {question.fields.map((field) => (
                <li key={field.index}>
                  <div className="flex justify-between items-center gap-2 m-0">
                    <p>{field.solution}</p>
                  </div>
                </li>
              ))}
            </ul>
            {question.fields.some((field) => !field.success) ? (
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
