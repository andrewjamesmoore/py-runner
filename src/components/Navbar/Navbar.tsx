import {
  Terminal as Info,
  AlertTriangle,
  Keyboard,
  PlayIcon,
} from "lucide-react";
import { useState } from "react";
import { Popup } from "../Popup/Popup";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onShowSecurityInfo: () => void;
  showSecurityInfo: boolean;
  maxExecutionTime: number;
  maxMemory: number;
}

export function Navbar({
  onShowSecurityInfo,
  showSecurityInfo,
  maxExecutionTime,
  maxMemory,
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
            onClick={() => setShowShortcuts(true)}
            className={styles.navButton}
            aria-label='Keyboard Shortcuts'
          >
            <Keyboard size={20} className={styles.navIcon} />
          </button>
          <Popup
            isOpen={showShortcuts}
            onClose={() => setShowShortcuts(false)}
            icon={<Keyboard size={20} />}
            title='Keyboard Shortcuts'
          >
            <ul>
              <li>Enter: Run code</li>
              <li>Shift + Enter: New line</li>
              <li>↑↓: Navigate history</li>
              <li>Type 'clear': Clear console</li>
            </ul>
          </Popup>
        </div>

        <div className='relative'>
          <button
            onClick={onShowSecurityInfo}
            className={styles.navButton}
            aria-label='Security Information'
          >
            <Info size={20} className={styles.navIcon} />
          </button>
          <Popup
            isOpen={showSecurityInfo}
            onClose={onShowSecurityInfo}
            icon={<AlertTriangle size={20} />}
            title='Security Notice'
          >
            <p>This is a sandboxed Python environment. For security reasons:</p>
            <ul>
              <li>File system operations are disabled</li>
              <li>System commands are blocked</li>
              <li>
                Code execution is limited to {maxExecutionTime / 1000} seconds
              </li>
              <li>Memory usage is limited to {maxMemory / (1024 * 1024)}MB</li>
            </ul>
          </Popup>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
