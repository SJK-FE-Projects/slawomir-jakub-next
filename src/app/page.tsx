"use client";

import styles from "./page.module.css";
import MenuButton from "./components/MenuButton";
import HeaderBar from "./components/HeaderBar";
import Footer from "./components/Footer";
import SectionButton from "./components/SectionButton";
import { useFluidElement } from "./hooks/useFluidLoading";
import React, { useState, useEffect, useCallback } from "react";

// Helper to generate anchor id from label
const toSectionId = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// TextBlock types - declared directly in page like Project type in projects page
type BaseProps = {
  sectionLabel: string;
  className?: string;
  id?: string;
};

type LargeProps = BaseProps & {
  variant: "large";
  text: string[];
};

type DateProps = BaseProps & {
  variant: "date";
  items: Array<{
    title: string;
    date: string;
    company: string;
    description: string;
  }>;
};

type SkillsProps = BaseProps & {
  variant: "skills";
  items: Array<{
    title: string;
    description: string;
  }>;
};

type TextBlockProps = LargeProps | DateProps | SkillsProps;

export default function Home() {
  // Inline TextBlock component - using projects page grid system like ProjectContainer
  const TextBlockContainer = ({ textBlock }: { textBlock: TextBlockProps }) => {
    const contentRef = useFluidElement();
    const { sectionLabel, id } = textBlock;

    return (
      <div className={styles.contentGrid} id={id}>
        {/* Section button takes width2 pull1 (columns 1-2) */}
        <div className={`${styles.width2} ${styles.pull1}`}>
          <SectionButton text={sectionLabel} selected={false} />
        </div>

        {/* Content takes width4 pull3 (columns 3-6) */}
        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className={`${styles.width4} ${styles.pull3} section fluid`}
        >
          {textBlock.variant === "large" && Array.isArray(textBlock.text) && (
            <div className={styles.textContent}>
              {textBlock.text.map((text: string, index: number) => (
                <div
                  key={index}
                  className="textLarge"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ))}
            </div>
          )}

          {textBlock.variant === "date" && Array.isArray(textBlock.items) && (
            <div className={styles.textContent}>
              {textBlock.items.map((item, index) => (
                <div key={index} className={styles.dateItem}>
                  <div className="textLarge">{item.title}</div>
                  <div className={styles.meta}>
                    <div className="textRegular">{item.date}</div>
                    <div className="textRegular">{item.company}</div>
                  </div>
                  <div
                    className="textDefault"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              ))}
            </div>
          )}

          {textBlock.variant === "skills" && Array.isArray(textBlock.items) && (
            <div className={styles.textContent}>
              {textBlock.items.map((item, index) => (
                <div key={index} className={styles.skillItem}>
                  <div className="textLarge">{item.title}</div>
                  <div
                    className="textDefault"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Section anchor ids in order
  const sectionIds = [
    "professional-summary",
    "professional-experience",
    "education-training",
    "technical-skills",
    "selected-clients",
  ];
  const sectionLabels = [
    "Professional Summary",
    "Professional Experience",
    "Education & Training",
    "Technical Skills",
    "Selected Clients",
  ];

  // Track which section is active
  const [activeSection, setActiveSection] = useState<string | null>(
    sectionLabels[0]
  );

  useEffect(() => {
    const handleScroll = () => {
      let found = false;

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);

        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(sectionLabels[i]);
            found = true;
            break;
          }
        }
      }

      if (!found) setActiveSection(null);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, sectionLabels]); // ✅ Add missing dependencies

  // TextBlocks data array - simplified structure
  const textBlocks: TextBlockProps[] = [
    {
      id: toSectionId(sectionLabels[0]),
      variant: "large",
      sectionLabel: "Professional Summary",
      text: [
        "Curious and innovative Fullstack (Frontend) Developer, and <span class='smallCaps'>ui</span> Designer with 5 years of expertise in responsive web design, design systems and React.js, Next.js, JavaScript/TypeScript and <span class='smallCaps'>html5/css3</span>.",
        "Skilled in creating user-centric designs and dynamic user interfaces for international clients. Experienced in Agile development, version control with Git, and <span class='smallCaps'>ui</span> component libraries.",
      ],
    },

    {
      id: toSectionId(sectionLabels[1]),
      variant: "date",
      sectionLabel: "Professional Experience",
      items: [
        {
          title: "Web Developer",
          date: "11.2024 — ",
          company: "diesdas.digital, Berlin (DE)",
          description:
            "Utilizing <span class='smallCaps'>html5</span>, <span class='smallCaps'>css3</span>, TypeScript, and JavaScript frameworks such as Next.js to build responsive and dynamic user interfaces for clients like: RedBull, Deutscher Bühnenverein and others. Employing GitHub for version control, and tools like ESLint and Prettier for maintaining code quality and consistency. Built reusable <span class='smallCaps'>ui</span> components with Storybook, accelerating development by 25%. Architected and implemented <span class='smallCaps'>ssr</span> and <span class='smallCaps'>ssg</span> workflows in Next.js for Wooga's June's Journey gaming platform, boosting <span class='smallCaps'>seo</span> and initial-load performance. Developed custom Sanity <span class='smallCaps'>cms</span> page-section panels. Defined and maintained Sanity schemas with TypeScript types.",
        },

        {
          title: "Freelance Web Developer",
          date: "07.2024 — 12.2024",
          company: "for startups: Hermaid, Hope For Man, (DE)",
          description:
            "Successfully delivered frontend templates using Tailwind <span class='smallCaps'>css</span>, AlpineJS, and Blade components within Laravel, cutting frontend integration time by 30%. Enhanced user interaction by building React components using TypeScript, Ant Design, and styled-components, resulting in a 20% increase in user engagement.",
        },

        {
          title: "Senior Web Designer",
          date: "01.2022 — 01.2024",
          company: "anschlaege.de, Berlin (DE)",
          description:
            "Figma Evangelist and Master. Led end-to-end web projects from initial client workshops to successful launches for public sector clients, improving project delivery timelines by 15%. Facilitated client workshops, driving consensus and reducing revision cycles by 25%. Designed and executed comprehensive web flows and user journeys, enhancing user satisfaction by over 30%.",
        },

        {
          title: "Freelance Web Designer",
          date: "2019 — 2021",
          company: "with agencies: cdlx, Formdusche, STANHEMA, WHYBRAND, (DE)",
          description:
            "Designed responsive layouts, JS animations, dynamic modules, branding, and <span class='smallCaps'>ui</span> elements.",
        },
      ],
    },

    {
      id: toSectionId(sectionLabels[2]),
      variant: "date",
      sectionLabel: "Education & Training",
      items: [
        {
          title: "Backend WebDev",
          date: "2024",
          company: "Professional Training, DCI Digital Career Institute, (DE)",
          description: "",
        },

        {
          title: "C Programming Bootcamp",
          date: "2024",
          company: "42 Berlin, (DE)",
          description: "",
        },

        {
          title: "Fullstack WebDev",
          date: "2023 — 2024",
          company: "Professional Training, IRONHACK, (EU)",
          description: "",
        },

        {
          title: "Frontend WebDev",
          date: "2021 — 2022",
          company: "Professional Training, DCI Digital Career Institute, (DE)",
          description: "",
        },

        {
          title: "Graphic Design",
          date: "2016 — 2018",
          company: "MA program at the Academy of Arts, Katowice (PL)",
          description: "",
        },

        {
          title: "M.A. Product & Communication Design",
          date: "2015 — 2017",
          company: "Academy of Arts, Warsaw (PL)",
          description: "",
        },

        {
          title: "B.A. Communication Design",
          date: "2011 — 2015",
          company: "School of Form, University SWPS, Poznan (PL)",
          description: "",
        },

        {
          title: "Technical Physics",
          date: "2010 — 2011",
          company:
            "Engineering (B.Sc.) Program, PW Warsaw University of Technology (PL)",
          description: "",
        },
      ],
    },

    {
      id: toSectionId(sectionLabels[3]),
      variant: "skills",
      sectionLabel: "Technical Skills",
      items: [
        {
          title: "Frontend",
          description:
            "<span class='smallCaps'>html5</span>, <span class='smallCaps'>css3</span>, <span class='smallCaps'>sass/less</span>, JavaScript <span class='smallCaps'>(es6+)</span>, TypeScript, React.js, Next.js, Vue.js, Tailwind css, Material <span class='smallCaps'>ui</span>, Mantine, Bootstrap, Storybook, Headless Web-Apps, eCommerce",
        },

        {
          title: "Design & UX",
          description:
            "Figma, Adobe cc, <span class='smallCaps'>ui/ux</span> Design, Prototyping, Responsive Design, User Flows, Wireframing",
        },

        {
          title: "Soft skills",
          description:
            "<span class='smallCaps'>agile/scrum</span>, Team Collaboration, Workshop Facilitation",
        },

        {
          title: "Backend",
          description:
            "Node.js, <span class='smallCaps'>json</span> Server, <span class='smallCaps'>rest api</span>, <span class='smallCaps'>crud</span>, <span class='smallCaps'>jwt</span> Authentication, Continuous Learning, Code Review, Git, GitHub, Deployment (Netlify, Vercel), <span class='smallCaps'>mern</span> Stack (Mongodb, Express, React, Node.js)",
        },

        {
          title: "DevOps",
          description: "GitLab <span class='smallCaps'>ci/cd</span>, Docker",
        },

        {
          title: "Languages",
          description:
            "English (<span class='smallCaps'>c1</span>), German (<span class='smallCaps'>c1</span>), Polish (<span class='smallCaps'>c2</span>)",
        },

        {
          title: "Performance & Testing",
          description:
            "Performance, Core Web Vitals, <span class='smallCaps'>ai</span> DevTools",
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

  // Before:
  // useEffect(() => {
  //   const onResize = () => {
  //     // uses values like width, height, someState, etc.
  //   };
  //   window.addEventListener("resize", onResize);
  //   return () => window.removeEventListener("resize", onResize);
  // }, []); // missing dependencies

  // After: memoize handler with proper dependencies
  const onResize = useCallback(
    () => {
      // ...existing code that uses width/height/someState/refs...
    },
    [
      // add actual dependencies used inside onResize, e.g.:
      // width, height, someState
    ]
  );

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

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
          sections={sectionLabels}
          selectedSection={activeSection}
          onSectionClick={(section) => {
            if (!section) return;
            const anchor = document.getElementById(toSectionId(section));

            if (anchor) {
              anchor.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }

            setActiveSection(section);
          }}
        />{" "}
        {/* Content wrapper following projects pattern */}
        <div className={styles.contentContainer}>
          {textBlocks.map((textBlock) => (
            <TextBlockContainer key={textBlock.id} textBlock={textBlock} />
          ))}
        </div>{" "}
      </main>{" "}
      <Footer />
    </div>
  );
}
