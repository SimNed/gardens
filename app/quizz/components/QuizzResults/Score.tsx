import { getRoundedPercent } from "@/app/lib/utils/maths";
import { QuestionType } from "@/types/quizz";

interface ScoreProps {
  questions: Array<QuestionType>;
}

type Score = {
  correctFields: Array<number>;
  correctElements: number;
  totalFields: number;
  totalElements: number;
};

export default function Score({ questions }: ScoreProps) {
  const score: Score = questions.reduce(
    (acc, question) => {
      acc.totalElements += 1;
      acc.totalFields += question.fields.length;

      question.fields.forEach((field) => {
        acc.correctFields[field.index] = field.success
          ? acc.correctFields[field.index] + 1
          : acc.correctFields[field.index];
      });

      const isElementCorrect = question.fields.every((field) => field.success);
      if (isElementCorrect) {
        acc.correctElements += 1;
      }

      return acc;
    },
    {
      correctElements: 0,
      totalFields: 0,
      totalElements: 0,
      correctFields: new Array(questions[0].fields.length).fill(0),
    }
  );

  return (
    <div className="flex justify-between py-4 mb-4">
      <h2 className="text-6xl py-4 text-center">{`Score ${score.correctElements} / ${score.totalElements} `}</h2>
      <ul className="w-52 list-disc [&>li>div]:flex [&>li>div]:justify-between [&>li>div]:py-0 [&>li>div>p]:py-1 [&>li>div>p:first-child]:text-xs  [&>li>div>p:last-child]:font-bold [&>li>div>p:last-child]:text-sm">
        <li>
          <div>
            <p>{"bonnes réponses"}</p>
            <p>
              {`${getRoundedPercent(
                score.correctFields.reduce((a, b) => a + b),
                score.totalFields
              )} %`}
            </p>
          </div>
        </li>

        {score.correctFields.map((fieldCount, index) => (
          <li key={index}>
            <div>
              <p key={index}>{`${questions[0].fields[index].label} `}</p>
              <p>{`${getRoundedPercent(fieldCount, score.totalElements)} %`}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
