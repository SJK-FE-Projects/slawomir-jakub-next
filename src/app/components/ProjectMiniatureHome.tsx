"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { RefObject } from "react";

import styles from "./ProjectMiniatureHome.module.css";
import useIsClient from "../hooks/useIsClient";
import { useMediaQuery } from "../hooks/useMediaQuery";
import ProjectMiniatureHomeMobile from "./ProjectMiniatureHomeMobile";
import ProjectMiniatureHomeDesktop from "./ProjectMiniatureHomeDesktopScroll";
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

  const [desktopTravelDistance, setDesktopTravelDistance] = useState(0);

  return (
    <div className={styles.root}>
      <div ref={constraintsRef} className={styles.carouselArea}>
        {!isClient ? (
          <div className={styles.skeleton} aria-hidden="true" />
        ) : (
          <div className={styles.desktopStickyFragment}>
            <SectionButton text="Projects Overview" selected={false} />

            {isDesktop ? (
              <ProjectMiniatureHomeDesktop
                cards={cards ?? []} // ✅ prevent undefined crash
                constraintsRef={constraintsRef}
                onTravelDistanceChange={setDesktopTravelDistance}
              />
            ) : (
              <ProjectMiniatureHomeMobile cards={cards ?? []} />
            )}

            <Link href={href} className={styles.link}>
              <SectionButton text="See more" selected={true} />
            </Link>
          </div>
        )}

        {isDesktop && desktopTravelDistance > 0 ? (
          <div
            className={styles.desktopScrollSpacer}
            aria-hidden="true"
            style={{ height: desktopTravelDistance }}
          />
        ) : null}
      </div>
    </div>
  );
}
