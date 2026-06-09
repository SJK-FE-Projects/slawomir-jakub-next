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
import { useMediaQuery } from "../hooks/useMediaQuery";

type ProjectMiniatureHomeScrollProps = {
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
const MOBILE_OFFSET_VALUES = ["1.8rem", "-0.25rem", "1.2rem", "0.5rem", "1rem"];
const MOBILE_ROTATION_VALUES = [-1.4, 0.8, -1.8, 3.1, -0.6];

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

type MobileCardSlotProps = {
  src: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  cardWidth: number;
  viewportWidth: number;
  naturalX: number;
  reducedMotion: boolean;
  measureRef?: RefObject<HTMLDivElement | null> | null;
};

function MobileCardSlot({
  src,
  index,
  total,
  scrollYProgress,
  cardWidth,
  viewportWidth,
  naturalX,
  reducedMotion,
  measureRef = null,
}: MobileCardSlotProps) {
  const segSize = 1 / Math.max(total - 1, 1);
  const segStart = (index - 1) * segSize;
  const segEnd = index * segSize;

  const sidePadding = 0;
  const visibleStackWidth = Math.max(0, viewportWidth - cardWidth);
  const stackStep =
    total > 1 ? Math.min(cardWidth / 3, visibleStackWidth / (total - 1)) : 0;
  const stackedX = sidePadding + index * stackStep;

  const rawSlotX = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [Math.max(0, segStart), Math.min(1, segEnd), 1],
    index === 0 ? [0, 0] : [naturalX, stackedX, stackedX],
  );

  const slotX = useSpring(rawSlotX, { stiffness: 100, damping: 20, mass: 0.5 });

  return (
    <m.div
      ref={measureRef ?? undefined}
      className={styles.mobileScrollSlot}
      style={{
        position: "absolute",
        left: -16,
        top: -16,
        x: reducedMotion ? naturalX : slotX,
        zIndex: index + 1,
      }}
    >
      <div
        className={styles.mobileCard}
        style={
          {
            "--mobile-offset-y":
              MOBILE_OFFSET_VALUES[index % MOBILE_OFFSET_VALUES.length],
            "--mobile-rotation": `${MOBILE_ROTATION_VALUES[index % MOBILE_ROTATION_VALUES.length]}deg`,
          } as CSSProperties
        }
      >
        <Image
          src={src}
          alt={`Project card ${index + 1}`}
          width={600}
          height={300}
          sizes="68vw"
          className={styles.image}
          draggable={false}
          priority={index === 0}
        />
      </div>
    </m.div>
  );
}

function ProjectMiniatureHomeDesktopTrack({
  cards,
  constraintsRef,
  onTravelDistanceChange,
}: ProjectMiniatureHomeScrollProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardMeasureRef = useRef<HTMLDivElement | null>(null);
  const lastCardMeasureRef = useRef<HTMLDivElement | null>(null);
  const layoutFrameRef = useRef<number | null>(null);
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
        const nextCardWidth = rect.width || BASE_CARD_WIDTH;
        const nextCardHeight = rect.height || 0;

        setCardWidth((currentCardWidth) =>
          currentCardWidth === nextCardWidth ? currentCardWidth : nextCardWidth,
        );
        setCardHeight((currentCardHeight) =>
          currentCardHeight === nextCardHeight
            ? currentCardHeight
            : nextCardHeight,
        );
      }
    };

    const scheduleLayoutMetricsUpdate = () => {
      if (layoutFrameRef.current !== null) {
        cancelAnimationFrame(layoutFrameRef.current);
      }

      layoutFrameRef.current = requestAnimationFrame(() => {
        layoutFrameRef.current = null;
        updateLayoutMetrics();
      });
    };

    scheduleLayoutMetricsUpdate();

    const resizeObserver = new ResizeObserver(scheduleLayoutMetricsUpdate);
    if (firstCardMeasureRef.current)
      resizeObserver.observe(firstCardMeasureRef.current);
    if (constraintsRef.current) resizeObserver.observe(constraintsRef.current);
    window.addEventListener("resize", scheduleLayoutMetricsUpdate);
    return () => {
      if (layoutFrameRef.current !== null) {
        cancelAnimationFrame(layoutFrameRef.current);
        layoutFrameRef.current = null;
      }
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleLayoutMetricsUpdate);
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

function ProjectMiniatureHomeMobileTrack({
  cards,
  constraintsRef,
  onTravelDistanceChange,
}: ProjectMiniatureHomeScrollProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardMeasureRef = useRef<HTMLDivElement | null>(null);
  const lastCardMeasureRef = useRef<HTMLDivElement | null>(null);
  const layoutFrameRef = useRef<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const reducedMotion = useReducedMotion();

  const MOBILE_LEFT_PADDING = 0;
  const MOBILE_CARD_GAP = 16;

  const naturalPositions = cards.map(
    (_, index) => MOBILE_LEFT_PADDING + index * (cardWidth + MOBILE_CARD_GAP),
  );
  const totalSpread =
    cards.length > 0 && cardWidth > 0
      ? naturalPositions[cards.length - 1] + cardWidth + MOBILE_LEFT_PADDING
      : 0;

  useEffect(() => {
    const updateLayoutMetrics = () => {
      const viewportNode = viewportRef.current;
      const cardNode = firstCardMeasureRef.current;

      if (!viewportNode || !cardNode) {
        setViewportWidth((currentViewportWidth) =>
          currentViewportWidth === 0 ? currentViewportWidth : 0,
        );
        setCardWidth((currentCardWidth) =>
          currentCardWidth === 0 ? currentCardWidth : 0,
        );
        setCardHeight((currentCardHeight) =>
          currentCardHeight === 0 ? currentCardHeight : 0,
        );
        return;
      }

      const nextViewportWidth = viewportNode.clientWidth;
      const rect = cardNode.getBoundingClientRect();
      const nextCardWidth = rect.width;
      const nextCardHeight = rect.height;

      setViewportWidth((currentViewportWidth) =>
        currentViewportWidth === nextViewportWidth
          ? currentViewportWidth
          : nextViewportWidth,
      );
      setCardWidth((currentCardWidth) =>
        currentCardWidth === nextCardWidth ? currentCardWidth : nextCardWidth,
      );
      setCardHeight((currentCardHeight) =>
        currentCardHeight === nextCardHeight
          ? currentCardHeight
          : nextCardHeight,
      );
    };

    const scheduleLayoutMetricsUpdate = () => {
      if (layoutFrameRef.current !== null) {
        cancelAnimationFrame(layoutFrameRef.current);
      }

      layoutFrameRef.current = requestAnimationFrame(() => {
        layoutFrameRef.current = null;
        updateLayoutMetrics();
      });
    };

    scheduleLayoutMetricsUpdate();

    const resizeObserver = new ResizeObserver(scheduleLayoutMetricsUpdate);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    if (firstCardMeasureRef.current)
      resizeObserver.observe(firstCardMeasureRef.current);
    if (lastCardMeasureRef.current)
      resizeObserver.observe(lastCardMeasureRef.current);
    if (constraintsRef.current) resizeObserver.observe(constraintsRef.current);
    window.addEventListener("resize", scheduleLayoutMetricsUpdate);

    return () => {
      if (layoutFrameRef.current !== null) {
        cancelAnimationFrame(layoutFrameRef.current);
        layoutFrameRef.current = null;
      }
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleLayoutMetricsUpdate);
    };
  }, [cards.length, constraintsRef]);

  useEffect(() => {
    onTravelDistanceChange?.(totalSpread);
  }, [totalSpread, onTravelDistanceChange]);

  const { scrollYProgress } = useScroll({
    target: constraintsRef,
    offset: ["start start", "end end"],
  });

  return (
    <LazyMotion features={domMax} strict>
      <div ref={viewportRef} className={styles.mobileScrollViewport}>
        <div
          ref={trackRef}
          className={styles.mobileScrollTrack}
          style={{
            width: totalSpread || undefined,
            height: cardHeight || undefined,
          }}
        >
          {cards.map((src, index) => (
            <MobileCardSlot
              key={src}
              src={src}
              index={index}
              total={cards.length}
              scrollYProgress={scrollYProgress}
              cardWidth={cardWidth}
              viewportWidth={viewportWidth}
              naturalX={naturalPositions[index] ?? MOBILE_LEFT_PADDING}
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
      </div>
    </LazyMotion>
  );
}

export default function ProjectMiniatureHomeScroll(
  props: ProjectMiniatureHomeScrollProps,
) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return <ProjectMiniatureHomeMobileTrack {...props} />;
  }

  return <ProjectMiniatureHomeDesktopTrack {...props} />;
}
