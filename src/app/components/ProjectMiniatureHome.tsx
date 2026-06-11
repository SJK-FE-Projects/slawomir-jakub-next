"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { RefObject } from "react";

import styles from "./ProjectMiniatureHome.module.css";
import useIsClient from "../hooks/useIsClient";
import { useMediaQuery } from "../hooks/useMediaQuery";
import ProjectMiniatureHomeDesktopScroll from "./ProjectMiniatureHomeDesktopScroll";
import ProjectMiniatureHomeMobileScroll from "./ProjectMiniatureHomeMobileScroll";
import SectionButton from "./SectionButton";

type ProjectMiniatureHomeProps = {
  cards: string[];
  href: string;
  parentConstraintsRef?: RefObject<HTMLDivElement | null> | null;
};

export default function ProjectMiniatureHome({
  cards,
  href,
  parentConstraintsRef = null,
}: ProjectMiniatureHomeProps) {
  const isClient = useIsClient();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const localConstraintsRef = useRef<HTMLDivElement>(null);
  const constraintsRef = parentConstraintsRef ?? localConstraintsRef;
  const [scrollTravelDistance, setScrollTravelDistance] = useState(0);

  return (
    <div className={styles.root}>
      <div ref={constraintsRef} className={styles.carouselArea}>
        {!isClient ? (
          <div className={styles.skeleton} aria-hidden="true" />
        ) : isDesktop ? (
          <div className={styles.desktopStickyFragment}>
            <SectionButton text="Projects Overview" selected={false} />

            <ProjectMiniatureHomeDesktopScroll
              cards={cards}
              constraintsRef={constraintsRef}
              onTravelDistanceChange={setScrollTravelDistance}
            />

            <Link href={href} className={styles.link}>
              <SectionButton text="See more" selected={true} />
            </Link>
          </div>
        ) : (
          <>
            <ProjectMiniatureHomeMobileScroll
              cards={cards}
              constraintsRef={constraintsRef}
            />
            <Link href={href} className={styles.link}>
              <SectionButton text="See more" selected={true} />
            </Link>
          </>
        )}

        {isDesktop && scrollTravelDistance > 0 ? (
          <div
            className={styles.desktopScrollSpacer}
            aria-hidden="true"
            style={{ height: scrollTravelDistance }}
          />
        ) : null}
      </div>
    </div>
  );
}
