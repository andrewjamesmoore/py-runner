import { Icon } from "../Icon/Icon";
import { useState } from "react";
import { Toast } from "../Toast/Toast";
import styles from "./DisplayLine.module.css";

interface DisplayLineProps {
  text: string;
  type: "input" | "output";
  error?: boolean;
}

// Used to show either the output from a command or the command itself in a history view
export function DisplayLine({ text, type, error }: DisplayLineProps) {
  const [showCopied, setShowCopied] = useState(false);
  const isOutput = type === "output";

  //   users can copy a previous command and reuse it by pasting it into the console with this shortcut icon
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className={styles.line}>
      <div
        className={`${styles.content} ${
          isOutput ? styles.output : styles.input
        } ${error ? styles.errorOutput : isOutput ? styles.successOutput : ""}`}
      >
        <span className={styles.text}>{text}</span>
      </div>
      <button
        onClick={handleCopy}
        className={styles.copyButton}
        title={`Copy ${type}`}
      >
        <Icon name='copy' size={14} />
      </button>
      {showCopied && <Toast message='Copied to clipboard' />}
    </div>
  );
}
