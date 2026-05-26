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
  // New structured blocks: each block can have an optional title, level, paragraphs and quote flag
  descriptionBlocks?: {
    title?: string;
    level?: 3 | 4;
    paragraphs: string[];
    quote?: boolean;
  }[];
  subheading?: string;
  descriptions?: string[];
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
            text="Type"
            selected={false}
            className={styles.metaLabel}
          />
          <div className={styles.metaValue}>{project.sectionLabel}</div>
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

      {/* Prefer descriptionBlocks, then descriptions[], then HTML description */}
      {project.descriptionBlocks && project.descriptionBlocks.length > 0 ? (
        <>
          {/* Intro: first block first paragraph */}
          <p className={`${styles.projectDescription} textLarge`}>
            {project.descriptionBlocks[0].paragraphs[0]}
          </p>

          {/* Remaining paragraphs of the first block */}
          {project.descriptionBlocks[0].paragraphs
            .slice(1)
            .map((p: string, i: number) => (
              <p
                key={`intro-${i}`}
                className={`${styles.projectDescription} textLarge`}
              >
                {p}
              </p>
            ))}

          {/* Subsequent blocks */}
          {project.descriptionBlocks.slice(1).map((block, idx) => (
            <section key={idx} className={styles.descriptionBlock}>
              {block.title ? (
                <SectionButton text={block.title} selected={false} />
              ) : null}

              {block.quote ? (
                <blockquote className={styles.projectQuote}>
                  {block.paragraphs.map((p: string, i: number) => (
                    <p key={i} className={styles.projectDescription}>
                      {p}
                    </p>
                  ))}
                </blockquote>
              ) : (
                block.paragraphs.map((p: string, i: number) => (
                  <p
                    key={i}
                    className={`${styles.projectDescription} textLarge`}
                  >
                    {p}
                  </p>
                ))
              )}
            </section>
          ))}
        </>
      ) : project.descriptions && project.descriptions.length > 0 ? (
        <>
          <p className={`${styles.projectDescription} textLarge`}>
            {project.descriptions[0]}
          </p>
          {project.subheading && project.descriptions.length > 1 ? (
            <h3 className={styles.projectSubheading}>{project.subheading}</h3>
          ) : null}
          {project.descriptions.slice(1).map((p, i) => (
            <p key={i} className={`${styles.projectDescription} textLarge`}>
              {p}
            </p>
          ))}
        </>
      ) : (
        <p
          className={`${styles.projectDescription} textLarge`}
          dangerouslySetInnerHTML={{
            __html: project.description,
          }}
        />
      )}
    </div>
  );
}
