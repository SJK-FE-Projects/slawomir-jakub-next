"use client";

import React from "react";
import Link from "next/link";
import styles from "./SectionButton.module.css";

interface SectionButtonProps {
  /** The label to display inside the pill */
  text: string;
  /** Whether this button is "active"/selected */
  selected: boolean;
  className?: string;

  /** Optional click handler */
  onClick?: () => void;

  href?: string;

  /** Section ID for observer to target this button */
  "data-section"?: string;
}

export default function SectionButton({
  text,
  selected,
  onClick,
  href,
  className,
  "data-section": dataSection,
}: SectionButtonProps) {
  const isClickable = typeof onClick === "function";
  const classes = `textCaption ${styles.sectionButton} ${
    selected ? styles.selected : ""
  } ${className ?? ""}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        data-clickable={true}
        data-section={dataSection}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      data-clickable={isClickable}
      data-section={dataSection}
      aria-disabled={!isClickable}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
