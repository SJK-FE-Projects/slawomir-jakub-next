"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import type { CSSProperties, RefObject } from "react";
import { LazyMotion, domMax, m } from "framer-motion";

import styles from "./ProjectMiniatureHome.module.css";

type ProjectMiniatureHomeDesktopProps = {
  cards: string[];
  constraintsRef: RefObject<HTMLDivElement | null>;
};

const OFFSET_VALUES = [
  "1.8rem",
  "-0.5rem",
  "3.1rem",
  "1.9rem",
  "2.2rem",
  "1.9rem",
];
const ROTATION_VALUES = [-2.5, 0.8, -1.6, 1.4, -0.9, 1.9];
const BASE_Z_INDEX = [1, 4, 3, 2, 2, 1];

export default function ProjectMiniatureHomeDesktop({
  cards,
  constraintsRef,
}: ProjectMiniatureHomeDesktopProps) {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const bringToFront = useCallback((index: number) => {
    const highestZ = Math.max(
      ...cardRefs.current.map((node) =>
        Number.parseInt(node?.style.zIndex ?? "0", 10),
      ),
      0,
    );

    const currentNode = cardRefs.current[index];
    if (currentNode) {
      currentNode.style.zIndex = String(highestZ + 1);
    }
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <div className={styles.desktopRow}>
        {cards.map((src, index) => (
          <m.div
            key={src}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className={styles.desktopDragSlot}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0}
            onTapStart={() => bringToFront(index)}
            style={{ zIndex: BASE_Z_INDEX[index % BASE_Z_INDEX.length] }}
          >
            <div
              className={styles.desktopCard}
              style={
                {
                  "--offset-y": OFFSET_VALUES[index % OFFSET_VALUES.length],
                  "--rotation": `${ROTATION_VALUES[index % ROTATION_VALUES.length]}deg`,
                } as CSSProperties
              }
            >
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
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
}
