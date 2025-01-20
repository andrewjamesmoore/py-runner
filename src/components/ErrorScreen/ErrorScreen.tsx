import { Icon } from "../Icon/Icon";
import styles from "./ErrorScreen.module.css";

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Icon name='alertTriangle' size={24} className={styles.alertIcon} />
        <div className={styles.text}>Initialization Error</div>
        <p className={styles.message}>{error}</p>
        <button onClick={onRetry} className={styles.retryButton}>
          <Icon name='refreshCw' size={14} />
          Retry
        </button>
      </div>
    </div>
  );
}
