import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { RefObject, useCallback, useState } from "react";
import { closeBrackets } from "@codemirror/autocomplete";
import { PlayIcon } from "lucide-react";
import styles from "./CodeEditor.module.css";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

interface CodeEditorProps {
  editorRef: RefObject<ReactCodeMirrorRef>;
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onExecute: () => void;
}

const customTheme = createTheme({
  theme: "dark",
  settings: {
    background: "transparent",
    foreground: "var(--text-color-alt)",
    caret: "var(--color-accent)",
    selection: "rgba(163, 230, 53, 0.1)",
    lineHighlight: "var(--bg-color)",
    gutterBackground: "transparent",
    gutterForeground: "var(--text-color-alt)",
  },
  styles: [
    { tag: t.comment, color: "var(--color-accent-subdued)" },
    { tag: t.variableName, color: "var(--text-color)" },
    { tag: t.string, color: "var(--color-accent)" },
    { tag: t.number, color: "#ffb662" },
    { tag: [t.keyword, t.operator], color: "#ff79c6" },
    { tag: t.definitionKeyword, color: "#ff79c6" },
    { tag: t.function(t.variableName), color: "var(--color-accent)" },
  ],
});

export function CodeEditor({
  editorRef,
  currentInput,
  setCurrentInput,
  onExecute,
}: CodeEditorProps) {
  const [showExecuteButton, setShowExecuteButton] = useState(false);

  const onChange = useCallback(
    (value: string) => {
      setCurrentInput(value);
    },
    [setCurrentInput]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Command/Ctrl + Enter to execute
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        onExecute();
      }
    },
    [onExecute]
  );

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowExecuteButton(true)}
      onMouseLeave={() => setShowExecuteButton(false)}
    >
      <div className={styles.editorWrapper}>
        <CodeMirror
          ref={editorRef}
          value={currentInput}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          extensions={[python(), closeBrackets()]}
          theme={customTheme}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
          }}
        />
        {showExecuteButton && currentInput.trim() && (
          <button
            onClick={onExecute}
            className={styles.executeButton}
            title='Run (⌘/Ctrl + Enter)'
          >
            <PlayIcon size={12} />
            cmd + enter
          </button>
        )}
      </div>
    </div>
  );
}
