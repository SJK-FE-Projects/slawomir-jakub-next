import React from "react";
import SectionButton from "./SectionButton";
import styles from "./SectionsNavBar.module.css";

type SectionsNavBarProps = {
  sections: string[];
  selectedSection?: string | null;
  onSectionClick?: (section: string | null) => void;
  // Mode determines behavior: 'anchor' for scrolling, 'filter' for filtering
  mode: "anchor" | "filter";
  // Height offset for anchor scrolling (e.g., navbar height)
  navbarHeight?: number;
};

const SectionsNavBar: React.FC<SectionsNavBarProps> = ({
  sections,
  selectedSection,
  onSectionClick,
  mode = "filter",
  navbarHeight = 80,
}) => {
  const handleSectionClick = (section: string) => {
    if (mode === "anchor") {
      // Handle anchor scrolling for home page
      const anchor = document.getElementById(
        section
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
      if (anchor) {
        const y =
          anchor.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      // Set selected section for visual feedback
      if (onSectionClick) {
        onSectionClick(section);
      }
    } else if (mode === "filter") {
      // Handle filtering for projects page
      if (onSectionClick) {
        // If clicking the same section, deselect it (show all)
        if (selectedSection === section) {
          onSectionClick(null);
        } else {
          onSectionClick(section);
        }
      }
    }
  };

  return (
    <div className={styles.sectionsNavBar}>
      {sections.map((section, idx) => (
        <SectionButton
          key={idx}
          text={section}
          selected={selectedSection === section}
          onClick={() => handleSectionClick(section)}
        />
      ))}
    </div>
  );
};

export default SectionsNavBar;
