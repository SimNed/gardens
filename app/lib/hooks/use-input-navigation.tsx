import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useKeyPress } from "./use-keys";

// creer une instance de useInputsRef dans  quizz context ??

interface UseInputNavigationProps {
  inputRefs: MutableRefObject<Array<HTMLInputElement | null>>;
}

export const useInputNavigation = ({ inputRefs }: UseInputNavigationProps) => {
  const [enabledIndexes, setEnabledIndexes] = useState<Array<number>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    resetInputs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const inputToFocus = inputRefs.current[activeIndex];
    if (inputToFocus) inputToFocus.focus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const resetInputs = () => {
    inputRefs.current.forEach((input) => {
      if (!input) return;
      input.disabled = false;
      input.value = "";
    });

    updateEnabledIndexes();
    focusOnFirst();
  };

  const focusOnFirst = () => {
    const input = inputRefs.current[enabledIndexes[0]];
    if (input) input.focus();
  };

  const handleDisable = () => {
    navigate(1);
    updateEnabledIndexes();
  };

  const updateEnabledIndexes = () => {
    const updatedEnabledIndexes = inputRefs.current.reduce<number[]>(
      (acc, input, index) => {
        if (input && !input.disabled) {
          acc.push(index);
        }
        return acc;
      },
      []
    );

    setEnabledIndexes(updatedEnabledIndexes);
  };

  const navigate = useCallback(
    (direction: number) => {
      const indexInEnabledInputs = enabledIndexes.indexOf(activeIndex);

      const targetIndex =
        direction < 0
          ? getPrevEnableIndex(indexInEnabledInputs)
          : getNextEnableIndex(indexInEnabledInputs);

      setActiveIndex(targetIndex);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enabledIndexes, activeIndex]
  );

  useKeyPress(() => navigate(-1), ["ArrowUp"]);
  useKeyPress(() => navigate(1), ["ArrowDown"]);

  const getPrevEnableIndex = (index: number) => {
    return index > 0 ? index - 1 : enabledIndexes.length - 1;
  };

  const getNextEnableIndex = (index: number) => {
    return index < enabledIndexes.length - 1 ? index + 1 : 0;
  };

  const getInputValue = (index: number) => {
    const input = inputRefs.current[index];
    if (!input) return "";

    return input.value;
  };

  const setInputValue = (index: number, value: string) => {
    const input = inputRefs.current[index];
    if (!input) return;
    console.log("INPUTOK");

    input.value = value;
  };

  return {
    handleDisable,
    resetInputs,
    setActiveIndex,
    getInputValue,
    setInputValue,
  };
};
