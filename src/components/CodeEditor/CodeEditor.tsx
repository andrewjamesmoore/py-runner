import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { RefObject, useCallback, useEffect } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      editorRef.current?.view?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [editorRef]);

  const handleContainerClick = () => {
    editorRef.current?.view?.focus();
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
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
