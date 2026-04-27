"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { m } from "framer-motion";
import styles from "./ProjectMiniatureHome.module.css";

type ProjectMiniatureHomeMobileProps = {
  cards: string[];
};

const OFFSET_VALUES = ["0.8rem", "-0.25rem", "1.2rem", "0.5rem", "1rem"];
const ROTATION_VALUES = [-1.2, 0.8, -0.8, 1.1, -0.6];

export default function ProjectMiniatureHomeMobile({
  cards,
}: ProjectMiniatureHomeMobileProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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

    let resizeObserver: ResizeObserver | null = null;
    let removeWindowListener: (() => void) | null = null;

    if (typeof ResizeObserver !== "undefined") {
      try {
        resizeObserver = new ResizeObserver(updateDragLimit);
        resizeObserver.observe(viewport);
        resizeObserver.observe(container);
      } catch {
        window.addEventListener("resize", updateDragLimit);
        removeWindowListener = () =>
          window.removeEventListener("resize", updateDragLimit);
      }
    } else {
      window.addEventListener("resize", updateDragLimit);
      removeWindowListener = () =>
        window.removeEventListener("resize", updateDragLimit);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      if (removeWindowListener) removeWindowListener();
    };
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
        {cards.map((src, index) => {
          const style = {
            ["--mobile-offset-y"]: OFFSET_VALUES[index % OFFSET_VALUES.length],
            ["--mobile-rotation"]: `${ROTATION_VALUES[index % ROTATION_VALUES.length]}deg`,
          } as unknown as CSSProperties;

          return (
            <div key={src} className={styles.mobileSlide}>
              <div className={styles.mobileCard} style={style}>
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
          );
        })}
      </m.div>
    </div>
  );
}
