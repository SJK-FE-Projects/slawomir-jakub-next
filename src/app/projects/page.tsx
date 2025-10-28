"use client";

import React, { useState } from "react";
import SectionButton from "../components/SectionButton";
import SectionsNavBar from "../components/SectionsNavBar";
import styles from "./projects.module.css";
import MenuButton from "../components/MenuButton";
import HeaderBar from "../components/HeaderBar";
import MediaElement from "../components/MediaElement";
import { useFluidElement } from "../hooks/useFluidLoading";
import dynamic from "next/dynamic";

// Dynamically import Footer to prevent hydration issues
const Footer = dynamic(() => import("../components/Footer"), {
  ssr: false,
});

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
  // Initialize with "All" selected instead of null
  const [selectedSection, setSelectedSection] = useState<string | null>("All");

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
          } section fluid`}
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
                } section fluid`}
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
      pull: 1,
      images: [
        {
          src: "/projectImages/P1/PorscheLogin.mp4",
          alt: "Porsche UI Design",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P1/Porsche1.jpg",
          alt: "Porsche Login Animation",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P1/Porsche2.jpg",
          alt: "Porsche Interface",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P1/Porsche3.jpg",
          alt: "Porsche Design System",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P1/PorscheIcons.mp4",
          alt: "Porsche Icons Animation",
          width: 4,
          pull: 2,
        },
      ],
    },
    {
      id: "2",
      title: "hermaid", // previously id 3
      roles: "UI Design & Development", // TO FILL
      year: "2024",
      description: `hermaid is a digital health app designed to support women navigating menopause by combining AI assisted self learning, symptom tracking, and expert consultations into one holistic platform. The redesign focused on crafting a clear information architecture, intuitive user flows, and visually coherent screen designs across mobile devices—all tailored to foster trust, accessibility, and long‑term engagement. The goal was to present menopause not as a medical issue, but as a journey supported through science based content, personalized recommendations, and seamless access to certified hormone experts. The result: a modern, professional wellness platform that empowers users and vouches for their hormonal health in a scalable and empathetic way.`,
      sectionLabel: "Business",
      width: 4,
      pull: 1,
      images: [
        {
          src: "/projectImages/P12/hm1a.jpg",
          alt: "P12 Image 1",
          width: 6,
          pull: 1,
        },
        {
          src: "/projectImages/P12/hm2a.jpg",
          alt: "P12 Image 2",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P12/hm3a.jpg",
          alt: "P12 Image 3",
          width: 4,
          pull: 3,
        },
      ],
    },
    {
      id: "3",
      title: "RedBull Advanced Technologies", // TO FILL
      roles: "UX Design, Screen Design, Dev-ready Hand-off", // TO FILL
      year: "2025", // TO FILL
      description:
        "Red Bull Advanced Technologies is the engineering arm of Red Bull Racing, applying Formula 1 expertise to groundbreaking projects in automotive, aerospace, and advanced mobility. The redesigned website showcases this innovation through a streamlined site architecture, intuitive user journeys, and a bold, performance-driven visual design. Clear content structure and responsive layouts support a growing portfolio of high-impact projects. The result is a modern digital platform that reflects the precision, ambition, and technological edge of the RBAT brand. Project on behalf of diesdas.digital agency.", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 1,
      images: [
        // TODO: Replace with actual filenames from /public/projectImages/P13
        // Example placeholders:
        {
          src: "/projectImages/P13/rbat0.jpg",
          alt: "P13 Image 1",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P13/rbat0a.jpg",
          alt: "P13 Image 2",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P13/rbat1.jpg",
          alt: "P13 Image 3",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P13/rbat2.jpg",
          alt: "P13 Image 3",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P13/rbat3.jpg",
          alt: "P13 Image 3",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P13/rbat4.jpg",
          alt: "P13 Image 3",
          width: 4,
          pull: 2,
        },
      ],
    },
    {
      id: "4",
      title: "Creative Museum 2.0. by BadischesLandes Museum", // previously id 2
      roles: "UX/UI Design, Development", // TO FILL
      year: "2023",
      description:
        "Designed with anschlaege.de for the Badisches Landesmuseum, Creative Museum is a digital participatory platform aimed at digitally curious and younger audiences as well as broader under‑represented visitor groups. The concept centers on user‑generated content, campaign‑based interactions, voting, feedback loops and gamified mechanics (points, badges, levels), creating a dynamic social feed that empowers users as curators, co‑creators and civic contributors. Concept development flowed through co‑design workshops, wireframing and screen design, resulting in dev‑ready hand‑off for implementation. Credits: anschlaege.de × Badisches Landesmuseum", // TO FILL
      sectionLabel: "Business",
      width: 4,
      pull: 1,
      images: [
        {
          src: "/projectImages/P11/blm0.jpg",
          alt: "P11 Image 1",
          width: 6,
          pull: 1,
        },
        {
          src: "/projectImages/P11/blm1.jpg",
          alt: "P11 Image 1",
          width: 5,
          pull: 1,
        },
        {
          src: "/projectImages/P11/blm2.jpg",
          alt: "P11 Image 2",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P11/blm3a.jpg",
          alt: "P11 Image 3",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P11/blm4a.jpg",
          alt: "P11 Image 3",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P11/blm6.jpg",
          alt: "P11 Image 3",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P11/blm7.jpg",
          alt: "P11 Image 3",
          width: 4,
          pull: 3,
        },
        {
          src: "/projectImages/P11/blm9.jpg",
          alt: "P11 Image 3",
          width: 4,
          pull: 2,
        },
      ],
    },

    {
      id: "6",
      title: "Documenta '15", // previously duplicate id 2
      roles: "Screen Design", // TO FILL
      year: "2021",
      description:
        "Layouting and UI animations for the branding project of fifteenth edition of Documenta developed by and on behalf of StanHema agency in Berlin.", // TO FILL
      width: 4,
      pull: 1,
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
      id: "7",
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
      id: "8",
      title:
        "Zukunftszentrum für Europäische Transformation und Deutsche Einheit in Jena", // TO FILL
      roles: " Screen Design / Lay-Outing / Branding / Workshop Facilitation ", // TO FILL
      year: "2023",
      description:
        "Workshops, branding and screen design for the campaign of city council of Jena for the German Center of Future. Developed on behalf of design office anschlaege.de.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
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
      id: "9",
      title: "suissimage", // TO FILL
      roles: "Screen Design / UX Conept", // TO FILL
      year: "2021",
      description:
        "UI & UX Design for the pitch project of swiss cinematographic cooperative. Developed on behalf of formdusche design office.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
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
      id: "10",
      title: "Kleist Museum Frankfurt Oder", // TO FILL
      roles: "Screen Design / UX Concept", // TO FILL
      year: "2022",
      description:
        "Comprehensive branding project for Kleist Museum in Frankfurt. Design of UI components and guidelines for various media. Developing extensive web flow and screen design for the text-oriented literature project. Project developed on behalf of design office anschlaege.de.", // TO FILL
      sectionLabel: "Cultural",
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
        {
          src: "/projectImages/P6/km2.mp4",
          alt: "KM Image 6",
          width: 5,
          pull: 2,
        },
      ],
    },
    {
      id: "11",
      title: "August Bebel Instutut Berlin", // TO FILL
      roles: "Screen Design / UX Concept / Design System", // TO FILL
      year: "2024",
      description:
        "Screen design visual communication for August Bebel Institut in Berlin. Developed on behalf of design office anschlaege.de.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
      images: [
        {
          src: "/projectImages/P7/abi1.mp4",
          alt: "ABI Video 1",
          width: 6,
          pull: 1,
        },
        {
          src: "/projectImages/P7/abi8d.jpg",
          alt: "ABI Video 2",
          width: 5,
          pull: 2,
        },
        {
          src: "/projectImages/P7/abi8c.jpg",
          alt: "ABI Video 3",
          width: 4,
          pull: 1,
        },
        {
          src: "/projectImages/P7/abi8b.jpg",
          alt: "ABI Video 3",
          width: 4,
          pull: 2,
        },
        {
          src: "/projectImages/P7/abi6b.jpg",
          alt: "ABI Video 3",
          width: 5,
          pull: 1,
        },
      ],
    },
    {
      id: "12",
      title: "ROC Berlin", // TO FILL
      roles: "Branding / Design System / Screen Design", // TO FILL
      year: "2024",
      description:
        "Pitch project for agency SMITH Berlin. Corporate identity, visual communication and web design for rebranding of ROC Berlin.", // TO FILL
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
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
    // {
    //   id: "13",
    //   title: "Berlinische Galerie", // TO FILL
    //   roles: "Layouting", // TO FILL
    //   year: "2024",
    //   description:
    //     "Layouting for the rebranding project of new CI for Berlinische Galerie developed by and on behalf of BUREAU Mario Lombardo.", // TO FILL
    //   sectionLabel: "Cultural",
    //   width: 4,
    //   pull: 1,
    //   images: [
    //     {
    //       src: "/projectImages/P9/bg1.jpg",
    //       alt: "BG Image 1",
    //       width: 6,
    //       pull: 1,
    //     },
    //     {
    //       src: "/projectImages/P9/BG2.jpg",
    //       alt: "BG Image 2",
    //       width: 2,
    //       pull: 1,
    //     },
    //     {
    //       src: "/projectImages/P9/BG2A.jpg",
    //       alt: "BG Image 2A",
    //       width: 2,
    //       pull: 4,
    //     },
    //     {
    //       src: "/projectImages/P9/BG3.jpg",
    //       alt: "BG Image 3",
    //       width: 2,
    //       pull: 2,
    //     },
    //     {
    //       src: "/projectImages/P9/BG3A.jpg",
    //       alt: "BG Image 3A",
    //       width: 2,
    //       pull: 5,
    //     },
    //     {
    //       src: "/projectImages/P9/BG4.jpg",
    //       alt: "BG Image 4",
    //       width: 2,
    //       pull: 1,
    //     },
    //     {
    //       src: "/projectImages/P9/BG4A.jpg",
    //       alt: "BG Image 4A",
    //       width: 2,
    //       pull: 4,
    //     },
    //   ],
    // },
    // {
    //   id: "11",
    //   title: "Finland 100", // TO FILL
    //   roles: "Game Design / Concept Development", // TO FILL
    //   year: "2018",
    //   description:
    //     "Communication project of memo game and merchandising developed to honor and showcase the rich cultural legacy of Finnish pattern design. Created in for of the 'Finland 100' national initiative, the game was produced in collaboration with the Finnish National Gallery and Aalto University’s School of Arts, Design and Architecture in Helsinki.", // TO FILL
    //   sectionLabel: "Business",
    //   width: 4,
    //   pull: 1,
    //   images: [
    //     {
    //       src: "/projectImages/P10/pdff1.jpg",
    //       alt: "PDFF Image 1",
    //       width: 6,
    //       pull: 1,
    //     },
    //     {
    //       src: "/projectImages/P10/pdff2.jpg",
    //       alt: "PDFF Image 2",
    //       width: 4,
    //       pull: 2,
    //     },
    //     {
    //       src: "/projectImages/P10/pdff3.jpg",
    //       alt: "PDFF Image 3",
    //       width: 4,
    //       pull: 3,
    //     },
    //     {
    //       src: "/projectImages/P10/pdff4.jpg",
    //       alt: "PDFF Image 4",
    //       width: 4,
    //       pull: 1,
    //     },
    //   ],
    // },
  ];

  // Build dynamic year labels (chronological: earliest -> latest)
  const yearLabels = Array.from(new Set(projects.map((p) => p.year))).sort(
    (a, b) => {
      const extract = (y: string) => {
        const m = y.match(/\d{4}/);
        return m ? parseInt(m[0], 10) : Number.POSITIVE_INFINITY;
      };
      const na = extract(a);
      const nb = extract(b);
      if (na !== nb) return na - nb;
      return a.localeCompare(b);
    }
  );

  const sections = ["All", "Business", "Cultural", ...yearLabels];
  const yearSet = new Set(yearLabels);

  // Updated filtering: distinguishes between category and year
  let filteredProjects: Project[];
  if (!selectedSection || selectedSection === "All") {
    filteredProjects = projects;
  } else if (yearSet.has(selectedSection)) {
    filteredProjects = projects.filter((p) => p.year === selectedSection);
  } else {
    filteredProjects = projects.filter(
      (p) => p.sectionLabel === selectedSection
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.menuButton}>
          <MenuButton />
        </div>
        <HeaderBar
          headline="Hej! I'm Slawomir Jakub Krzyzak"
          subheadline="Web Design and Development Projects"
          sections={[]}
        />
        <SectionsNavBar
          sections={sections}
          selectedSection={selectedSection}
          onSectionClick={handleSectionClick}
          mode="filter"
        />
        <div className={styles.projectsContainer}>
          {filteredProjects.map((project) => (
            <ProjectContainer key={project.id} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
