import Link from "next/link";
import React from "react";
import MediaElement from "../components/MediaElement";
import SectionButton from "../components/SectionButton";
import styles from "./project.module.css";

const project = {
  title: "PORSCHE",
  year: "2022",
  roles: "UX Design / Screen Design / Visual Design",
  sectionLabel: "Business",
  description:
    "Web flow and screen design for PORSCHE. The backlog UI of the rental system for test drives.",
  media: [
    {
      src: "/projectImages/P1/PorscheLogin.mp4",
      alt: "Porsche UI Design",
    },
    {
      src: "/projectImages/P1/Porsche1.jpg",
      alt: "Porsche Login Animation",
    },
    {
      src: "/projectImages/P1/Porsche2.jpg",
      alt: "Porsche Interface",
    },
    {
      src: "/projectImages/P1/Porsche3.jpg",
      alt: "Porsche Design System",
    },
    {
      src: "/projectImages/P1/PorscheIcons.mp4",
      alt: "Porsche Icons Animation",
    },
  ],
};

export default function ProjectPage() {
  return (
    <div className={styles.overlay}>
      {" "}
      <div className={styles.overlayInner}>
        {" "}
        <div className={styles.leftColumn}>
          {" "}
          <Link
            href="/projects"
            className={`button $ {
                styles.backButton
            }

            `}
          >
            {" "}
            Back to projects{" "}
          </Link>{" "}
          <div className={styles.projectMeta}>
            {" "}
            <div className="textCaption"> {project.year}</div>{" "}
            <SectionButton text={project.sectionLabel} selected={false} />{" "}
          </div>{" "}
          <h1 className="textLarge"> {project.title}</h1>{" "}
          <div className="textCaption"> {project.roles}</div>{" "}
          <p className="textDefault"> {project.description}</p>{" "}
        </div>{" "}
        <div className={styles.rightColumn}>
          {" "}
          {project.media.map((item, index) => (
            <div
              key={`$ {
                            item.src
                        }

                        -$ {
                            index
                        }

                        `}
              className={styles.mediaSlide}
            >
              {" "}
              <MediaElement
                src={item.src}
                alt={item.alt}
                width={1200}
                height={900}
                className={styles.media}
              />{" "}
            </div>
          ))}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
