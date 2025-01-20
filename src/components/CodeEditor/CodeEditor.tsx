import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { RefObject, useCallback, useEffect } from "react";
import { closeBrackets } from "@codemirror/autocomplete";
import styles from "./CodeEditor.module.css";
import { darkTheme } from "../../themes/CodeEditorTheme";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { Icon } from "../Icon/Icon";

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

  // Focus the editor when the component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      editorRef.current?.view?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [editorRef]);

  // Rather than have to click the specific line this will allow users to click anywhere in the console panel
  const handleContainerClick = () => {
    editorRef.current?.view?.focus();
  };

  const handleExecute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent container click
    onExecute();
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
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
            onClick={handleExecute}
            className={styles.executeButton}
            title='Run (⌘/Ctrl + Enter)'
          >
            <Icon name='play' size={12} />
            cmd + enter
          </button>
        )}
      </div>
    </div>
  );
}
