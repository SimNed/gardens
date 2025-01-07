import { useEffect, useRef } from "react";

export const useInputNavigation = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    focusOnFirst();
  }, []);

  /// debug this function
  const focusOnFirst = () => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (inputRefs.current.every((input) => input && input.disabled)) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      prev(index);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      next(index);
    }
  };

  const handleDisable = (index: number) => {
    if (inputRefs.current.every((input) => input && input.disabled)) return;
    next(index);
  };

  const prev = (idx: number) => {
    let input = undefined;

    while (!input || input.disabled) {
      input =
        idx === 0
          ? inputRefs.current[inputRefs.current.length - 1]
          : inputRefs.current[idx - 1];
    }

    input.focus();
  };

  const next = (idx: number) => {
    let input = undefined;

    while (!input || input.disabled) {
      input =
        idx >= inputRefs.current.length - 1
          ? inputRefs.current[0]
          : inputRefs.current[idx + 1];
    }

    input.focus();
  };

  return {
    inputRefs,
    focusOnFirst,
    handleKeyDown,
    handleDisable,
  };
};
