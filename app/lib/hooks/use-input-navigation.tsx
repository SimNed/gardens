import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useKeyPress } from "./use-keys";

interface UseInputNavigationProps {
  inputRefs: MutableRefObject<Array<HTMLInputElement | null>>;
}

// FIX FOCUS ON FIRST ON RESET WHEN ALL DISABLE

export const useInputNavigation = ({ inputRefs }: UseInputNavigationProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex, inputRefs]);

  const onInputDisable = () => {
    navigate(1);
  };

  const navigate = useCallback(
    (direction: number) => {
      const enableInputIndexes = getEnableInputIndexes();

      if (enableInputIndexes.length < 2) return;

      let targetEnableIndex =
        enableInputIndexes.indexOf(activeIndex) + direction;

      if (targetEnableIndex < 0) {
        targetEnableIndex = enableInputIndexes.length - 1;
      } else if (targetEnableIndex >= enableInputIndexes.length) {
        targetEnableIndex = 0;
      }

      setActiveIndex(enableInputIndexes[targetEnableIndex]);
    },
    [activeIndex]
  );

  const getEnableInputIndexes = () => {
    return inputRefs.current.reduce<number[]>((acc, input, index) => {
      if (input && !input.disabled) {
        acc.push(index);
      }
      return acc;
    }, []);
  };

  const resetInputs = () => {
    setActiveIndex(0);
  };

  useKeyPress(() => navigate(-1), ["ArrowUp"]);
  useKeyPress(() => navigate(1), ["ArrowDown"]);

  return {
    resetInputs,
    onInputDisable,
    activeIndex,
  };
};
