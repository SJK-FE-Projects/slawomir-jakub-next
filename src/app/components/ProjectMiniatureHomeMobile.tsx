"use client";

import Image from "next/image";

import styles from "./ProjectMiniatureHome.module.css";

type ProjectMiniatureHomeMobileProps = {
  cards: string[];
};

export default function ProjectMiniatureHomeMobile({
  cards,
}: ProjectMiniatureHomeMobileProps) {
  return (
    <div className={styles.mobileViewport}>
      <div className={styles.mobileContainer}>
        {cards.map((src, index) => (
          <div key={src} className={styles.mobileSlide}>
            <div className={styles.mobileCard}>
              <Image
                src={src}
                alt={`Project card ${index + 1}`}
                width={800}
                height={500}
                sizes="(max-width: 768px) 72vw, 800px"
                className={styles.image}
                draggable={false}
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
