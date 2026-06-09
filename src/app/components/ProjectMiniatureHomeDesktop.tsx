"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import {
  LazyMotion,
  domMax,
  m,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import styles from "./ProjectMiniatureHome.module.css";

type ProjectMiniatureHomeDesktopProps = {
  cards: string[];
  constraintsRef: RefObject<HTMLDivElement | null>;
};

const OFFSET_VALUES = [
  "1.8rem",
  "-0.5rem",
  "1.1rem",
  "1.9rem",
  "-2.2rem",
  "1.9rem",
];
const ROTATION_VALUES = [-2.5, 0.8, -1.6, 1.4, -2.9, 1.9];
const BASE_Z_INDEX = [1, 4, 3, 2, 2, 1];
const BASE_CARD_WIDTH = 640;
const BASE_CARD_GAP = 8;

const createSeededValue = (seed: number) => {
  const next = Math.sin(seed * 12.9898) * 43758.5453;
  return next - Math.floor(next);
};

type DesktopCardSlotProps = {
  src: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  cardWidth: number;
  reducedMotion: boolean;
  measureRef?: RefObject<HTMLDivElement | null> | null;
};

function DesktopCardSlot({
  src,
  index,
  scrollYProgress,
  cardWidth,
  reducedMotion,
  measureRef = null,
}: DesktopCardSlotProps) {
  const rotationSeed = createSeededValue(index + 1);
  const overlapSeed = createSeededValue((index + 1) * 7.3);

  const overlapRatio = 0.1 + overlapSeed * 0.4;
  const collapseDistance = BASE_CARD_GAP + cardWidth * overlapRatio;
  const slotX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -index * collapseDistance],
  );

  const rotation = `${(
    ROTATION_VALUES[index % ROTATION_VALUES.length] +
    (rotationSeed * 2 - 1) * 1.2
  ).toFixed(2)}deg`;

  return (
    <m.div
      ref={measureRef ?? undefined}
      className={styles.desktopCardSlot}
      style={{
        zIndex: BASE_Z_INDEX[index % BASE_Z_INDEX.length],
        x: reducedMotion ? 0 : slotX,
      }}
    >
      <div
        className={styles.desktopCard}
        style={
          {
            "--offset-y": OFFSET_VALUES[index % OFFSET_VALUES.length],
            "--rotation": rotation,
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
  );
}

export default function ProjectMiniatureHomeDesktop({
  cards,
  constraintsRef,
}: ProjectMiniatureHomeDesktopProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardMeasureRef = useRef<HTMLDivElement | null>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [cardWidth, setCardWidth] = useState(BASE_CARD_WIDTH);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const updateLayoutMetrics = () => {
      const viewportNode = viewportRef.current;
      const trackNode = trackRef.current;
      const cardNode = firstCardMeasureRef.current;

      if (viewportNode && trackNode) {
        setTravelDistance(
          Math.max(0, trackNode.scrollWidth - viewportNode.clientWidth),
        );
      }

      if (cardNode) {
        setCardWidth(cardNode.getBoundingClientRect().width || BASE_CARD_WIDTH);
      }
    };

    updateLayoutMetrics();

    const resizeObserver = new ResizeObserver(updateLayoutMetrics);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    if (firstCardMeasureRef.current) {
      resizeObserver.observe(firstCardMeasureRef.current);
    }

    window.addEventListener("resize", updateLayoutMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayoutMetrics);
    };
  }, [cards.length]);

  const { scrollYProgress } = useScroll({
    target: constraintsRef,
    offset: ["start center", "end center"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travelDistance]);
  const x = useSpring(rawX, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  const stageHeight = `calc(100vh + ${travelDistance}px)`;

  return (
    <LazyMotion features={domMax} strict>
      <div className={styles.desktopStage} style={{ height: stageHeight }}>
        <div ref={viewportRef} className={styles.desktopStickyViewport}>
          <m.div
            ref={trackRef}
            className={styles.desktopTrack}
            style={reducedMotion ? undefined : { x }}
          >
            {cards.map((src, index) => (
              <DesktopCardSlot
                key={src}
                src={src}
                index={index}
                scrollYProgress={scrollYProgress}
                cardWidth={cardWidth}
                reducedMotion={Boolean(reducedMotion)}
                measureRef={index === 0 ? firstCardMeasureRef : null}
              />
            ))}
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
