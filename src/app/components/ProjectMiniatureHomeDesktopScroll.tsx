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
  useTransform,
  useSpring,
} from "framer-motion";

import styles from "./ProjectMiniatureHome.module.css";

type ProjectMiniatureHomeDesktopProps = {
  cards: string[];
  constraintsRef: RefObject<HTMLDivElement | null>;
  onTravelDistanceChange?: (travelDistance: number) => void;
};

const OFFSET_VALUES = [
  "-1.8rem",
  "-0.5rem",
  "1.1rem",
  "1.9rem",
  "-2.2rem",
  "1.9rem",
];
// 2× more rotation variety
const ROTATION_VALUES = [-5.5, 3.2, -7.1, 4.8, -2.9, 6.3, -4.4, 2.1, -6.8, 5.5];
const BASE_Z_INDEX = [1, 4, 3, 2, 2, 1];
const BASE_CARD_WIDTH = 640;
const BASE_CARD_GAP = 16;

const createSeededValue = (seed: number) => {
  const next = Math.sin(seed * 12.9898) * 43758.5453;
  return next - Math.floor(next);
};

type DesktopCardSlotProps = {
  src: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  cardWidth: number;
  naturalX: number;
  reducedMotion: boolean;
  measureRef?: RefObject<HTMLDivElement | null> | null;
};

function DesktopCardSlot({
  src,
  index,
  total,
  scrollYProgress,
  cardWidth,
  naturalX,
  reducedMotion,
  measureRef = null,
}: DesktopCardSlotProps) {
  const rotationSeed = createSeededValue(index + 1);
  const stackSeed = createSeededValue((index + 1) * 7.3);
  const driftSeed = createSeededValue((index + 1) * 3.7);

  const stackRatio = 0.3 + stackSeed * 1.4;
  const driftAmount = cardWidth * (0.1 + driftSeed * 0.6);

  const segSize = 1 / Math.max(total - 1, 1);
  const segStart = (index - 1) * segSize;
  const segEnd = index * segSize;
  const driftStart = 2.5;

  const stackedX = naturalX * (1 - stackRatio);
  const driftedX = stackedX - driftAmount;

  const rawSlotX = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [Math.max(0, segStart), Math.min(driftStart, segEnd), driftStart, 1],
    index === 0 ? [0, 0] : [naturalX, stackedX, stackedX, driftedX],
  );

  const slotX = useSpring(rawSlotX, { stiffness: 100, damping: 40, mass: 0.5 });

  // 4. More rotation variety: wider base values + stronger seed influence
  const baseRotation = ROTATION_VALUES[index % ROTATION_VALUES.length];
  const rotation = `${(baseRotation + (rotationSeed * 2 - 1) * 3.5).toFixed(2)}deg`;

  return (
    <m.div
      ref={measureRef ?? undefined}
      className={styles.desktopCardSlot}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: BASE_Z_INDEX[index % BASE_Z_INDEX.length],
        x: reducedMotion ? naturalX : slotX,
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
          draggable={true}
          priority={index === 0}
        />
      </div>
    </m.div>
  );
}

export default function ProjectMiniatureHomeDesktopScroll({
  cards,
  constraintsRef,
  onTravelDistanceChange,
}: ProjectMiniatureHomeDesktopProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardMeasureRef = useRef<HTMLDivElement | null>(null);
  const lastCardMeasureRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(BASE_CARD_WIDTH);
  const [cardHeight, setCardHeight] = useState(0);
  const reducedMotion = useReducedMotion();

  // 1. Padding so the first card's left border isn't cut — matches the 16px overflow
  const LEFT_PADDING = 16;

  const naturalPositions = cards.map(
    (_, i) => LEFT_PADDING + i * (cardWidth + BASE_CARD_GAP),
  );
  const totalSpread =
    cards.length > 0
      ? naturalPositions[cards.length - 1] + cardWidth + LEFT_PADDING
      : 0;

  useEffect(() => {
    const updateLayoutMetrics = () => {
      const cardNode = firstCardMeasureRef.current;
      if (cardNode) {
        const rect = cardNode.getBoundingClientRect();
        setCardWidth(rect.width || BASE_CARD_WIDTH);
        setCardHeight(rect.height || 0);
      }
    };

    updateLayoutMetrics();

    const resizeObserver = new ResizeObserver(updateLayoutMetrics);
    if (firstCardMeasureRef.current)
      resizeObserver.observe(firstCardMeasureRef.current);
    if (constraintsRef.current) resizeObserver.observe(constraintsRef.current);
    window.addEventListener("resize", updateLayoutMetrics);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayoutMetrics);
    };
  }, [cards.length, constraintsRef]);

  useEffect(() => {
    onTravelDistanceChange?.(totalSpread);
  }, [totalSpread, onTravelDistanceChange]);

  // 2. Scroll starts only when the section enters view and ends only when
  //    the last card is fully in the viewport — use "end end" for the exit offset.
  const { scrollYProgress } = useScroll({
    target: constraintsRef,
    offset: ["start start", "end end"],
  });

  return (
    // 3. desktopStickyFragment is the element wrapping cards + "See more" button
    //    in ProjectMiniatureHome. The gap between them is on .desktopStickyFragment
    //    in the CSS module. We need the track height to be explicit so the flex
    //    gap on .desktopStickyFragment actually has something to push against.
    <LazyMotion features={domMax} strict>
      <div
        ref={trackRef}
        className={styles.desktopTrack}
        style={{
          position: "relative",
          width: totalSpread,
          // Explicit height so .desktopStickyFragment's gap/margin to the
          // "See more" button is preserved — without this the track collapses
          // and the CSS gap has nothing to space against.
          height: cardHeight || undefined,
          transform: "none",
          overflow: "visible",
        }}
      >
        {cards.map((src, index) => (
          <DesktopCardSlot
            key={src}
            src={src}
            index={index}
            total={cards.length}
            scrollYProgress={scrollYProgress}
            cardWidth={cardWidth}
            naturalX={naturalPositions[index]}
            reducedMotion={Boolean(reducedMotion)}
            measureRef={
              index === 0
                ? firstCardMeasureRef
                : index === cards.length - 1
                  ? lastCardMeasureRef
                  : null
            }
          />
        ))}
      </div>
    </LazyMotion>
  );
}
