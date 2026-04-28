"use client";

import Image from "next/image";
import {
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const activePointerIdRef = useRef<number | null>(null);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport) return;

    isDraggingRef.current = true;
    activePointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (
      !viewport ||
      !isDraggingRef.current ||
      activePointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const deltaX = event.clientX - startXRef.current;
    viewport.scrollLeft = startScrollLeftRef.current - deltaX;
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || activePointerIdRef.current !== event.pointerId) {
      return;
    }

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    isDraggingRef.current = false;
    activePointerIdRef.current = null;
  };

  return (
    <div
      ref={viewportRef}
      className={styles.mobileViewport}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <div className={styles.mobileContainer}>
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
      </div>
    </div>
  );
}
