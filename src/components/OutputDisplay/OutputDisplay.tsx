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
    <>
      {history.map((entry, index) => (
        <div key={index} className={styles.entry}>
          <div className={styles.input}>
            <span className={styles.inputText}>{entry.input}</span>
          </div>
          {entry.output && (
            <div
              className={`${styles.output} ${
                entry.error ? styles.errorOutput : styles.successOutput
              }`}
            >
              {entry.output}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
