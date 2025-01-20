import { Icon } from "../Icon/Icon";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href='https://github.com/andrewjamesmoore/py-runner'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}
        title='View on GitHub'
      >
        <Icon name='github' size={14} />
      </a>
    </footer>
  );
}
