import SectionButton from "./SectionButton";
import Image from "next/image";
import styles from "./projectBlock.module.css";

type ProjectImage = {
  /** Image source, imported using next/image or require */
  src: string;
  /** Alt text for accessibility */
  alt: string;
};

export type ProjectBlockProps = {
  /** Project title */
  title: string;
  /** Year or date string */
  year: string;
  /** Project roles */
  roles: string;
  /** Project description (can contain HTML) */
  description: string;
  /** Array of images (imported locally) */
  images: ProjectImage[];
  /** Text for the SectionButton */
  sectionLabel: string;
  /** Optional class override */
  className?: string;
};

const ProjectBlock: React.FC<ProjectBlockProps> = ({
  title,
  year,
  roles,
  description,
  images,
  sectionLabel,
  className,
}) => {
  return (
    <div className={`${styles.projectBlock} ${className ?? ""}`}>
      <div className={styles.projectContent}>
        <div className="textCaption"> — {year}</div>
        <div className={styles.factsContent}>
          <span className="textCaption">{roles}</span>
          <SectionButton text={sectionLabel} selected={false} />
        </div>
        <div className="textRegular">{title}</div>
        <div
          className="textDefault"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </div>
      {images.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
          }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            style={{
              objectFit: "cover",
              borderRadius: "1rem",
            }}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default ProjectBlock;
