import Link from "next/link";
import ProjectBlock from "../components/ProjectBlock";
import styles from "./project.module.css";

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
      title: "Project 1",
      roles: "Role 1, Role 2, Role 3",
      year: "2024",
      description: "Description of project 1",
      images: [
        {
          src: "/projectImages/jim2.jpg",
          alt: "Project 1 image",
        },
      ],
      sectionLabel: "View Details",
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
      ],
      sectionLabel: "View Details",
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
      sectionLabel: "View Details",
      width: 3,
      pull: 3,
      marginTop: -50,
    },
  ];

  return (
    <main className={styles.container}>
      {" "}
      <div className={styles.projectGrid}>
        {" "}
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/$ {
                            project.id
                        }

                        `}
            className={styles.projectLink}
          >
            {" "}
            <ProjectBlock
              roles={project.roles}
              title={project.title}
              year={project.year}
              description={project.description}
              images={project.images}
              sectionLabel={project.sectionLabel}
              width={project.width}
              pull={project.pull}
              marginTop={project.marginTop}
            />{" "}
          </Link>
        ))}
      </div>{" "}
    </main>
  );
}
