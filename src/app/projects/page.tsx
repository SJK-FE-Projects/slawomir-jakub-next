"use client";

import React, { useState } from "react";
import SectionsNavBar from "../components/SectionsNavBar";
import styles from "./projects.module.css";
import MenuButton from "../components/MenuButton";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import ProjectPreviewElement from "../components/ProjectPreviewElement";
import { projects, type Project } from "../lib/projectsData";

export default function ProjectsPage() {
  // Initialize with "All" selected instead of null
  const [selectedSection, setSelectedSection] = useState<string | null>("All");

  const handleSectionClick = (section: string | null) => {
    setSelectedSection(section);
  };

  // Build dynamic year labels (chronological: earliest -> latest)
  const yearLabels = Array.from(new Set(projects.map((p) => p.year))).sort(
    (a, b) => {
      const extract = (y: string) => {
        const m = y.match(/\d{4}/);
        return m ? parseInt(m[0], 10) : Number.POSITIVE_INFINITY;
      };
      const na = extract(a);
      const nb = extract(b);
      if (na !== nb) return na - nb;
      return a.localeCompare(b);
    },
  );

  const sections = ["All", "Business", "Cultural", ...yearLabels];
  const yearSet = new Set(yearLabels);

  // Updated filtering: distinguishes between category and year
  let filteredProjects: Project[];
  if (!selectedSection || selectedSection === "All") {
    filteredProjects = projects;
  } else if (yearSet.has(selectedSection)) {
    filteredProjects = projects.filter((p) => p.year === selectedSection);
  } else {
    filteredProjects = projects.filter(
      (p) => p.sectionLabel === selectedSection,
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.menuButton}>
          <MenuButton />
        </div>
        <HeaderBar
          headline="Hej! I'm Slawomir Jakub Krzyzak"
          subheadline="Web Design and Development Projects"
        />
        <div className={styles.sectionButtons}>
          <SectionsNavBar
            sections={sections}
            selectedSection={selectedSection}
            onSectionClick={handleSectionClick}
            mode="filter"
          />
        </div>
        <div className={styles.projectsContainer}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.projectPreviewItem}>
              <ProjectPreviewElement
                id={project.id}
                title={project.title}
                sectionLabel={project.sectionLabel}
                media={project.images[0]}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
