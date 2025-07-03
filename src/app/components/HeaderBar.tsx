import React from "react";
import SectionButton from "./SectionButton";
import styles from "./HeaderBar.module.css";

type HeaderBarProps = {
  headline: string;
  subheadline: string;
  sections: string[];
  selectedSection?: string | null;
  onSectionClick?: (section: string | null) => void;
};

const HeaderBar: React.FC<HeaderBarProps> = ({
  headline,
  subheadline,
  sections,
  selectedSection,
  onSectionClick,
}) => {
  const handleSectionClick = (section: string) => {
    if (onSectionClick) {
      // If clicking the same section, deselect it (show all)
      if (selectedSection === section) {
        onSectionClick(null);
      } else {
        onSectionClick(section);
      }
    }
  };

  return (
    <nav>
      <div>
        <h1>{headline}</h1>
        <h2>{subheadline}</h2>
      </div>
      <div className={styles.sectionButtonsContainer}>
        {sections.map((section, idx) => (
          <SectionButton
            key={idx}
            text={section}
            selected={selectedSection === section}
            onClick={() => handleSectionClick(section)}
          />
        ))}
      </div>
    </nav>
  );
};

export default HeaderBar;
