import styles from "./BuiltinFunctions.module.css";
import { BUILTIN_FUNCTIONS } from "../../data/builtinFunctions";
import { Icon } from "../Icon/Icon";

interface PythonFunction {
  name: string;
  description: string;
  example: string;
}

interface BuiltinFunctionsProps {
  onExampleClick: (example: string) => void;
  data?: PythonFunction[];
  hideTitle?: boolean;
  searchQuery?: string;
}

export function BuiltinFunctions({
  onExampleClick,
  data = BUILTIN_FUNCTIONS,
  searchQuery = "",
}: BuiltinFunctionsProps) {
  const filteredFunctions = data.filter((fn) =>
    fn.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
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
