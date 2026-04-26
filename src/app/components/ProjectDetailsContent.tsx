"use client";

import React from "react";
import layoutStyles from "../page.module.css";
import SectionButton from "./SectionButton";
import styles from "../projects/[projectId]/detail.module.css";

export type ProjectDetailsContentProject = {
  title: string;
  client: string;
  agency?: string;
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
  return (
    <div
      className={`${layoutStyles[`width${project.width}`]} ${layoutStyles[`pull${project.pull}`]} ${styles.detailsContent}`}
    >
      <h1 className={styles.projectTitle}>{project.title}</h1>

      <div className={styles.metaList}>
        <div className={styles.metaRow}>
          <SectionButton
            text="Year"
            selected={false}
            className={styles.metaLabel}
          />
          <div className={styles.metaValue}>{project.year}</div>
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
            text="Client"
            selected={false}
            className={styles.metaLabel}
          />
          <div className={styles.metaValue}>{project.client}</div>
        </div>

        {project.agency ? (
          <div className={styles.metaRow}>
            <SectionButton
              text="Agency"
              selected={false}
              className={styles.metaLabel}
            />
            <div className={styles.metaValue}>{project.agency}</div>
          </div>
        ) : null}
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
