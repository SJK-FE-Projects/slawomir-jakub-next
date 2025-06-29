"use client";

import React from "react";
import Image from "next/image";
import SectionButton from "../components/SectionButton";
import styles from "./projects.module.css";
import MenuButton from "../components/MenuButton";
import HeaderBar from "../components/HeaderBar";
import MediaElement from "../components/MediaElement";
import { useFluidElement } from "../hooks/useFluidLoading";

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
  // Component for single project with fluid animation
  const ProjectContainer = ({ project }: { project: Project }) => {
    const projectRef = useFluidElement();
    const contentRef = useFluidElement();

    return (
      <div
        className={`${styles.projectGrid} ${styles[project.marginTopClass]}`}
        id={project.id}
      >
        {/* Project content with fluid animation */}
        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className={`${styles[`width${project.width}`]} ${
            styles[`pull${project.pull}`]
          } section`}
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

        {/* Each image gets its own grid position and fluid animation */}
        {project.images.map((img, idx) => {
          const ImageWithFluidAnimation = () => {
            const imgRef = useFluidElement();

            return (
              <div
                key={`${project.id}-img-${idx}`}
                ref={imgRef as React.RefObject<HTMLDivElement>}
                className={`${styles[`width${img.width || 3}`]} ${
                  styles[`pull${img.pull || 1}`]
                } section`}
              >
                <MediaElement
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

          return <ImageWithFluidAnimation key={`${project.id}-img-${idx}`} />;
        })}
      </div>
    );
  };

  // Example projects data with real media files
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
          src: "/projectImages/P1/Porsche1-2.jpg",
          alt: "Porsche UI Design",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P1/PorscheLogin2.mp4",
          alt: "Porsche Login Animation",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P1/Porsche2A-2.jpg",
          alt: "Porsche Interface",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P1/PorscheIcons2.mp4",
          alt: "Porsche Icons Animation",
          width: 3,
          pull: 2,
        },
      ],
    },
    {
      id: "2",
      title: "DOCUMENTA PROJECT",
      roles: "UI/UX Design / Video Production",
      year: "2024",
      description:
        "Interactive video installations and digital experiences for Documenta art exhibition.",
      width: 4,
      pull: 2,
      sectionLabel: "Cultural",
      marginTopClass: "marginNegative",
      images: [
        {
          src: "/projectImages/P2/doc1.mp4",
          alt: "Documenta Video 1",
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P2/doc2.mp4",
          alt: "Documenta Video 2",
          width: 3,
          pull: 3,
        },
        {
          src: "/projectImages/P2/doc3.mp4",
          alt: "Documenta Video 3",
          width: 4,
          pull: 1,
        },
      ],
    },
    {
      id: "3",
      title: "PROJECT 3",
      roles: "Creative Direction",
      year: "2024",
      description: "Third project description here.",
      images: [
        {
          src: "/projectImages/jim2.jpg",
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
