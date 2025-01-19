import { AlertTriangle, RefreshCw } from "lucide-react";
import styles from "./ErrorScreen.module.css";

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AlertTriangle size={24} className={styles.alertIcon} />
        <div className={styles.title}>Initialization Error</div>
        <p className={styles.message}>{error}</p>
        <button onClick={onRetry} className={styles.retryButton}>
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    </div>
  );
}
