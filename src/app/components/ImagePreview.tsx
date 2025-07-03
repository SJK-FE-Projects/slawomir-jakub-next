"use client";

import React from "react";
import Image from "next/image";
import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
  src: string;
  alt: string;
  projectId?: string; // Made optional since it's not used in the component
  isOpen: boolean;
  onClose: () => void;
}

export default function ImagePreview({
  src,
  alt,
  isOpen,
  onClose,
}: ImagePreviewProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of $ {
                alt
            }

            `}
    >
      {" "}
      <div className={styles.container}>
        {" "}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close preview"
        >
          {" "}
          ×{" "}
        </button>{" "}
        <div className={styles.imageContainer}>
          {" "}
          <Image
            src={src}
            alt={alt}
            fill
            style={{
              objectFit: "contain",
            }}
            priority
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
