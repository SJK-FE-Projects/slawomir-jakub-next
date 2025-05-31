import SectionButton from "./SectionButton";
import Image from "next/image";
import styles from "../projects/project.module.css";

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
  /** Width of the project block (3-6 columns) */
  width?: 3 | 4 | 5 | 6;
  /** Starting column (1-3) */
  pull?: 1 | 2 | 3;
  /** Top margin in pixels (can be negative) */
  marginTop?: number;
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
  width = 6,
  pull = 1,
  marginTop = 0,
  className,
}) => {
  const blockStyle = {
    marginTop: `${marginTop}px`,
    gridColumn: `span ${width}`,
    gridColumnStart: pull,
  };

  return (
    <div
      className={`${styles.projectBlock} ${className ?? ""}`}
      style={blockStyle}
    >
      <div className="textCaption">{year}</div>
      <div className="textRegular">{title}</div>
      <div
        className="textDefault"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <SectionButton text={sectionLabel} selected={false} />
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
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default ProjectBlock;
