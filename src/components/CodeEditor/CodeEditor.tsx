import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { RefObject, useCallback } from "react";
import { closeBrackets } from "@codemirror/autocomplete";
import styles from "./CodeEditor.module.css";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

interface CodeEditorProps {
  editorRef: RefObject<ReactCodeMirrorRef>;
  currentInput: string;
  setCurrentInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
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
    { tag: t.number, color: "var(--color-accent)" },
    { tag: [t.keyword, t.operator], color: "#ff79c6" },
    { tag: t.definitionKeyword, color: "#ff79c6" },
    { tag: t.function(t.variableName), color: "#50fa7b" },
  ],
});

export function CodeEditor({
  editorRef,
  currentInput,
  setCurrentInput,
  handleKeyDown,
}: CodeEditorProps) {
  const onChange = useCallback(
    (value: string) => {
      // Remove any newlines that might have been added
      const singleLineValue = value.replace(/\n/g, "");
      setCurrentInput(singleLineValue);
    },
    [setCurrentInput]
  );

  return (
    <div className={styles.container}>
      <span className={styles.prompt}>&gt;&gt;&gt;</span>
      <div className={styles.editorWrapper}>
        <CodeMirror
          ref={editorRef}
          value={currentInput}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          extensions={[python(), closeBrackets()]}
          theme={customTheme}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
          }}
        />
      </div>
    </div>
  );
}
