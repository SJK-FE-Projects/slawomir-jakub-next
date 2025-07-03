"use client";

import React, { useState } from "react";
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
  // Usunięto marginTopClass - teraz używamy gap w container
};

export default function ProjectsPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSectionClick = (section: string | null) => {
    setSelectedSection(section);
  };

  // Component for single project with fluid animation
  const ProjectContainer = ({ project }: { project: Project }) => {
    const contentRef = useFluidElement();

    return (
      <div className={styles.projectGrid} id={project.id}>
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
      title: "PORSCHE", // TO FILL
      roles: "UX Design / Screen Design / Visual Design", // TO FILL
      year: "2022",
      description:
        "Web flow and screen design for PORSCHE. The backlog UI of the rental system for test drives.", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 3,
      images: [
        {
          src: "/projectImages/P1/PorscheLogin2.mp4",
          alt: "Porsche UI Design",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P1/Porsche1-2.jpg",
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
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P1/PorscheIcons2.mp4",
          alt: "Porsche Icons Animation",
          width: 4,
          pull: 2,
        },
      ],
    },
    {
      id: "2",
      title: "Documenta '15", // TO FILL
      roles: "Screen Design", // TO FILL
      year: "2021",
      description:
        "Layouting and UI animations for the branding project of fifteenth edition of Documenta developed by and on behalf of StanHema agency in Berlin.", // TO FILL
      width: 4,
      pull: 2,
      sectionLabel: "Cultural",
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
          width: 4,
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
          width: 6,
          pull: 1,
        },
      ],
    },
    {
      id: "3",
      title: "Jugend im Museum", // TO FILL
      roles: "Design System / WebFlow / UX / UI", // TO FILL
      year: "2023",
      description:
        "Design system and screen design for Jugend im Museum in Berlin. Developed for and on behalf of design office anschlaege.de.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
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
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P3/JiM3.jpg",
          alt: "JiM Image 3",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P3/JiM4.jpg",
          alt: "JiM Image 4",
          width: 4,
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
          width: 4,
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
      title:
        "Zukunftszentrum für Europäische Transformation und Deutsche Einheit in Jena", // TO FILL
      roles: " Screen Design / Lay-Outing / Branding / Workshop Facilitation ", // TO FILL
      year: "2023",
      description:
        "Workshops, branding and screen design for the campaign of city council of Jena for the German Center of Future. Developed on behalf of design office anschlaege.de.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 3,
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
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P4/jzet2.mp4",
          alt: "Jzet Video 2",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P4/jzet3.mp4",
          alt: "Jzet Video 3",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P4/jzet4.jpg",
          alt: "Jzet Image 4",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P4/jzet5.jpg",
          alt: "Jzet Image 5",
          width: 5,
          pull: 2,
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
      title: "suissimage", // TO FILL
      roles: "Screen Design / UX Conept", // TO FILL
      year: "2021",
      description:
        "UI & UX Design for the pitch project of swiss cinematographic cooperative. Developed on behalf of formdusche design office.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 2,
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
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P5/si3.mp4",
          alt: "SI Video 3",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P5/si4.mp4",
          alt: "SI Video 4",
          width: 5,
          pull: 2,
        },
      ],
    },
    {
      id: "6",
      title: "Kleist Museum Frankfurt Oder", // TO FILL
      roles: "Screen Design / UX Concept", // TO FILL
      year: "2022",
      description:
        "Comprehensive branding project for Kleist Museum in Frankfurt. Design of UI components and guidelines for various media. Developing extensive web flow and screen design for the text-oriented literature project. Project developed on behalf of design office anschlaege.de.", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 1,
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
          width: 4,
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
          width: 4,
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
      title: "August Bebel Instutut Berlin", // TO FILL
      roles: "Screen Design / UX Concept / Design System", // TO FILL
      year: "2024",
      description:
        "Screen design visual communication for August Bebel Institut in Berlin. Developed on behalf of design office anschlaege.de.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 3,
      images: [
        {
          src: "/projectImages/P7/abi1.mp4",
          alt: "ABI Video 1",
          width: 6,
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
          width: 5,
          pull: 2,
        },
      ],
    },
    {
      id: "8",
      title: "ROC Berlin", // TO FILL
      roles: "Branding / Design System / Screen Design", // TO FILL
      year: "2024",
      description:
        "Pitch project for agency SMITH Berlin. Corporate identity, visual communication and web design for rebranding of ROC Berlin.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 2,
      images: [
        {
          src: "/projectImages/P8/roc1.jpg",
          alt: "ROC Image 1",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P8/roc2.jpg",
          alt: "ROC Image 2",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P8/roc3.jpg",
          alt: "ROC Image 3",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P8/roc4.jpg",
          alt: "ROC Image 4",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P8/roc5a.jpg",
          alt: "ROC Image 5A",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P8/roc5b.jpg",
          alt: "ROC Image 5B",
          width: 4,
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
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P8/roc5e.jpg",
          alt: "ROC Image 5E",
          width: 4,
          pull: 3,
        },
      ],
    },
    {
      id: "9",
      title: "Berlinische Galerie", // TO FILL
      roles: "Layouting", // TO FILL
      year: "2024",
      description:
        "Layouting for the rebranding project of new CI for Berlinische Galerie developed by and on behalf of BUREAU Mario Lombardo.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
      images: [
        {
          src: "/projectImages/P9/bg1.jpg",
          alt: "BG Image 1",
          width: 6,
          pull: 1,
        },
        {
          src: "/projectImages/P9/BG2.jpg",
          alt: "BG Image 2",
          width: 2,
          pull: 1,
        },
        {
          src: "/projectImages/P9/BG2A.jpg",
          alt: "BG Image 2A",
          width: 2,
          pull: 4,
        },
        {
          src: "/projectImages/P9/BG3.jpg",
          alt: "BG Image 3",
          width: 2,
          pull: 2,
        },
        {
          src: "/projectImages/P9/BG3A.jpg",
          alt: "BG Image 3A",
          width: 2,
          pull: 5,
        },
        {
          src: "/projectImages/P9/BG4.jpg",
          alt: "BG Image 4",
          width: 2,
          pull: 1,
        },
        {
          src: "/projectImages/P9/BG4A.jpg",
          alt: "BG Image 4A",
          width: 2,
          pull: 4,
        },
      ],
    },
    {
      id: "10",
      title: "Finland 100", // TO FILL
      roles: "Game Design / Concept Development", // TO FILL
      year: "2018",
      description:
        "Communication project of memo game and merchandising developed to honor and showcase the rich cultural legacy of Finnish pattern design. Created in for of the 'Finland 100' national initiative, the game was produced in collaboration with the Finnish National Gallery and Aalto University’s School of Arts, Design and Architecture in Helsinki.", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 3,
      images: [
        {
          src: "/projectImages/P10/pdff1.jpg",
          alt: "PDFF Image 1",
          width: 6,
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
          width: 4,
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

  // Filter projects based on selected section
  const filteredProjects = selectedSection
    ? projects.filter((project) => project.sectionLabel === selectedSection)
    : projects;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.menuButton}>
          <MenuButton />
        </div>
        <HeaderBar
          headline="Hej! I'm Slawomir Jakub Krzyzak"
          subheadline="Web Design and Development Projects"
          sections={["Business", "Cultural"]}
          selectedSection={selectedSection}
          onSectionClick={handleSectionClick}
        />
        <div className={styles.projectsContainer}>
          {filteredProjects.map((project) => (
            <ProjectContainer key={project.id} project={project} />
          ))}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
