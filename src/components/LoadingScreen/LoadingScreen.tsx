import { Icon } from "../Icon/Icon";
import styles from "./LoadingScreen.module.css";

export function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Icon name='refreshCw' size={24} className={styles.icon} />
        <div className={styles.text}>Loading Python Environment...</div>
      </div>
    </div>
  );
}
