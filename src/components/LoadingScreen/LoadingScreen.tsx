import { Icon } from "../Icon/Icon";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  children?: React.ReactNode;
}

export function LoadingScreen({ children }: LoadingScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Icon name='refreshCw' size={24} className={styles.icon} />
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
}
