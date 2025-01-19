import { useRef, useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
import styles from "./ReferencePanel.module.css";

interface ReferencePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferencePanel({ isOpen, onClose }: ReferencePanelProps) {
  const [width, setWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = window.innerWidth - e.clientX;
      const maxWidth = window.innerWidth * 0.9;
      const minWidth = 50;

      if (newWidth < 50) {
        onClose();
        return;
      }

      if (newWidth > minWidth && newWidth < maxWidth) {
        setWidth(newWidth);
        document.documentElement.style.setProperty(
          "--panel-width",
          `${newWidth}px`
        );
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onClose]);

  // Set initial width when panel opens
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty("--panel-width", `${width}px`);
    }
  }, [isOpen, width]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={`${styles.panel} ${isOpen ? styles.open : ""}`}
      style={{ width: `${width}px` }}
    >
      <div
        className={styles.resizeHandle}
        onMouseDown={() => setIsDragging(true)}
      >
        <GripVertical size={16} />
      </div>
      <div className={styles.header}>
        <h2 className={styles.title}>Python Reference</h2>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
      <div className={styles.content}>
        {/* Your reference content goes here */}
        {/* This div will be scrollable */}
      </div>
    </div>
  );
}
