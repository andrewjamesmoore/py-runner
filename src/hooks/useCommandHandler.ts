import { useCallback } from "react";
import { validateCode } from "../utils/codeValidation";

interface UseCommandHandlerProps {
  currentInput: string;
  isExecuting: boolean;
  executeCode: (code: string) => Promise<{ result: unknown; output: string }>;
  clearHistory: () => void;
  addToHistory: (input: string, output?: string, error?: boolean) => void;
  setCurrentInput: (input: string) => void;
}

export function useCommandHandler({
  currentInput,
  isExecuting,
  executeCode,
  clearHistory,
  addToHistory,
  setCurrentInput,
}: UseCommandHandlerProps) {
  const handleCommand = useCallback(
    async (manualInput?: string) => {
      const input = manualInput || currentInput;
      if (!input.trim() || isExecuting) return;

      if (input.trim().toLowerCase() === "clear") {
        clearHistory();
        return;
      }

      if (!validateCode(input)) {
        addToHistory(
          input,
          "Error: This code contains blocked operations for security reasons.",
          true
        );
        setCurrentInput("");
        return;
      }

      try {
        const { result, output } = await executeCode(input);
        addToHistory(
          input,
          output.trim() || (result !== undefined ? String(result) : undefined)
        );
      } catch (error) {
        addToHistory(
          input,
          error instanceof Error ? error.message : String(error),
          true
        );
      } finally {
        setCurrentInput("");
      }
    },
    [
      currentInput,
      isExecuting,
      executeCode,
      clearHistory,
      addToHistory,
      setCurrentInput,
    ]
  );

  return handleCommand;
}
