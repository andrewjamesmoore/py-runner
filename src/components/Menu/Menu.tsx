import { useRef, useEffect } from "react";
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className={styles.menu}>
      {title && <div className={styles.menuTitle}>{title}</div>}
      {items.map((item, index) => (
        <>
          <div
            key={index}
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
        </>
      ))}
    </div>
  );
}
