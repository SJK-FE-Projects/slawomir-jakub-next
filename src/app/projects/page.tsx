import Link from "next/link";
import ProjectBlock from "../components/ProjectBlock";
import styles from "./projects.module.css";
import MenuButton from "../components/MenuButton";
import HeaderBar from "../components/HeaderBar";

type Project = {
  id: string;
  title: string;
  roles: string;
  year: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
  sectionLabel: string;
  width: 3 | 4 | 5 | 6;
  pull: 1 | 2 | 3;
  marginTop: number;
};

// This can be async if you need to fetch data
export default function ProjectsPage() {
  // Example projects data - replace with your actual data
  const projects: Project[] = [
    {
      id: "1",
      title: "PORSCHE",
      roles: "UX / Screen Design / Web Flow",
      year: "2024",
      description:
        "Web flow and screen design for PORSCHE. The backlog UI of the rental system for test drives.",
      images: [
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 1 image",
        },
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 1 image",
        },
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 1 image",
        },
      ],
      sectionLabel: "Business",
      width: 4,
      pull: 1,
      marginTop: 0,
    },
    {
      id: "2",
      title: "Project 2",
      roles: "Role 1, Role 2",
      year: "2024",
      description: "Description of project 2",
      images: [
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 2 image",
        },
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 2 image",
        },
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 2 image",
        },
      ],
      sectionLabel: "Cultural",
      width: 4,
      pull: 1,
      marginTop: -50,
    },
    {
      id: "3",
      title: "Project 3",
      roles: "Role 1",
      year: "2024",
      description: "Description of project 3",
      images: [
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 3 image",
        },
      ],
      sectionLabel: "Cultural",
      width: 3,
      pull: 3,
      marginTop: -50,
    },
  ];

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
          subheadline="Web Design and Development Projects"
          sections={["Bussiness", "Culture"]}
        />{" "}
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${styles[`width3`]} ${styles[`pull0`]}`}
            >
              <Link
                href={`/projects/${project.id}`}
                className={styles.projectLink}
              >
                <ProjectBlock
                  title={project.title}
                  year={project.year}
                  roles={project.roles}
                  description={project.description}
                  images={project.images}
                  sectionLabel={project.sectionLabel}
                />
              </Link>
            </div>
          ))}
        </div>
      </main>{" "}
      <footer className={styles.footer}></footer>{" "}
    </div>
  );
}
