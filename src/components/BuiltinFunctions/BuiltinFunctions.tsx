import { useState } from "react";
import styles from "./BuiltinFunctions.module.css";
import { BUILTIN_FUNCTIONS } from "../../data/builtinFunctions";
import { Icon } from "../Icon/Icon";

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
                <Icon name='play' size={12} />
                Run it
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
