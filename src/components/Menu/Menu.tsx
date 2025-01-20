import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./Menu.module.css";

interface MenuItem {
  label: string;
  shortcut: string;
  action?: () => void;
  divider?: boolean;
}

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  title?: string;
}

export function Menu({ isOpen, onClose, items, title }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className={styles.menu}>
      {title && <div className={styles.menuTitle}>{title}</div>}
      {items.map((item, index) => (
        <div key={`menu-item-${index}`}>
          <div
            className={styles.menuItem}
            onClick={() => {
              item.action?.();
              onClose();
            }}
            role='button'
            tabIndex={0}
          >
            <span className={styles.label}>{item.label}</span>
            <span className={styles.shortcut}>{item.shortcut}</span>
          </div>
          {item.divider && <div className={styles.divider} />}
        </div>
      ))}
    </div>
  );
}
