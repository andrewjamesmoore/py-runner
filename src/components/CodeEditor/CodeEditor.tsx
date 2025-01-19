import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { RefObject, useCallback } from "react";
import { closeBrackets } from "@codemirror/autocomplete";
import { EditorState, TransactionSpec } from "@codemirror/state";
import styles from "./CodeEditor.module.css";

interface CodeEditorProps {
  editorRef: RefObject<any>;
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

// Custom transaction filter to prevent newlines after auto-closing
const preventNewlineFilter = EditorState.transactionFilter.of((tr) => {
  if (tr.newDoc.lines > tr.startState.doc.lines) {
    const spec: TransactionSpec = {
      changes: {
        from: 0,
        to: tr.newDoc.length,
        insert: tr.newDoc.line(1).text,
      },
    };
    return [tr, { ...spec }];
  }
  return tr;
});

export function CodeEditor({
  editorRef,
  currentInput,
  setCurrentInput,
  handleKeyDown,
}: CodeEditorProps) {
  const handleEditorKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const editor = editorRef.current?.view;
        if (editor) {
          const cursor = editor.state.selection.main.head;
          const line = editor.state.doc.lineAt(cursor);
          const text = line.text;
          setCurrentInput(text);
          handleKeyDown(e);
        }
      } else if (e.key === "Enter" && e.shiftKey) {
        return false;
      } else {
        handleKeyDown(e);
      }
    },
    [editorRef, handleKeyDown, setCurrentInput]
  );

  return (
    <div className={styles.container}>
      <span className={styles.prompt}>&gt;&gt;&gt; </span>
      <div className={styles.editorWrapper}>
        <CodeMirror
          ref={editorRef}
          value={currentInput}
          theme={customTheme}
          extensions={[
            python(),
            closeBrackets(),
            preventNewlineFilter,
            EditorState.allowMultipleSelections.of(false),
          ]}
          onChange={setCurrentInput}
          onKeyDown={handleEditorKeyDown}
          className={styles.editor}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            closeBrackets: false,
            autocompletion: true,
          }}
        />
      </div>
    </div>
  );
}
