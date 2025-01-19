import styles from "./OutputDisplay.module.css";
import { DisplayLine } from "./DisplayLine";

interface HistoryEntry {
  input: string;
  output?: string;
  error?: boolean;
}

interface OutputDisplayProps {
  history: HistoryEntry[];
}

export function OutputDisplay({ history }: OutputDisplayProps) {
  return (
    <div className={styles.history}>
      {history.map((entry, index) => (
        <div key={index} className={styles.entry}>
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
  );
}
