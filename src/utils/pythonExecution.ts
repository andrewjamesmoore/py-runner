import { PyodideInterface } from "pyodide";

export interface ExecutionResult {
  result: unknown;
  output: string;
}

export const MAX_EXECUTION_TIME = 5000;
export const MAX_MEMORY = 50 * 1024 * 1024;

export async function executePythonCode(
  pyodide: PyodideInterface,
  input: string
): Promise<ExecutionResult> {
  await pyodide.runPythonAsync(
    "_temp_stdout = io.StringIO()\nsys.stdout = _temp_stdout"
  );

  try {
    const result = await pyodide.runPythonAsync(input);
    const output = await pyodide.runPythonAsync("_temp_stdout.getvalue()");

    if (!output.trim() && !input.includes("=") && !input.includes("(")) {
      const varOutput = await pyodide.runPythonAsync(`repr(${input})`);
      return { result, output: varOutput };
    }

    return { result, output };
  } finally {
    await pyodide.runPythonAsync(
      "sys.stdout = sys.original_stdout\ndel _temp_stdout"
    );
  }
}
