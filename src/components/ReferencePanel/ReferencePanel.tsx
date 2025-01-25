import { useRef, useEffect, useState } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./ReferencePanel.module.css";
import { ReferenceContent } from "../ReferenceContent/ReferenceContent";

interface ReferencePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: (code: string) => void;
}

export function ReferencePanel({
  isOpen,
  onClose,
  onExecute,
}: ReferencePanelProps) {
  const [width, setWidth] = useState(600);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handles side panel animation rendering
  useEffect(() => {
    if (isOpen) {
      // First make it visible
      setIsVisible(true);
      // Then trigger animation in next frame
      const animationFrame = requestAnimationFrame(() => {
        const timer = setTimeout(() => {
          setIsAnimating(true);
        }, 50);
        return () => clearTimeout(timer);
      });
      return () => cancelAnimationFrame(animationFrame);
    } else {
      // First remove animation
      setIsAnimating(false);
      // Then hide after animation completes
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = window.innerWidth - e.clientX;
      // Will take up 90% of the screen max
      const maxWidth = window.innerWidth * 0.9;
      // Auto closes at 50px
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

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`${styles.backdrop} ${isAnimating ? styles.open : ""}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={`${styles.panel} ${isAnimating ? styles.open : ""}`}
        style={{ width: `${width}px` }}
      >
        <div
          className={styles.resizeHandle}
          onMouseDown={() => setIsDragging(true)}
        >
          <Icon name='grip' size={16} />
        </div>
        <div className={styles.content}>
          <ReferenceContent onExecute={onExecute} />
        </div>
      </div>
    </>
  );
}
