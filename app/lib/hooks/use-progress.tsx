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
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        return prevProgress + 0.5;
      });
    }, intervalTime);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      onComplete();
      setProgress(0);
    }

    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return {
    progress,
    resetProgress: () => setProgress(0),
  };
}
