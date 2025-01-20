import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./Popup.module.css";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Popup({ isOpen, onClose, title, children }: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  useClickOutside(popupRef, onClose, isOpen);
  if (!isOpen) return null;

  return (
    <div ref={popupRef} className={styles.popup}>
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
