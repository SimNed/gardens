import Section from "@/app/components/ui/Section";
import { Separator } from "@/app/components/shadcn-ui/separator";
import { CircleCheck, CircleX } from "lucide-react";
import { QuestionType } from "@/types/quizz";
import { Badge } from "@/app/components/shadcn-ui/badge";
import { cn } from "@/app/lib/utils/style";
import { QuizzVariantType } from "@/types/variant";

interface QuizzResultsProps {
  variant: QuizzVariantType;
  questionnaire: Array<QuestionType>;
}

const QuizzResults = ({ questionnaire }: QuizzResultsProps) => {
  // Todo : const score = { point, total }

  return (
    <Section variant="md">
      <h2 className="text-3xl text-center">Score</h2>
      <Separator className="my-16" />
      {questionnaire.map((question) => (
        <div className="font-mono text-sm" key={question.element}>
          <div className="flex items-center">
            <ul className="w-full grid grid-cols-4 items-center m-0">
              <li>{question.element}</li>
              {question.fields.map((field) => (
                <li key={field.index} className="py-4">
                  <div className="flex justify-between items-center gap-2 m-0">
                    <Badge
                      variant="default"
                      className={cn(
                        "font-mono font-medium text-xs rounded-sm hover:cursor-default",
                        field.success
                          ? "text-green-800  bg-green-50 hover:bg-green-50"
                          : "text-red-800  bg-red-50 hover:bg-red-50"
                      )}
                    >
                      {field.solution}
                    </Badge>
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
