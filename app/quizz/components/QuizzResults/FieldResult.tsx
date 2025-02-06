import { Badge } from "@/app/components/shadcn-ui/badge";
import { cn } from "@/app/lib/utils/style";
import { FieldQuestionType } from "@/types/quizz";

interface FieldResultProps {
  field: FieldQuestionType;
}

export default function FieldResult({ field }: FieldResultProps) {
  return (
    <li className="py-4">
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
  );
}
