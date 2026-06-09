"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { RefObject } from "react";

import styles from "./ProjectMiniatureHome.module.css";
import useIsClient from "../hooks/useIsClient";
import ProjectMiniatureHomeScroll from "./ProjectMiniatureHomeScroll";
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

  const localConstraintsRef = useRef<HTMLDivElement>(null);
  const constraintsRef = parentConstraintsRef ?? localConstraintsRef;

  const [scrollTravelDistance, setScrollTravelDistance] = useState(0);

  return (
    <div className={styles.root}>
      <div ref={constraintsRef} className={styles.carouselArea}>
        {!isClient ? (
          <div className={styles.skeleton} aria-hidden="true" />
        ) : (
          <div className={styles.desktopStickyFragment}>
            <SectionButton text="Projects Overview" selected={false} />

            <ProjectMiniatureHomeScroll
              cards={cards ?? []}
              constraintsRef={constraintsRef}
              onTravelDistanceChange={setScrollTravelDistance}
            />

            <Link href={href} className={styles.link}>
              <SectionButton text="See more" selected={true} />
            </Link>
          </div>
        )}

        {scrollTravelDistance > 0 ? (
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
