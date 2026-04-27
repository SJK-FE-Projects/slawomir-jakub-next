"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { m } from "framer-motion";

import styles from "./ProjectMiniatureHome.module.css";

type ProjectMiniatureHomeMobileProps = {
  cards: string[];
};

export default function ProjectMiniatureHomeMobile({
  cards,
}: ProjectMiniatureHomeMobileProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const container = containerRef.current;
    if (!viewport || !container) return;

    const updateDragLimit = () => {
      const overflowWidth = container.scrollWidth - viewport.clientWidth;
      setDragLimit(Math.max(0, overflowWidth));
    };

    updateDragLimit();

    const resizeObserver = new ResizeObserver(() => updateDragLimit());
    resizeObserver.observe(viewport);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [cards.length]);

  return (
    <div ref={viewportRef} className={styles.mobileViewport}>
      <m.div
        ref={containerRef}
        className={styles.mobileContainer}
        drag="x"
        dragConstraints={{ left: -dragLimit, right: 0 }}
        dragMomentum={false}
        dragElastic={0}
      >
        {cards.map((src, index) => (
          <div key={src} className={styles.mobileSlide}>
            <div className={styles.mobileCard}>
              <Image
                src={src}
                alt={`Project card ${index + 1}`}
                width={600}
                height={300}
                sizes="(max-width: 768px) 60vw, 800px"
                className={styles.image}
                draggable={false}
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </m.div>
    </div>
  );
}
