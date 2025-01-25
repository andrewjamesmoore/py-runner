import { PyodideInterface } from "pyodide";

const BLOCKED_MODULES = new Set([
  "subprocess",
  "os",
  "sys.modules",
  "importlib",
  "eval",
  "exec",
  "compile",
]);

export async function setupPythonEnvironment(
  pyodideInstance: PyodideInterface
) {
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
    throw new Error("Failed to configure Python environment security settings");
  }
}

export { BLOCKED_MODULES };
