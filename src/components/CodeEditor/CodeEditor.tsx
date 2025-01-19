import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { RefObject, useCallback } from "react";
import { closeBrackets } from "@codemirror/autocomplete";
import { PlayIcon } from "lucide-react";
import styles from "./CodeEditor.module.css";
import { darkTheme } from "../../themes/CodeEditorTheme";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

interface CodeEditorProps {
  editorRef: RefObject<ReactCodeMirrorRef>;
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onExecute: () => void;
}

export function CodeEditor({
  editorRef,
  currentInput,
  setCurrentInput,
  onExecute,
}: CodeEditorProps) {
  const onChange = useCallback(
    (value: string) => {
      setCurrentInput(value);
    },
    [setCurrentInput]
  );

  return (
    <div className={styles.container}>
      <div className={styles.editorWrapper}>
        <div className={styles.editorContainer}>
          <CodeMirror
            ref={editorRef}
            value={currentInput}
            onChange={onChange}
            extensions={[python(), closeBrackets()]}
            theme={darkTheme}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              dropCursor: true,
              indentOnInput: true,
              allowMultipleSelections: true,
            }}
          />
          {currentInput.trim() && (
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
    </div>
  );
}
