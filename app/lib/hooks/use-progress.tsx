import { useEffect, useState } from "react";

interface UseProgressProps {
  onComplete: () => void;
  duration: number;
}

export function useProgress({ onComplete, duration }: UseProgressProps) {
  const [progress, setProgress] = useState(0);

  const durationInMs = duration * 1000;
  const intervalTime = durationInMs / 200;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const tempProgress = prevProgress + 0.5;
        if (tempProgress + 0.5 >= 100) {
          onComplete();
          return 0;
        }
        return tempProgress;
      });
    }, intervalTime);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    progress,
    resetProgress: () => setProgress(0),
  };
}
