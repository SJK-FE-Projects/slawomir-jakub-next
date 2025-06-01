import React from "react";
import SectionButton from "./SectionButton";
import styles from "./HeaderBar.module.css";

type HeaderBarProps = {
  headline: string;
  subheadline: string;
  sections: string[];
  onSectionClick?: (section: string) => void;
};

const HeaderBar: React.FC<HeaderBarProps> = ({
  headline,
  subheadline,
  sections,
  onSectionClick,
}) => {
  return (
    <nav>
      <div>
        <h1>{headline}</h1>
        <h2>{subheadline}</h2>
      </div>
      <div className={styles.sectionButtonsContainer}>
        {sections.map((section, idx) => (
          <SectionButton key={idx} text={section} selected={false} />
        ))}
      </div>
    </nav>
  );
};

export default HeaderBar;
