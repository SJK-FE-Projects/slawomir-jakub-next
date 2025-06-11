import SectionButton from "./SectionButton";
import Image from "next/image";
import styles from "./projectBlock.module.css";

type ProjectImage = {
  src: string;
  alt: string;
  width?: number;
  pull?: number;
};

export type ProjectBlockProps = {
  title: string;
  year: string;
  roles: string;
  description: string;
  images: ProjectImage[];
  sectionLabel: string;
  className?: string;
  width?: 3 | 4 | 5 | 6;
  pull?: 1 | 2 | 3;
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
        <div className={styles.imagesGrid}>
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`${styles[`width${img.width}`]} ${
                styles[`pull${img.pull}`]
              }`}
              style={{
                marginTop: "1rem",
                position: "relative",
                width: "100%",
                height: "auto",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                layout="responsive"
                width={16}
                height={9}
                style={{
                  objectFit: "contain",
                  borderRadius: "1rem",
                  width: "100%",
                  height: "auto",
                }}
                priority
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectBlock;
