import { useState } from "react";
import { Play, Search, Terminal } from "lucide-react";
import styles from "./BuiltinFunctions.module.css";

interface PythonFunction {
  name: string;
  description: string;
  example: string;
}

const BUILTIN_FUNCTIONS: PythonFunction[] = [
  {
    name: "abs(x)",
    description: "Return the absolute value of a number",
    example: "abs(-5)  # Returns: 5",
  },
  {
    name: "len(obj)",
    description: "Return the length (number of items) of an object",
    example: 'len("hello")  # Returns: 5',
  },
  // Add more functions here...
];

interface BuiltinFunctionsProps {
  onExampleClick: (example: string) => void;
}

export function BuiltinFunctions({ onExampleClick }: BuiltinFunctionsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFunctions = BUILTIN_FUNCTIONS.filter((fn) =>
    fn.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Built-in Functions</h2>
        <div className={styles.searchBar}>
          <input
            type='text'
            placeholder='Filter results...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.functionList}>
        {filteredFunctions.map((fn) => (
          <div key={fn.name} className={styles.functionCard}>
            <div className={styles.functionHeader}>
              <div className={styles.functionMeta}>
                <div className={styles.functionName}>{fn.name}</div>
                <div className={styles.description}>{fn.description}</div>
              </div>
            </div>
            <div className={styles.example}>
              <code>{fn.example}</code>
              <button
                onClick={() => onExampleClick(fn.example)}
                className={styles.copyButton}
                title='Paste in console'
              >
                <Play size={12} />
                Run it
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
