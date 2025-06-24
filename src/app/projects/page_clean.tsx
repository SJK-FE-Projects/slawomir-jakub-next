"use client";

import React from "react";
import Image from "next/image";
import SectionButton from "../components/SectionButton";
import styles from "./projects.module.css";
import MenuButton from "../components/MenuButton";
import HeaderBar from "../components/HeaderBar";
import {
  useIntersectionObserver,
  useElementAnimation,
} from "../hooks/useIntersectionObserver";

type Project = {
  id: string;
  title: string;
  roles: string;
  year: string;
  description: string;
  images: {
    src: string;
    alt: string;
    width?: number;
    pull?: number;
  }[];
  sectionLabel: string;
  width: 3 | 4 | 5 | 6;
  pull: 1 | 2 | 3;
  marginTopClass: string;
};

export default function ProjectsPage() {
  // Component for single project with animation
  const ProjectContainer = ({ project }: { project: Project }) => {
    const [ref, isIntersecting, initialMarginTop] = useIntersectionObserver();
    const [contentRef, contentInView, contentMarginTop] = useElementAnimation();

    return (
      <div
        ref={ref}
        className={`${styles.projectGrid} ${styles[project.marginTopClass]}`}
        style={{
          marginTop: isIntersecting ? "0px" : `${initialMarginTop}px`,
          transition: "margin-top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Project content - spans according to project width/pull */}
        <div
          ref={contentRef}
          className={`${styles[`width${project.width}`]} ${
            styles[`pull${project.pull}`]
          } ${styles.elementAnimation} ${contentInView ? styles.inView : ""}`}
          style={{
            marginTop: contentInView ? "0px" : `${contentMarginTop}px`,
          }}
        >
          <div className="textCaption"> — {project.year}</div>
          <div className={styles.factsContent}>
            <span className="textCaption">{project.roles}</span>
            <SectionButton text={project.sectionLabel} selected={false} />
          </div>
          <div className="textRegular">{project.title}</div>
          <div
            className="textDefault"
            dangerouslySetInnerHTML={{
              __html: project.description,
            }}
          />
        </div>

        {/* Each image gets its own grid position and animation */}
        {project.images.map((img, idx) => {
          const ImageWithAnimation = () => {
            const [imgRef, imgInView, imgMarginTop] = useElementAnimation();

            return (
              <div
                key={`${project.id}-img-${idx}`}
                ref={imgRef}
                className={`${styles[`width${img.width || 3}`]} ${
                  styles[`pull${img.pull || 1}`]
                } ${styles.elementAnimation} ${imgInView ? styles.inView : ""}`}
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: imgInView ? "0px" : `${imgMarginTop}px`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                  priority
                />
              </div>
            );
          };

          return <ImageWithAnimation key={`${project.id}-img-${idx}`} />;
        })}
      </div>
    );
  };

  // Example projects data
  const projects: Project[] = [
    {
      id: "1",
      title: "PORSCHE",
      roles: "UX / Screen Design / Web Flow",
      year: "2024",
      description:
        "Web flow and screen design for PORSCHE. The backlog UI of the rental system for test drives.",
      sectionLabel: "Business",
      width: 4,
      pull: 3,
      marginTopClass: "marginDefault",
      images: [
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 1 image",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 1 image",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 1 image",
          width: 4,
          pull: 1,
        },
      ],
    },
    {
      id: "2",
      title: "Project 2",
      roles: "Role 1, Role 2",
      year: "2024",
      description: "Description of project 2",
      width: 4,
      pull: 2,
      sectionLabel: "Cultural",
      marginTopClass: "marginNegative",
      images: [
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 2 image",
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 2 image",
          width: 3,
          pull: 3,
        },
        {
          src: "/projectImages/Porsche3.jpg",
          alt: "Project 2 image",
          width: 4,
          pull: 1,
        },
      ],
    },
    {
      id: "3",
      title: "Project 3",
      roles: "Role 1",
      year: "2024",
      description: "Description of project 3",
      images: [
        {
          src: "/projectImages/Porsche3.jpg",
          alt: "Project 3 image",
          width: 5,
          pull: 2,
        },
      ],
      sectionLabel: "Cultural",
      width: 4,
      pull: 2,
      marginTopClass: "marginNegative",
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.menuButton}>
          <MenuButton />
        </div>
        <HeaderBar
          headline="Hej! I'm Slawomir Jakub Krzyzak"
          subheadline="Web Design and Development Projects"
          sections={["Business", "Culture"]}
        />
        <div className={styles.projectsContainer}>
          {projects.map((project) => (
            <ProjectContainer key={project.id} project={project} />
          ))}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
