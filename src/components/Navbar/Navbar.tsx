import { Terminal, PlayIcon, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Menu } from "../Menu/Menu";
import { Popup } from "../Popup/Popup";
import styles from "./Navbar.module.css";
import popupStyles from "../Popup/Popup.module.css";

interface NavbarProps {
  showSecurityInfo: boolean;
  setShowSecurityInfo: (show: boolean) => void;
  maxExecutionTime: number;
  maxMemory: number;
  onExecute: () => void;
  onClear: () => void;
}

export function Navbar({
  showSecurityInfo,
  setShowSecurityInfo,
  maxExecutionTime,
  maxMemory,
  onExecute,
  onClear,
}: NavbarProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <PlayIcon size={14} className={`${styles.logo} animate-pulse`} />
        <div className={styles.title}>PyRunner</div>
      </div>
      <div className={styles.rightSection}>
        <div className='relative'>
          <button
            onClick={() => setShowSecurityInfo(true)}
            className={styles.navButton}
            aria-label='Security Information'
            title='Security'
          >
            <ShieldAlert size={20} className={styles.navIcon} />
          </button>
          <Popup
            isOpen={showSecurityInfo}
            onClose={() => setShowSecurityInfo(false)}
            title='Security Notice'
          >
            <>
              <p className={popupStyles.text}>
                This is a sandboxed Python environment for educational purposes.
              </p>
              <p className={popupStyles.subhead}>For security reasons:</p>
              <ul className={popupStyles.list}>
                <li className={popupStyles.listItem}>
                  File system operations are disabled
                </li>
                <li className={popupStyles.listItem}>
                  System commands are blocked
                </li>
                <li className={popupStyles.listItem}>
                  Code execution is limited to {maxExecutionTime / 1000} seconds
                </li>
                <li className={popupStyles.listItem}>
                  Memory usage is limited to {maxMemory / (1024 * 1024)}MB
                </li>
              </ul>
            </>
          </Popup>
        </div>
        <div className='relative'>
          <button
            onClick={() => setShowShortcuts(true)}
            className={styles.navButton}
            aria-label='Keyboard Shortcuts'
            title='Commands'
          >
            <Terminal size={20} className={styles.navIcon} />
          </button>
          <Menu
            isOpen={showShortcuts}
            onClose={() => setShowShortcuts(false)}
            title='Commands'
            items={[
              {
                label: "Run program",
                shortcut: "⌘ + enter",
                action: onExecute,
              },
              {
                label: "Reset console",
                shortcut: "clear",
                action: onClear,
                divider: true,
              },
            ]}
          />
        </div>
        <div className='relative'>
          <button
            onClick={onExecute}
            className={styles.runButton}
            title='Run Program'
          >
            Run
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
