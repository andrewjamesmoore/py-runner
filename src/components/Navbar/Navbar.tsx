import { Terminal, PlayIcon, ShieldAlert, BookOpen } from "lucide-react";
import { useState } from "react";
import { Menu } from "../Menu/Menu";
import { Popup } from "../Popup/Popup";
import styles from "./Navbar.module.css";
import popupStyles from "../Popup/Popup.module.css";

interface NavbarProps {
  showSecurityInfo: boolean;
  setShowSecurityInfo: (show: boolean) => void;
  showReference: boolean;
  setShowReference: (show: boolean) => void;
  maxExecutionTime: number;
  maxMemory: number;
  onExecute: () => void;
  onClear: () => void;
}

export function Navbar({
  showSecurityInfo,
  setShowSecurityInfo,
  showReference,
  setShowReference,
  maxExecutionTime,
  maxMemory,
  onExecute,
  onClear,
}: NavbarProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  const menuItems = [
    {
      label: "Run program",
      shortcut: "⌘ + enter",
      action: onExecute,
    },
    {
      label: "Reset console",
      shortcut: "clear",
      action: onClear,
    },
    {
      label: "Python Reference",
      shortcut: "⌘ + k",
      action: () => {
        setShowReference(!showReference);
        setShowShortcuts(false); // Close the menu after clicking
      },
      divider: true,
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <PlayIcon size={14} className={styles.logo} />
        <div className={styles.title}>PyRunner</div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.menuContainer}>
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
        <div className={styles.menuContainer}>
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
            items={menuItems}
          />
        </div>
        <div className={styles.menuContainer}>
          <button
            onClick={() => setShowReference(!showReference)}
            className={styles.navButton}
            aria-label='Python Reference'
            title='Reference'
          >
            <BookOpen size={20} className={styles.navIcon} />
          </button>
        </div>
        <div className={styles.menuContainer}>
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
