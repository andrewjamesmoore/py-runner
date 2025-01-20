import { useEffect, useState, useCallback, useRef } from "react";
import { loadPyodide, PyodideInterface } from "pyodide";
import { Navbar } from "./components/Navbar/Navbar";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { ErrorScreen } from "./components/ErrorScreen/ErrorScreen";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";
import type { ReactCodeMirrorRef as CodeMirror } from "@uiw/react-codemirror";
import styles from "./App.module.css";
import { ReferencePanel } from "./components/ReferencePanel/ReferencePanel";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { DisplayLine } from "./components/DisplayLine/DisplayLine";
import { Footer } from "./components/Footer/Footer";

interface HistoryEntry {
  input: string;
  output?: string;
  error?: boolean;
}

interface ExecutionResult {
  result: unknown;
  output: string;
}

const BLOCKED_MODULES = new Set([
  "subprocess",
  "os",
  "sys.modules",
  "importlib",
  "eval",
  "exec",
  "compile",
]);

//Stop infinite looping and long-running process
const MAX_EXECUTION_TIME = 5000;
//Prevent memory exhaustion
const MAX_MEMORY = 50 * 1024 * 1024;

function App() {
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const editorRef = useRef<CodeMirror | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Security measures for running Python in browser
  const setupPythonEnvironment = useCallback(
    async (pyodideInstance: PyodideInterface) => {
      try {
        await pyodideInstance.runPythonAsync(`
import sys
import io

class SecureImport:
    def __init__(self):
        self.blocked = ${JSON.stringify([...BLOCKED_MODULES])}
        self.__original_import = __import__
    
    def __call__(self, name, *args, **kwargs):
        if any(name.startswith(module) for module in self.blocked):
            raise ImportError(f"Import of '{name}' is not allowed for security reasons")
        return self.__original_import(name, *args, **kwargs)

sys.original_stdout = sys.stdout
__builtins__.__import__ = SecureImport()
__builtins__.open = None
      `);
      } catch {
        throw new Error(
          "Failed to configure Python environment security settings"
        );
      }
    },
    []
  );

  // Pyodide environment setup
  const initPyodide = useCallback(async () => {
    setLoading(true);
    setInitError(null);
    try {
      const pyodideInstance = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
        fullStdLib: false,
        stdout: console.log,
        stderr: console.error,
      }).catch((error) => {
        console.error("Pyodide loading error:", error);
        throw new Error(`Failed to load Pyodide: ${error.message}`);
      });

      await setupPythonEnvironment(pyodideInstance);
      setPyodide(pyodideInstance);
    } catch (error) {
      console.error("Initialization error:", error);
      setInitError(
        `Failed to initialize Python environment: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [setupPythonEnvironment]);

  // Blocked module validation
  const validateCode = useCallback((code: string): boolean => {
    return !code
      .toLowerCase()
      .split("\n")
      .some(
        (line) =>
          !line.startsWith("#") &&
          [...BLOCKED_MODULES].some((keyword) =>
            line.includes(keyword.toLowerCase())
          )
      );
  }, []);

  // Clear terminal by typing clear
  const clearTerminal = useCallback(() => {
    setHistory([]);
    setCurrentInput("");
  }, []);

  const handleCommand = useCallback(
    async (manualInput?: string) => {
      const input = manualInput || currentInput;
      if (!pyodide || !input.trim() || isExecuting) return;

      if (input.trim().toLowerCase() === "clear") {
        clearTerminal();
        return;
      }

      if (!validateCode(input)) {
        setHistory((prev) => [
          ...prev,
          {
            input: input,
            output:
              "Error: This code contains blocked operations for security reasons.",
            error: true,
          },
        ]);
        setCurrentInput("");
        return;
      }

      setIsExecuting(true);
      let timeoutId: number = 0;

      // QoL feature for playground, don't need to print uses Python's repr
      try {
        const executionPromise = async () => {
          await pyodide.runPythonAsync(
            "_temp_stdout = io.StringIO()\nsys.stdout = _temp_stdout"
          );
          try {
            const result = await pyodide.runPythonAsync(input);
            const output = await pyodide.runPythonAsync(
              "_temp_stdout.getvalue()"
            );

            if (
              !output.trim() &&
              !input.includes("=") &&
              !input.includes("(")
            ) {
              const varOutput = await pyodide.runPythonAsync(`repr(${input})`);
              return { result, output: varOutput };
            }

            return { result, output };
          } finally {
            await pyodide.runPythonAsync(
              "sys.stdout = sys.original_stdout\ndel _temp_stdout"
            );
          }
        };

        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = window.setTimeout(
            () => reject(new Error("Execution timed out")),
            MAX_EXECUTION_TIME
          );
        });

        const { result, output } = (await Promise.race([
          executionPromise(),
          timeoutPromise,
        ])) as ExecutionResult;

        setHistory((prev) => [
          ...prev,
          {
            input: input,
            output:
              output.trim() ||
              (result !== undefined ? String(result) : undefined),
          },
        ]);
      } catch (error: Error | unknown) {
        setHistory((prev) => [
          ...prev,
          {
            input: input,
            output: error instanceof Error ? error.message : String(error),
            error: true,
          },
        ]);
      } finally {
        clearTimeout(timeoutId);
        setIsExecuting(false);
        setCurrentInput("");
      }
    },
    [currentInput, pyodide, isExecuting, validateCode, clearTerminal]
  );

  useEffect(() => {
    initPyodide();
  }, [initPyodide]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Uses keyboard shortcuts hook
  useKeyboardShortcuts([
    {
      key: "k",
      ctrl: true,
      action: () => setShowReference((prev) => !prev),
    },
    {
      key: "Enter",
      ctrl: true,
      action: handleCommand,
      disabled: isExecuting,
    },
  ]);

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
        onClear={clearTerminal}
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
        onExecute={(code) => handleCommand(code)}
      />
    </div>
  );
}

export default App;
