import React from "react";
import styles from "./SectionButton.module.css";

interface SectionButtonProps {
  /** The label to display inside the pill */
  text: string;
  /** Whether this button is "active"/selected */
  selected: boolean;
  className?: string;

  /** Optional click handler */
  onClick?: () => void;

  /** Section ID for observer to target this button */
  "data-section"?: string;
}

export default function SectionButton({
  text,
  selected,
  onClick,
  className,
  "data-section": dataSection,
}: SectionButtonProps) {
  const isClickable = typeof onClick === "function";

  return (
    <button
      type="button"
      className={`textCaption ${styles.sectionButton} ${
        selected ? styles.selected : ""
      } ${className ?? ""}`}
      data-clickable={isClickable}
      data-section={dataSection}
      aria-disabled={!isClickable}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
