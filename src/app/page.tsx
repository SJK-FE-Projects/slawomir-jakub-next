"use client";

import styles from "./page.module.css";
import MenuButton from "./components/MenuButton";
import HeaderBar from "./components/HeaderBar";
import Footer from "./components/Footer";
import SectionButton from "./components/SectionButton";
import SectionsNavBar from "./components/SectionsNavBar";
import ProjectMiniatureHome from "./components/ProjectMiniatureHome";

import { useSectionActiveClass } from "./hooks/useSectionActiveClass";

import React, { useState, useCallback, useMemo, useEffect } from "react";

import TextBlocks, { type TextBlockProps } from "./components/TextBlocks";

// Helper to generate anchor id from label
const toSectionId = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Home() {
  const sectionLabels = useMemo(
    () => [
      "Professional Summary",
      "Technical Skills",
      "Professional Experience",
      "Education & Training",
      "Selected Clients",
    ],
    [],
  );

  // Track which section is selected (only for manual clicks)
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateIsMobile = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    updateIsMobile(mediaQuery);

    const listener = (event: MediaQueryListEvent) => updateIsMobile(event);
    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  // Generate section IDs from labels
  const sectionIds = useMemo(
    () => sectionLabels.map((label) => toSectionId(label)),
    [sectionLabels],
  );

  // Get navbar height from CSS variable
  const getNavbarHeight = useCallback(() => {
    if (typeof window !== "undefined") {
      const rootStyles = getComputedStyle(document.documentElement);
      const navbarHeightRem = rootStyles
        .getPropertyValue("--navbar-height")
        .trim();
      // Convert rem to px (assuming 1rem = 16px)
      return parseFloat(navbarHeightRem) * 16;
    }

    return 96; // fallback
  }, []);

  // Section observer - adds 'active' class to buttons when section is 30%+ visible
  useSectionActiveClass({
    sectionIds,
    offsetTop: getNavbarHeight(),
    enabled: isMobile,
  });

  // TextBlocks data array - simplified structure
  const textBlocks: TextBlockProps[] = [
    {
      id: toSectionId(sectionLabels[0]),
      variant: "large",
      sectionLabel: "Professional Summary",
      text: [
        "UI/Product Designer and Web (Frontend) Developer with 5+ years of expertise in responsive web design, design systems and React, NextJS, JavaScript/TypeScript and HTML5/CSS3.",
        "Skilled in creating user-centric designs and dynamic user interfaces for international clients. Experienced in Agile development, version control with Git, and UI component libraries.",
      ],
    },

    {
      id: toSectionId(sectionLabels[2]),
      variant: "date",
      sectionLabel: "Professional Experience",
      items: [
        {
          title: "Frontend Web Developer",
          date: "2026",
          company: "SIRUP, Berlin (DE)",
          description:
            "Development of responsive, accessible UI components using HTML5, CSS3, TypeScript, Next.js, Fluid, and Twig for clients such as Saxony Works and Burgtheater Vienna.",
        },

        {
          title: "Mentor: UX/UI Design",
          date: "2025 —",
          company: "ReDI School of Digital Integration, Berlin (DE)",
          description:
            "Entwicklung responsiver, barrierefreier UI-Komponenten mit HTML5, CSS3, TypeScript, React und Next.js fur namhafte Kunden wie RedBull und Deutscher Buhnenverein. Implementierung von Designsystemen und Komponentenbibliotheken mit Storybook; Sicherstellung der Codequalitat mittels GitHub, ESLint und Prettier. Zusammenarbeit in agilen Scrum-Teams zur Umsetzung interaktiver digitaler Produkte.",
        },

        {
          title: "Track Lead: Web Development",
          date: "2025 —",
          company: "TechLabs, Berlin (DE)",
          description:
            "Entwicklung responsiver, barrierefreier UI-Komponenten mit HTML5, CSS3, TypeScript, React und Next.js fur namhafte Kunden wie RedBull und Deutscher Buhnenverein. Implementierung von Designsystemen und Komponentenbibliotheken mit Storybook; Sicherstellung der Codequalitat mittels GitHub, ESLint und Prettier. Zusammenarbeit in agilen Scrum-Teams zur Umsetzung interaktiver digitaler Produkte.",
        },

        {
          title: "Web Developer (UI Engineer)",
          date: "2024 — 2025",
          company: "diesdas.digital, Berlin (DE)",
          description:
            "Develop responsive, accessible UI components using HTML5, CSS3, TypeScript, React, and Next.js for high-profile clients such as RedBull and Deutscher Buhnenverein. Built and maintained a design system and component library using Storybook, increasing UI consistency by 30% and reducing front-end bug reports by 20% through ESLint and Prettier integration.",
        },

        {
          title: "Freelance Frontend Developer",
          date: "2024",
          company: "for Hermaid, Hope For Man, Berlin (DE)",
          description:
            "Developed and customized frontend templates for the HopeForMan website, configured TailwindCSS variables, and integrated AlpineJS Blade components in a Laravel environment. Built and deployed 25+ TypeScript React components for the Hermaid website and patient portal, utilizing the Ant Design library and styled-components to deliver a seamless user interface.",
        },

        {
          title: "Senior Web Designer",
          date: "2022 — 2024",
          company: "anschlaege.de, Berlin (DE)",
          description:
            "Figma Evangelist and Master. Digital products for clients from public sector. Leading process from inception to launch, including moderating client workshops, developing comprehensive web flows, user journeys, and screen designs. Conducted hand-offs to dev teams and contributed to frontend development by creating reusable templates and components using HTML, CSS, and JS frameworks and libraries.",
        },

        {
          title: "Freelance Web Designer",
          date: "2019 — 2021",
          company: "CDLX, formdusche, stanhema, WHYBRAND, (DE)",
          description:
            "Designed responsive and cross-media layouts, developed intricate JS animations, and created dynamic JS modules. Engaged in branding and UI design, ensuring cohesive visual identity across all digital platforms.",
        },

        {
          title: "Digital Designer",
          date: "2018 — 2019",
          company: "SMITH Seyffert mit Himmelspach, Berlin (DE)",
          description:
            "Developed wireframes and detailed UI designs for digital products. Enhanced visual communication for clients such as Kressman, Staatliche Museen zu Berlin and Wustenrot.",
        },

        {
          title: "Digital Designer",
          date: "2018",
          company: "Design Team, Scholz & Friends, Warsaw (PL)",
          description:
            "Developed wireframes and detailed UI designs for digital products. Enhanced visual communication for clients such as Kressman, Staatlichemuseum zu Berlin and Wustenrot.",
        },

        {
          title: "Digital Designer",
          date: "2018",
          company: "fabrique, Delft (NL)",
          description:
            "Developed wireframes and detailed UI designs for digital products. Enhanced visual communication for clients such as Kressman, Staatlichemuseum zu Berlin and Wustenrot.",
        },

        {
          title: "Digital Designer",
          date: "2018 —",
          company: "SlawomirJakub, (COM)",
          description:
            "Provided comprehensive UI/UX design and frontend development for fintech, pharma, and public-sector clients and startups.",
        },

        {
          title: "Digital Designer",
          date: "2016",
          company: "FABRICA, Benetton Research Center, Treviso (IT)",
          description:
            "Developed wireframes and detailed UI designs for digital products. Enhanced visual communication for clients such as Kressman, Staatlichemuseum zu Berlin and Wustenrot.",
        },
      ],
    },

    {
      id: toSectionId(sectionLabels[3]),
      variant: "date",
      sectionLabel: "Education",
      items: [
        {
          title: "Backend Development",
          date: "2024",
          company: "Professional Training, DCI Digital Career Institute, (DE)",
          description:
            "Develop responsive, accessible UI components using HTML5, CSS3, TypeScript, React, and Next.js for high-profile clients such as RedBull and Deutscher Buhnenverein. Built and maintained a design system and component library using Storybook, increasing UI consistency by 30% and reducing front-end bug reports by 20% through ESLint and Prettier integration.",
        },

        {
          title: "C Programming",
          date: "2024",
          company: "Training, 42 Berlin, (DE)",
          description:
            "Developed and customized frontend templates for the HopeForMan website, configured TailwindCSS variables, and integrated AlpineJS Blade components in a Laravel environment. Built and deployed 25+ TypeScript React components for the Hermaid website and patient portal, utilizing the Ant Design library and styled-components to deliver a seamless user interface.",
        },

        {
          title: "Fullstack Development",
          date: "2023 — 2024",
          company: "Professional Training, IRONHACK, (EU)",
          description:
            "Figma Evangelist and Master. Digital products for clients from public sector. Leading process from inception to launch, including moderating client workshops, developing comprehensive web flows, user journeys, and screen designs. Conducted hand-offs to dev teams and contributed to frontend development by creating reusable templates and components using HTML, CSS, and JS frameworks and libraries.",
        },

        {
          title: "Frontend Development",
          date: "2021 — 2022",
          company: "Professional Training, DCI Digital Career Institute, (DE)",
          description:
            "Designed responsive and cross-media layouts, developed intricate JS animations, and created dynamic JS modules. Engaged in branding and UI design, ensuring cohesive visual identity across all digital platforms.",
        },

        {
          title: "Graphic Design",
          date: "2016 — 2018",
          company: "MA program at the Academy of Arts, Katowice (PL)",
          description:
            "Developed wireframes and detailed UI designs for digital products. Enhanced visual communication for clients such as Kressman, Staatlichemuseum zu Berlin and Wustenrot.",
        },

        {
          title:
            "Communication Design - ERASMUS+ exchange on MA program, School of Arts",
          date: "2017 — 2018",
          company: "Aalto University, Helsinki (FI)",
          description:
            "Developed and customized frontend templates for the HopeForMan website, configured TailwindCSS variables, and integrated AlpineJS Blade components in a Laravel environment. Built and deployed 25+ TypeScript React components for the Hermaid website and patient portal, utilizing the Ant Design library and styled-components to deliver a seamless user interface.",
        },

        {
          title: "MA Product and Communication Design",
          date: "2015 — 2017",
          company: "Academy of Arts, Warsaw (PL)",
          description:
            "Provided comprehensive UI/UX design and frontend development for fintech, pharma, and public-sector clients and startups.",
        },

        {
          title: "BA Communication Design",
          date: "2011 — 2015",
          company: "School of Form, University SWPS, Poznan (PL)",
          description:
            "Provided comprehensive UI/UX design and frontend development for fintech, pharma, and public-sector clients and startups.",
        },

        {
          title: "Communication Design",
          date: "2015",
          company: "CEEPUS Freemover scholarship, UMPRUM, Prague (CZ)",
          description:
            "Developed wireframes and detailed UI designs for digital products. Enhanced visual communication for clients such as Kressman, Staatlichemuseum zu Berlin and Wustenrot.",
        },
        {
          title: "Communication Design",
          date: "2014 — 2015",
          company: "ERASMUS+ exchange, MOME, Budapest (HU)",
          description:
            "Developed wireframes and detailed UI designs for digital products. Enhanced visual communication for clients such as Kressman, Staatlichemuseum zu Berlin and Wustenrot.",
        },
      ],
    },

    {
      id: toSectionId(sectionLabels[1]),
      variant: "skills",
      sectionLabel: "Skills",
      items: [
        {
          title: "UI/UX & Product Design",
          description:
            "User Research, Personas, Journey Mapping, Information Architecture, Site Mapping, User Flows, Wireframing, Interactive Prototyping, Usability Testing, Interaction & Animation Design, Visual Design, Responsive Web & Mobile Design, Accessibility (WCAG), Product Thinking",
        },

        {
          title: "Web Development",
          description:
            "HTML5, CSS3/Sass, JavaScript (ES6), TypeScript, React, Next.js, Vue.js, Tailwind CSS, Bootstrap, Storybook, Git, ESLint, Prettier",
        },

        {
          title: "Methodologies & Soft Skills",
          description:
            "Agile & Scrum, Design Thinking, Stakeholder Management, Workshop Facilitation, Cross-functional Collaboration, User-centered Design, Remote Team Leadership, Mentoring, Problem-solving, Time Management",
        },

        {
          title: "Design Systems & Tools",
          description:
            "Design Systems, Component Libraries, Design Tokens, Style Guides, Atomic Design, Material design, Figma, Sketch, Adobe XD, FigJam, Miro",
        },

        {
          title: "Languages",
          description: "English (C1), German (C1), Polish (C2)",
        },
      ],
      columns: [
        {
          items: ["UI/UX & Product Design", "Methodologies & Soft Skills"],
        },
        {
          items: ["Web Development", "Design Systems & Tools", "Languages"],
        },
      ],
    },

    {
      id: toSectionId(sectionLabels[4]),
      variant: "skills",
      sectionLabel: "Selected Clients",
      items: [
        {
          title: "EU",
          description: "Deloitte, Scottish Ballet, Zeiss, RedBull",
        },

        {
          title: "DE",
          description:
            "AlephAlpha, Deutscher Bühnenverein, Documenta '15, Gemäldegalerie Berlin, Porsche",
        },

        {
          title: "PL",
          description: "Art Station Foundations, Bank PKO",
        },
      ],
    },
  ];

  const introBlock = textBlocks[0];
  const resumeBlocks = textBlocks.slice(1);

  const projectCards = [
    "/projectImages/P11/blm1.jpg",
    "/projectImages/P12/hm1a.jpg",
    "/projectImages/P13/rbat0.jpg",
    "/projectImages/P1/Porsche1.jpg",
  ];

  return (
    <div className={styles.page}>
      {" "}
      <main className={styles.main}>
        {" "}
        <div className={styles.menuButton}>
          {" "}
          <MenuButton />{" "}
        </div>{" "}
        <HeaderBar
          headline="Hej! I'm Slawomir Jakub Krzyzak"
          subheadline="Web Designer and Developer. Born in PL. Made in EU."
        />{" "}
        <div className={styles.sectionButtons}>
          {" "}
          <SectionsNavBar
            sections={sectionLabels}
            selectedSection={isMobile ? selectedSection : null}
            onSectionClick={setSelectedSection}
            mode="anchor"
            navbarHeight={getNavbarHeight()}
          />{" "}
        </div>{" "}
        <section className={styles.introSection}>
          {" "}
          <div className={styles.introGrid}>
            {" "}
            <div className={styles.introContent}>
              {" "}
              <SectionButton text="Intro" selected={false} />{" "}
              {introBlock.variant === "large" &&
                introBlock.text.map((text, index) => (
                  <p
                    key={index}
                    className="textLarge"
                    dangerouslySetInnerHTML={{
                      __html: text,
                    }}
                  />
                ))}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className={styles.projectsSection}>
          {" "}
          <SectionButton text="Projects" selected={false} />{" "}
          <ProjectMiniatureHome cards={projectCards} href="/projects" />{" "}
        </section>{" "}
        <section className={styles.resumeSection}>
          {" "}
          <TextBlocks cases={resumeBlocks} variant="resume" />{" "}
        </section>{" "}
      </main>{" "}
      <Footer />{" "}
    </div>
  );
}
