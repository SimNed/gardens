import { useProgress } from "@/app/lib/hooks/use-progress";
import { Progress } from "../shadcn-ui/progress";

interface ProgressBarProps {
  duration: number;
  onComplete: () => void;
}

export default function ProgressBar({
  duration,
  onComplete,
}: ProgressBarProps) {
  const { progress, resetProgress } = useProgress({
    duration,
    onComplete,
  });

  return <Progress value={progress} />;
}
