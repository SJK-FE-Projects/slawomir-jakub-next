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

type ProjectMiniatureHomeMobileScrollProps = {
  cards: string[];
  constraintsRef: RefObject<HTMLDivElement | null>;
  onTravelDistanceChange?: (travelDistance: number) => void;
};

const MOBILE_OFFSET_VALUES = ["1.8rem", "-0.25rem", "1.2rem", "0.5rem", "1rem"];
const MOBILE_ROTATION_VALUES = [-1.4, 0.8, -1.8, 3.1, -0.6];
const BASE_CARD_GAP = 16;

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

export default function ProjectMiniatureHomeMobileScroll({
  cards,
  constraintsRef,
  onTravelDistanceChange,
}: ProjectMiniatureHomeMobileScrollProps) {
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
  const naturalPositions = cards.map(
    (_, index) => MOBILE_LEFT_PADDING + index * (cardWidth + BASE_CARD_GAP),
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
      </div>
    </LazyMotion>
  );
}
