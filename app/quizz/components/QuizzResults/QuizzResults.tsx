import Section from "@/app/components/ui/Section";
import { Separator } from "@/app/components/shadcn-ui/separator";
import { QuestionType } from "@/types/quizz";
import { QuizzVariantType } from "@/types/variant";
import ElementResult from "./ElementResult";
import Score from "./Score";

interface QuizzResultsProps {
  variant: QuizzVariantType;
  questionnaire: Array<QuestionType>;
}

const QuizzResults = ({ questionnaire }: QuizzResultsProps) => {
  return (
    <Section variant="md">
      <Score questions={questionnaire} />
      <Separator className="my-0" />
      {questionnaire.map((question) => (
        <div className="font-mono text-sm" key={question.element}>
          <ElementResult question={question} />
          <Separator className="m-0" />
        </div>
      ))}
    </Section>
  );
};

export default QuizzResults;
