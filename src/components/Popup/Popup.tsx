import { useRef, useEffect } from "react";
import styles from "./Popup.module.css";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export function Popup({ isOpen, onClose, icon, title, children }: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
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
    <div ref={popupRef} className={styles.popup}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.icon}>{icon}</div>
          <div>
            <h3 className={styles.title}>{title}</h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
