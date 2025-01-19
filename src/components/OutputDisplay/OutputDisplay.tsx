import styles from "./OutputDisplay.module.css";

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
          <div className={styles.line}>
            <div className={styles.input}>
              <span className={styles.inputText}>{entry.input}</span>
            </div>
          </div>
          {entry.output && (
            <div className={styles.line}>
              <div
                className={`${styles.output} ${
                  entry.error ? styles.errorOutput : styles.successOutput
                }`}
              >
                {entry.output}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
