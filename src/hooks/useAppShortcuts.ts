import { useCallback } from "react";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

interface UseAppShortcutsProps {
  setShowReference: (value: (prev: boolean) => boolean) => void;
  handleCommand: () => void;
  isExecuting: boolean;
}

export function useAppShortcuts({
  setShowReference,
  handleCommand,
  isExecuting,
}: UseAppShortcutsProps) {
  const toggleReference = useCallback(
    () => setShowReference((prev) => !prev),
    [setShowReference]
  );

  useKeyboardShortcuts([
    {
      key: "k",
      ctrl: true,
      action: toggleReference,
    },
    {
      key: "Enter",
      ctrl: true,
      action: handleCommand,
      disabled: isExecuting,
    },
  ]);
}
