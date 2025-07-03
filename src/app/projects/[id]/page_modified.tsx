"use client";

import React, { useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ImagePreview from "../../components/ImagePreview";
import MenuButton from "../../components/MenuButton";
import HeaderBar from "../../components/HeaderBar";
import { usePortfolioEffects } from "../../hooks/usePortfolioEffects";
import styles from "../projects.module.css";

// This is a dynamic route parameter
type Props = {
  params: {
    id: string;
  };
};

// Project data structure matching the main page
const projectsData = {
  "porsche-ux": {
    id: "porsche-ux",
    title: "PORSCHE",
    roles: "UX / Screen Design / Web Flow",
    year: "2024",
    description:
      "Web flow and screen design for PORSCHE. The backlog UI of the rental system for test drives. This project involved comprehensive user research, wireframing, prototyping, and final implementation of the rental interface.",
    sectionLabel: "Business",
    images: [
      {
        src: "/projectImages/Porsche3.jpg",
        alt: "Porsche Project Dashboard",
        width: 6,
        pull: 1,
      },
      {
        src: "/projectImages/jim2.jpg",
        alt: "Porsche UI Components",
        width: 4,
        pull: 1,
      },
      {
        src: "/projectImages/jim3.jpg",
        alt: "Porsche User Flow",
        width: 4,
        pull: 3,
      },
    ],
  },
  "cultural-project": {
    id: "cultural-project",
    title: "Cultural Initiative",
    roles: "Creative Direction, Visual Design",
    year: "2024",
    description:
      "A comprehensive cultural project focusing on digital storytelling and interactive experiences. The project explores new ways of presenting cultural content through modern web technologies.",
    sectionLabel: "Cultural",
    images: [
      {
        src: "/projectImages/jim2.jpg",
        alt: "Cultural Project Overview",
        width: 5,
        pull: 1,
      },
      {
        src: "/projectImages/jim3.jpg",
        alt: "Interactive Elements",
        width: 3,
        pull: 1,
      },
      {
        src: "/projectImages/Porsche3.jpg",
        alt: "Visual Identity",
        width: 4,
        pull: 3,
      },
    ],
  },
  "web-platform": {
    id: "web-platform",
    title: "Web Platform Design",
    roles: "Frontend Development, UI Design",
    year: "2024",
    description:
      "Modern web platform with focus on user experience and performance optimization. Built with Next.js and modern CSS techniques.",
    sectionLabel: "Business",
    images: [
      {
        src: "/projectImages/Porsche3.jpg",
        alt: "Platform Interface",
        width: 6,
        pull: 1,
      },
    ],
  },
};

// This function can be async if you need to fetch data
export default function ProjectPage({ params }: Props) {
  const { fluid, navigation, imagePreview, headerScroll } =
    usePortfolioEffects();

  const projectData = projectsData[params.id as keyof typeof projectsData];
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // If project not found, return 404
  if (!projectData) {
    notFound();
  }

  useEffect(() => {
    if (!fluid.isInitialized) return;

    const elements = [contentRef.current, ...imageRefs.current].filter(
      Boolean
    ) as HTMLElement[];

    const unobservers: (() => void)[] = [];

    elements.forEach((element) => {
      const unobserve = fluid.observeElement(element);
      if (unobserve) unobservers.push(unobserve);
    });

    return () => {
      unobservers.forEach((unobserve) => unobserve());
    };
  }, [fluid, fluid.isInitialized, projectData.id]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.menuButton}>
          <MenuButton />
        </div>

        {/* Header with scroll behavior */}
        <div
          className={`${styles.headerContainer} ${
            headerScroll.isHeaderFixed ? styles.headerFixed : ""
          } ${
            headerScroll.isHeaderVisible
              ? styles.headerVisible
              : styles.headerHidden
          }`}
        >
          <HeaderBar
            headline={projectData.title}
            subheadline={`${projectData.roles} — ${projectData.year}`}
            sections={["Overview", "Details", "Gallery"]}
          />
        </div>

        {/* Back to projects link */}
        <Link
          href="/projects"
          className={`${styles.projectLink} ${styles.backLink}`}
          onClick={(e) => {
            e.preventDefault();
            navigation.navigateToHome();
            window.history.back();
          }}
        >
          ← Back to Projects
        </Link>

        {/* Project content */}
        <div className={styles.projectGrid}>
          <div
            ref={contentRef}
            className={`${styles.width4} ${styles.pull1} fluid`}
          >
            <div className="textCaption"> — {projectData.year}</div>
            <div className="textCaption">{projectData.roles}</div>
            <div className="textRegular">{projectData.title}</div>
            <div
              className="textDefault"
              dangerouslySetInnerHTML={{
                __html: projectData.description,
              }}
            />
          </div>

          {/* Project images with fluid animation and click preview */}
          {projectData.images.map((img, idx) => (
            <div
              key={`${projectData.id}-img-${idx}`}
              ref={(el) => {
                imageRefs.current[idx] = el;
              }}
              className={`${styles[`width${img.width || 3}`]} ${
                styles[`pull${img.pull || 1}`]
              } fluid ${styles.imageContainer}`}
              onClick={() =>
                imagePreview.openPreview(img.src, img.alt, projectData.id)
              }
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1200}
                height={800}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "1rem",
                  cursor: "pointer",
                }}
                priority
              />
            </div>
          ))}
        </div>

        {/* Image Preview Modal */}
        {imagePreview.previewImage && (
          <ImagePreview
            src={imagePreview.previewImage.src}
            alt={imagePreview.previewImage.alt}
            projectId={imagePreview.previewImage.projectId}
            isOpen={imagePreview.isOpen}
            onClose={imagePreview.closePreview}
          />
        )}
      </main>
    </div>
  );
}
