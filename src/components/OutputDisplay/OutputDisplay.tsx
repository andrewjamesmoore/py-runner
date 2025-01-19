import { Copy } from "lucide-react";
import { useState } from "react";
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
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className={styles.history}>
      {history.map((entry, index) => (
        <div key={index} className={styles.entry}>
          <div className={styles.line}>
            <div className={styles.input}>
              <span className={styles.inputText}>{entry.input}</span>
            </div>
            <button
              onClick={() => handleCopy(entry.input)}
              className={styles.copyButton}
              title='Copy code'
            >
              <Copy size={14} />
            </button>
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
              <button
                onClick={() => handleCopy(entry.output || "")}
                className={styles.copyButton}
                title='Copy output'
              >
                <Copy size={14} />
              </button>
            </div>
          )}
        </div>
      ))}
      {showCopied && <div className={styles.toast}>Copied to clipboard</div>}
    </div>
  );
}
