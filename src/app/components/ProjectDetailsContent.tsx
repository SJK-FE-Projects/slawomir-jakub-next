"use client";

import React from "react";
import { useFluidElement } from "../hooks/useFluidLoading";
import layoutStyles from "../page.module.css";
import SectionButton from "./SectionButton";
import styles from "../projects/[projectId]/detail.module.css";

export type ProjectDetailsContentProject = {
  title: string;
  year: string;
  roles: string;
  sectionLabel: string;
  description: string;
  width: number;
  pull: number;
};

type ProjectDetailsContentProps = {
  project: ProjectDetailsContentProject;
};

export default function ProjectDetailsContent({
  project,
}: ProjectDetailsContentProps) {
  const contentRef = useFluidElement();

  return (
    <div
      ref={contentRef as React.RefObject<HTMLDivElement>}
      className={`${layoutStyles[`width${project.width}`]} ${layoutStyles[`pull${project.pull}`]} section fluid ${styles.detailsContent}`}
    >
      <h1 className={styles.projectTitle}>{project.title}</h1>

      <div className={styles.metaList}>
        <div className={styles.metaRow}>
          <SectionButton
            text="Year"
            selected={false}
            className={styles.metaLabel}
          />
          <div className={styles.metaValue}>— {project.year}</div>
        </div>

        <div className={styles.metaRow}>
          <SectionButton
            text="Role"
            selected={false}
            className={styles.metaLabel}
          />
          <div className={styles.metaValue}>{project.roles}</div>
        </div>

        <div className={styles.metaRow}>
          <SectionButton
            text="Project"
            selected={false}
            className={styles.metaLabel}
          />
          <div className={styles.metaValue}>{project.title}</div>
        </div>
      </div>

      <p
        className={`${styles.projectDescription} textLarge`}
        dangerouslySetInnerHTML={{
          __html: project.description,
        }}
      />
    </div>
  );
}
