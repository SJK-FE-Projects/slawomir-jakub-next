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

  // All 10 projects data with real media files
  const projects: Project[] = [
    {
      id: "1",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
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
          src: "/projectImages/P1/Porsche3-2.jpg",
          alt: "Porsche Design System",
          width: 3,
          pull: 2,
        },
        {
          src: "/projectImages/P1/PorscheIcons2.mp4",
          alt: "Porsche Icons Animation",
          width: 3,
          pull: 3,
        },
      ],
    },
    {
      id: "2",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      width: 4,
      pull: 2,
      sectionLabel: "Cultural",
      marginTopClass: "marginNegative",
      images: [
        {
          src: "/projectImages/P2/doc1.mp4",
          alt: "Documenta Video 1",
          width: 5,
          pull: 1,
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
          pull: 2,
        },
        {
          src: "/projectImages/P2/doc4.mp4",
          alt: "Documenta Video 4",
          width: 4,
          pull: 1,
        },
      ],
    },
    {
      id: "3",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
      marginTopClass: "marginDefault",
      images: [
        {
          src: "/projectImages/P3/JiM1.mp4",
          alt: "JiM Video 1",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P3/JiM2.mp4",
          alt: "JiM Video 2",
          width: 3,
          pull: 3,
        },
        {
          src: "/projectImages/P3/JiM3.jpg",
          alt: "JiM Image 3",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P3/JiM4.jpg",
          alt: "JiM Image 4",
          width: 3,
          pull: 1,
        },
        {
          src: "/projectImages/P3/JiM5.jpg",
          alt: "JiM Image 5",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P3/JiM6.jpg",
          alt: "JiM Image 6",
          width: 3,
          pull: 2,
        },
        {
          src: "/projectImages/P3/JiM7.jpg",
          alt: "JiM Image 7",
          width: 5,
          pull: 1,
        },
      ],
    },
    {
      id: "4",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 3,
      marginTopClass: "marginNegative",
      images: [
        {
          src: "/projectImages/P4/jzet0a.mp4",
          alt: "Jzet Video Intro",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P4/jzet1.mp4",
          alt: "Jzet Video 1",
          width: 3,
          pull: 3,
        },
        {
          src: "/projectImages/P4/jzet2.mp4",
          alt: "Jzet Video 2",
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P4/jzet3.mp4",
          alt: "Jzet Video 3",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P4/jzet4.jpg",
          alt: "Jzet Image 4",
          width: 3,
          pull: 2,
        },
        {
          src: "/projectImages/P4/jzet5.jpg",
          alt: "Jzet Image 5",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P4/jzet6.jpg",
          alt: "Jzet Image 6",
          width: 5,
          pull: 1,
        },
      ],
    },
    {
      id: "5",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 2,
      marginTopClass: "marginDefault",
      images: [
        {
          src: "/projectImages/P5/si1.mp4",
          alt: "SI Video 1",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P5/si2.mp4",
          alt: "SI Video 2",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P5/si3.mp4",
          alt: "SI Video 3",
          width: 3,
          pull: 2,
        },
        {
          src: "/projectImages/P5/si4.mp4",
          alt: "SI Video 4",
          width: 4,
          pull: 1,
        },
      ],
    },
    {
      id: "6",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 1,
      marginTopClass: "marginNegative",
      images: [
        {
          src: "/projectImages/P6/km0.mp4",
          alt: "KM Video Intro",
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P6/km1.png",
          alt: "KM Image 1",
          width: 3,
          pull: 1,
        },
        {
          src: "/projectImages/P6/km2.jpg",
          alt: "KM Image 2",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P6/km5.png",
          alt: "KM Image 5",
          width: 3,
          pull: 2,
        },
        {
          src: "/projectImages/P6/km6.png",
          alt: "KM Image 6",
          width: 4,
          pull: 1,
        },
      ],
    },
    {
      id: "7",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 3,
      marginTopClass: "marginDefault",
      images: [
        {
          src: "/projectImages/P7/abi1.mp4",
          alt: "ABI Video 1",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P7/abi2.mp4",
          alt: "ABI Video 2",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P7/abi3.mp4",
          alt: "ABI Video 3",
          width: 3,
          pull: 3,
        },
      ],
    },
    {
      id: "8",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 2,
      marginTopClass: "marginNegative",
      images: [
        {
          src: "/projectImages/P8/roc1.jpg",
          alt: "ROC Image 1",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P8/roc2.jpg",
          alt: "ROC Image 2",
          width: 3,
          pull: 3,
        },
        {
          src: "/projectImages/P8/roc3.jpg",
          alt: "ROC Image 3",
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P8/roc4.jpg",
          alt: "ROC Image 4",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P8/roc5a.jpg",
          alt: "ROC Image 5A",
          width: 3,
          pull: 2,
        },
        {
          src: "/projectImages/P8/roc5b.jpg",
          alt: "ROC Image 5B",
          width: 3,
          pull: 3,
        },
        {
          src: "/projectImages/P8/roc5c.jpg",
          alt: "ROC Image 5C",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P8/roc5d.jpg",
          alt: "ROC Image 5D",
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P8/roc5e.jpg",
          alt: "ROC Image 5E",
          width: 3,
          pull: 3,
        },
      ],
    },
    {
      id: "9",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
      marginTopClass: "marginDefault",
      images: [
        {
          src: "/projectImages/P9/bg1.jpg",
          alt: "BG Image 1",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P9/BG2.jpg",
          alt: "BG Image 2",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P9/BG2A.jpg",
          alt: "BG Image 2A",
          width: 3,
          pull: 2,
        },
        {
          src: "/projectImages/P9/BG3.jpg",
          alt: "BG Image 3",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P9/BG3A.jpg",
          alt: "BG Image 3A",
          width: 3,
          pull: 3,
        },
        {
          src: "/projectImages/P9/BG4.jpg",
          alt: "BG Image 4",
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P9/BG4A.jpg",
          alt: "BG Image 4A",
          width: 4,
          pull: 1,
        },
      ],
    },
    {
      id: "10",
      title: "", // TO FILL
      roles: "", // TO FILL
      year: "2024",
      description: "", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 3,
      marginTopClass: "marginNegative",
      images: [
        {
          src: "/projectImages/P10/pdff1.jpg",
          alt: "PDFF Image 1",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P10/pdff2.jpg",
          alt: "PDFF Image 2",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P10/pdff3.jpg",
          alt: "PDFF Image 3",
          width: 3,
          pull: 3,
        },
        {
          src: "/projectImages/P10/pdff4.jpg",
          alt: "PDFF Image 4",
          width: 4,
          pull: 1,
        },
      ],
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
