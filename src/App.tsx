import React, { useEffect, useState, useCallback, useRef } from "react";
import { loadPyodide } from "pyodide";
import { Navbar } from "./components/Navbar/Navbar";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { ErrorScreen } from "./components/ErrorScreen/ErrorScreen";
import { OutputDisplay } from "./components/OutputDisplay/OutputDisplay";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";
import styles from "./App.module.css";

interface HistoryEntry {
  input: string;
  output?: string;
  error?: boolean;
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

const MAX_EXECUTION_TIME = 5000;
const MAX_MEMORY = 50 * 1024 * 1024;

function App() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [setShowClearConfirm] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const editorRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const securityInfoRef = useRef<HTMLDivElement>(null);

  const setupPythonEnvironment = useCallback(async (pyodideInstance: any) => {
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
    } catch (error: any) {
      throw new Error(
        "Failed to configure Python environment security settings"
      );
    }
  }, []);

  const initPyodide = useCallback(async () => {
    setLoading(true);
    setInitError(null);
    try {
      const pyodideInstance = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
      });

      await setupPythonEnvironment(pyodideInstance);
      setPyodide(pyodideInstance);
    } catch (error: any) {
      setInitError(
        "Failed to initialize Python environment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [setupPythonEnvironment]);

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

  const handleCommand = useCallback(async () => {
    if (!pyodide || !currentInput.trim() || isExecuting) return;

    if (currentInput.trim().toLowerCase() === "clear") {
      clearTerminal();
      return;
    }

    if (!validateCode(currentInput)) {
      setHistory((prev) => [
        ...prev,
        {
          input: currentInput,
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

    try {
      const executionPromise = async () => {
        await pyodide.runPythonAsync(
          "_temp_stdout = io.StringIO()\nsys.stdout = _temp_stdout"
        );
        try {
          const result = await pyodide.runPythonAsync(currentInput);
          const output = await pyodide.runPythonAsync(
            "_temp_stdout.getvalue()"
          );

          if (
            !output.trim() &&
            !currentInput.includes("=") &&
            !currentInput.includes("(")
          ) {
            const varOutput = await pyodide.runPythonAsync(
              `repr(${currentInput})`
            );
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
      ])) as any;

      setHistory((prev) => [
        ...prev,
        {
          input: currentInput,
          output:
            output.trim() ||
            (result !== undefined ? String(result) : undefined),
        },
      ]);
    } catch (error: any) {
      setHistory((prev) => [
        ...prev,
        {
          input: currentInput,
          output: error.message,
          error: true,
        },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsExecuting(false);
      setCurrentInput("");
      setHistoryIndex(-1);
    }
  }, [currentInput, pyodide, isExecuting, validateCode]);

  const clearTerminal = useCallback(async () => {
    setHistory([]);
    setCurrentInput("");
    setHistoryIndex(-1);

    if (pyodide) {
      try {
        await pyodide.runPythonAsync(`
import sys, gc
keep_modules = {'sys', 'io', 'builtins'}
for name in list(sys.modules.keys()):
    if name not in keep_modules:
        del sys.modules[name]
sys.stdout = sys.original_stdout
gc.collect()
        `);
      } catch (error) {
        console.error("Error clearing terminal:", error);
      }
    }
  }, [pyodide]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleCommand();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length > 0) {
          const newIndex = historyIndex + 1;
          if (newIndex < history.length) {
            setHistoryIndex(newIndex);
            setCurrentInput(history[history.length - 1 - newIndex].input);
          }
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentInput(history[history.length - 1 - newIndex].input);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentInput("");
        }
      }
    },
    [historyIndex, history.length, handleCommand]
  );

  useEffect(() => {
    initPyodide();
  }, [initPyodide]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        securityInfoRef.current &&
        !securityInfoRef.current.contains(event.target as Node)
      ) {
        setShowSecurityInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (initError) {
    return <ErrorScreen error={initError} onRetry={initPyodide} />;
  }

  return (
    <div className={styles.container}>
      <Navbar
        onShowSecurityInfo={() => setShowSecurityInfo(!showSecurityInfo)}
        showSecurityInfo={showSecurityInfo}
        maxExecutionTime={MAX_EXECUTION_TIME}
        maxMemory={MAX_MEMORY}
      />

      <div className='flex-1 overflow-auto p-4 font-mono text-[14px]'>
        <OutputDisplay history={history} />
        <CodeEditor
          editorRef={editorRef}
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          handleKeyDown={handleKeyDown}
        />
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default App;
