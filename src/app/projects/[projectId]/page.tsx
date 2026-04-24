import React from "react";
import Link from "next/link";
import styles from "./detail.module.css";
import ProjectDetailsContent from "../../components/ProjectDetailsContent";
import MediaElement from "../../components/MediaElement";
import SectionButton from "../../components/SectionButton";
import { projects } from "../../lib/projectsData";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Project Not Found</h1>
        <p>The project with ID &quot;{projectId}&quot; does not exist.</p>
        <Link href="/projects">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayInner}>
        <div className={styles.closeButtonWrapper}>
          <Link href="/projects" className={styles.closeButton}>
            <SectionButton text="Close" selected={false} />
          </Link>
        </div>

        <div className={styles.leftColumn}>
          <ProjectDetailsContent project={project} />
        </div>

        <div className={styles.rightColumn}>
          {project.images.map((item, index) => (
            <div key={`${item.src}-${index}`} className={styles.mediaSlide}>
              <MediaElement src={item.src} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
