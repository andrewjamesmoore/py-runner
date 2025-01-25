import { useState, useCallback } from "react";
import { HistoryEntry, createHistoryEntry } from "../utils/terminalHistory";

export function useTerminalHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const addToHistory = useCallback(
    (input: string, output?: string, error?: boolean) => {
      setHistory((prev) => [...prev, createHistoryEntry(input, output, error)]);
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentInput("");
  }, []);

  return {
    history,
    currentInput,
    setCurrentInput,
    addToHistory,
    clearHistory,
  };
}
