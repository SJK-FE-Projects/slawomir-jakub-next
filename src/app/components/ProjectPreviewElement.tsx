import React from "react";
import Link from "next/link";
import MediaElement from "./MediaElement";
import SectionButton from "./SectionButton";
import styles from "./ProjectPreviewElement.module.css";

type ProjectPreviewMedia = {
  src: string;
  alt: string;
};

type ProjectPreviewElementProps = {
  id: string;
  title: string;
  sectionLabel: string;
  media?: ProjectPreviewMedia;
  href?: string;
};

export default function ProjectPreviewElement({
  id,
  title,
  sectionLabel,
  media,
  href,
}: ProjectPreviewElementProps) {
  const targetHref = href ?? `/projects/${encodeURIComponent(id)}`;

  return (
    <Link
      href={targetHref}
      className={styles.previewLink}
      aria-label={`Open ${title}`}
    >
      <article className={styles.preview} id={id}>
        <div className={styles.previewMedia}>
          {media ? (
            <MediaElement
              src={media.src}
              alt={media.alt}
              className={styles.mediaElement}
            />
          ) : null}
        </div>

        <div className={styles.previewContent}>
          <h2 className={`textLarge ${styles.titleText}`}>
            <span className={styles.titleArrow}>→</span> {title}
          </h2>
          <SectionButton
            text={sectionLabel}
            selected={false}
            className={styles.previewLabel}
          />
        </div>
      </article>
    </Link>
  );
}
