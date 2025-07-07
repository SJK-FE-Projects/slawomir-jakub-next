import React from "react";
import styles from "./SectionButton.module.css";

interface SectionButtonProps {
  /** The label to display inside the pill */
  text: string;
  /** Whether this button is “active”/selected */
  selected: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

export default function SectionButton({
  text,
  selected,
  onClick,
}: SectionButtonProps) {
  return (
    <button
      type="button"
      className={`textCaption ${styles.button} ${
        selected ? styles.selected : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
