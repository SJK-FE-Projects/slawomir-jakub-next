"use client";

import Link from "next/link";

import { useRef } from "react";

import type { RefObject } from "react";

import styles from "./ProjectMiniatureHome.module.css";
import useIsClient from "../hooks/useIsClient";

import { useMediaQuery } from "../hooks/useMediaQuery";
import ProjectMiniatureHomeDesktop from "./ProjectMiniatureHomeDesktop";
import ProjectMiniatureHomeMobile from "./ProjectMiniatureHomeMobile";

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

  return (
    <div className={styles.root}>
      {" "}
      <div ref={constraintsRef} className={styles.carouselArea}>
        {" "}
        {!isClient ? (
          <div className={styles.skeleton} aria-hidden="true" />
        ) : isDesktop ? (
          <ProjectMiniatureHomeDesktop
            cards={cards}
            constraintsRef={constraintsRef}
          />
        ) : (
          <ProjectMiniatureHomeMobile cards={cards} />
        )}
      </div>{" "}
      <Link href={href} className={styles.link}>
        {" "}
        See more →{" "}
      </Link>{" "}
    </div>
  );
}
