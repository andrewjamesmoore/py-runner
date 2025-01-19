import { useEffect } from "react";

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  action: () => void;
  disabled?: boolean;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const matchingShortcut = shortcuts.find(
        (shortcut) =>
          shortcut.key.toLowerCase() === e.key.toLowerCase() &&
          (!shortcut.ctrl || e.metaKey || e.ctrlKey) &&
          !shortcut.disabled
      );

      if (matchingShortcut) {
        e.preventDefault();
        matchingShortcut.action();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}
