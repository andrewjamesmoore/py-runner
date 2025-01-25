import { useEffect, useState, useRef } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { ErrorScreen } from "./components/ErrorScreen/ErrorScreen";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";
import type { ReactCodeMirrorRef as CodeMirror } from "@uiw/react-codemirror";
import styles from "./App.module.css";
import { ReferencePanel } from "./components/ReferencePanel/ReferencePanel";
import { DisplayLine } from "./components/DisplayLine/DisplayLine";
import { Footer } from "./components/Footer/Footer";
import { MAX_EXECUTION_TIME, MAX_MEMORY } from "./utils/pythonExecution";
import { usePythonEnvironment } from "./hooks/usePythonEnvironment";
import { useTerminalHistory } from "./hooks/useTerminalHistory";
import { useCommandHandler } from "./hooks/useCommandHandler";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { useAppShortcuts } from "./hooks/useAppShortcuts";

function App() {
  const { loading, initError, isExecuting, initPyodide, executeCode } =
    usePythonEnvironment();

  const { history, currentInput, setCurrentInput, addToHistory, clearHistory } =
    useTerminalHistory();

  const handleCommand = useCommandHandler({
    currentInput,
    isExecuting,
    executeCode,
    clearHistory,
    addToHistory,
    setCurrentInput,
  });

  const handleReferenceExample = (code: string) => {
    setCurrentInput(code);
    setTimeout(() => handleCommand(), 0);
  };
    
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const editorRef = useRef<CodeMirror | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initPyodide();
  }, [initPyodide]);

  useAutoScroll(bottomRef, [history]);

  useAppShortcuts({
    setShowReference,
    handleCommand,
    isExecuting,
  });

  if (loading) {
    return <LoadingScreen />;
  }

  if (initError) {
    return <ErrorScreen error={initError} onRetry={initPyodide} />;
  }

  return (
    <div className={styles.container}>
      <Navbar
        showSecurityInfo={showSecurityInfo}
        setShowSecurityInfo={setShowSecurityInfo}
        showReference={showReference}
        setShowReference={setShowReference}
        maxExecutionTime={MAX_EXECUTION_TIME}
        maxMemory={MAX_MEMORY}
        onExecute={handleCommand}
        onClear={clearHistory}
      />
      <main
        className={`${styles.content} ${showReference ? styles.shifted : ""}`}
      >
        <div>
          {history.map((entry, index) => (
            <div key={index}>
              <DisplayLine text={entry.input} type='input' />
              {entry.output && (
                <DisplayLine
                  text={entry.output}
                  type='output'
                  error={entry.error}
                />
              )}
            </div>
          ))}
        </div>
        <CodeEditor
          editorRef={editorRef}
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          onExecute={handleCommand}
        />
        <div ref={bottomRef} />
      </main>
      <Footer />
      <ReferencePanel
        isOpen={showReference}
        onClose={() => setShowReference(false)}
        onExecute={handleCommand}
      />
    </div>
  );
}

export default App;
