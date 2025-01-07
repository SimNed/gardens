"use client";

import { Progress } from "@/app/components/shadcn-ui/progress";
import { useEffect, useRef, useState } from "react";

interface ProgressBarInterface {
  duration: number;
  onComplete: () => void;
}

const ProgressBar = ({ duration, onComplete }: ProgressBarInterface) => {
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    setProgress(0);
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsedTime = Date.now() - startTimeRef.current!;
      const newProgress = Math.min(
        (elapsedTime / (duration * 1000)) * 100,
        100
      );

      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(intervalRef.current);
        onComplete();
      }
    };

    intervalRef.current = setInterval(tick, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration, onComplete]);

  return <Progress value={progress} />;
};

export default ProgressBar;
