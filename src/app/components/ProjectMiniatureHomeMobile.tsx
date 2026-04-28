"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import styles from "./ProjectMiniatureHome.module.css";

type ProjectMiniatureHomeMobileProps = {
  cards: string[];
};

const OFFSET_VALUES = ["0.8rem", "-0.25rem", "1.2rem", "0.5rem", "1rem"];
const ROTATION_VALUES = [-1.2, 0.8, -0.8, 1.1, -0.6];

export default function ProjectMiniatureHomeMobile({
  cards,
}: ProjectMiniatureHomeMobileProps) {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const transformRef = useRef<{ [key: number]: { x: number; y: number } }>({});
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTransformRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handlePointerDown = (
    index: number,
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    setDraggedIndex(index);
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    startTransformRef.current = transformRef.current[index] || { x: 0, y: 0 };

    const card = cardRefs.current[index];
    if (card) {
      card.setPointerCapture(event.pointerId);
      card.style.cursor = "grabbing";
      card.style.transition = "none";
      card.style.zIndex = "100";
    }
  };

  const handlePointerMove = (
    index: number,
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (draggedIndex !== index) return;

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRefs.current[index];
      if (card) {
        const newX = startTransformRef.current.x + deltaX;
        const newY = startTransformRef.current.y + deltaY;
        card.style.transform = `translate(${newX}px, ${newY}px)`;
        transformRef.current[index] = { x: newX, y: newY };
      }
    });
  };

  const handlePointerUp = (
    index: number,
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (draggedIndex !== index) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const card = cardRefs.current[index];
    if (card) {
      if (card.hasPointerCapture(event.pointerId)) {
        card.releasePointerCapture(event.pointerId);
      }
      card.style.cursor = "grab";
      card.style.transition = "transform 0.3s ease-out";
      card.style.transform = "translate(0px, 0px)";
      card.style.zIndex = "0";
      transformRef.current[index] = { x: 0, y: 0 };
    }

    setDraggedIndex(null);
  };

  return (
    <div className={styles.mobileViewport}>
      <div className={styles.mobileContainer}>
        {cards.map((src, index) => {
          const style = {
            ["--mobile-offset-y"]: OFFSET_VALUES[index % OFFSET_VALUES.length],
            ["--mobile-rotation"]: `${ROTATION_VALUES[index % ROTATION_VALUES.length]}deg`,
          } as unknown as CSSProperties;

          return (
            <div
              key={src}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={styles.mobileDragSlot}
              onPointerDown={(e) => handlePointerDown(index, e)}
              onPointerMove={(e) => handlePointerMove(index, e)}
              onPointerUp={(e) => handlePointerUp(index, e)}
              onPointerCancel={(e) => handlePointerUp(index, e)}
              style={{
                cursor: draggedIndex === index ? "grabbing" : "grab",
              }}
            >
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
