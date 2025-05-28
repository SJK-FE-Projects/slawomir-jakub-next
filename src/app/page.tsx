import Image from "next/image";
import styles from "./page.module.css";
import SectionButton from "./components/SectionButton";
import MenuButton from "./components/MenuButton";
import HeaderBar from "./components/HeaderBar";
import TextBlock from "./components/TextBlock";

export default function Home() {
  return (
    <div className={styles.page}>
      {" "}
      <main className={styles.main}>
        {" "}
        <div className={styles.menuButton}>
          <MenuButton />{" "}
        </div>
        <HeaderBar
          headline="Hej! I'm Slawomir Jakub Krzyzak"
          subheadline="Web Designer and Developer. Born in PL. Made in EU."
          sections={[
            "Professional Summary",
            "Professional Experience",
            "Education & Training",
            "Technical Skills",
            "Selected Clients",
          ]}
        />{" "}
        <TextBlock
          variant="large"
          sectionLabel="Professional Summary"
          text={[
            "Curious and innovative Fullstack (Frontend) Developer, and <span class='smallCaps'>ui</span> Designer with 5 years of expertise in responsive web design, design systems and React.js, Next.js, JavaScript/TypeScript and <span class='smallCaps'>html5/css3</span>.",
            "Skilled in creating user-centric designs and dynamic user interfaces for international clients. Experienced in Agile development, version control with Git, and <span class='smallCaps'>ui</span> component libraries.",
          ]}
        />{" "}
        <TextBlock
          variant="date"
          sectionLabel="Professional Experience"
          items={[
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
              company:
                "with agencies: cdlx, Formdusche, STANHEMA, WHYBRAND, (DE)",
              description:
                "Designed responsive layouts, JS animations, dynamic modules, branding, and <span class='smallCaps'>ui</span> elements.",
            },
          ]}
        />
        <TextBlock
          variant="date"
          sectionLabel="Education & Training"
          items={[
            {
              title: "Backend WebDev",
              date: "2024",
              company:
                "Professional Training, DCI Digital Career Institute, (DE)",
              description: "",
            },
            {
              title: "C Programming Bootcamp",
              date: "2024",
              company: "42 BERLIN, (DE)",
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
              company:
                "Professional Training, DCI Digital Career Institute, (DE)",
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
          ]}
        />
        <TextBlock
          variant="skills"
          sectionLabel="Technical Skills"
          items={[
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
              description:
                "GitLab <span class='smallCaps'>ci/cd</span>, Docker",
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
          ]}
        />
        <TextBlock
          variant="skills"
          sectionLabel="Selected Clients"
          items={[
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
          ]}
        />{" "}
      </main>{" "}
      <footer className={styles.footer}></footer>{" "}
    </div>
  );
}
