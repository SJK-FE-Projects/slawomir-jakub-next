"use client";

import styles from "./navbar.module.css";
import MenuButton from "./MenuButton";
import SectionButton from "./SectionButton";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const sections = [
    "Professional Summary",
    "Professional Experience",
    "Education & Training",
    "Technical Skills",
    "Selected Clients",
  ];
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  // Height of navbar (adjust if needed)
  const NAVBAR_HEIGHT = 80;
  return (
    <nav className={styles.navbar}>
      <div className={styles.headlines}>
        <span className={styles.logo}>Sławomir Jakub</span>
        <h1 className={styles.headline}>
          Hej! I&apos;m Slawomir Jakub Krzyzak
        </h1>
        <h2 className={styles.subheadline}>Web Web Projects</h2>
      </div>
      {/* Section navigation row */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          margin: "1rem 0",
        }}
      >
        {sections.map((section) => (
          <SectionButton
            key={section}
            text={section}
            selected={selectedSection === section}
            onClick={() => {
              setSelectedSection(section);
              const anchor = document.getElementById(
                section.toLowerCase().replace(/\s+/g, "-")
              );
              if (anchor) {
                const y =
                  anchor.getBoundingClientRect().top +
                  window.scrollY -
                  NAVBAR_HEIGHT;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          />
        ))}
      </div>
      <div className={styles.stickyMenu}>
        <MenuButton />
      </div>
    </nav>
  );
};

export default Navbar;
