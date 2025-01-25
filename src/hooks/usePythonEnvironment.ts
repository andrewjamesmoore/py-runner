import { useState, useCallback } from "react";
import { PyodideInterface, loadPyodide } from "pyodide";
import { setupPythonEnvironment } from "../utils/pythonSecurity";
import { executePythonCode, ExecutionResult } from "../utils/pythonExecution";

export function usePythonEnvironment() {
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const initPyodide = useCallback(async () => {
    setLoading(true);
    setInitError(null);
    try {
      const pyodideInstance = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
        fullStdLib: false,
        stdout: console.log,
        stderr: console.error,
      });
      await setupPythonEnvironment(pyodideInstance);
      setPyodide(pyodideInstance);
    } catch (error) {
      setInitError(
        `Failed to initialize Python environment: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const executeCode = useCallback(
    async (code: string): Promise<ExecutionResult> => {
      if (!pyodide) throw new Error("Python environment not initialized");
      setIsExecuting(true);
      try {
        return await executePythonCode(pyodide, code);
      } finally {
        setIsExecuting(false);
      }
    },
    [pyodide]
  );

  return {
    pyodide,
    loading,
    initError,
    isExecuting,
    initPyodide,
    executeCode,
  };
}
