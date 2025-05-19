import React from "react";
import SectionButton from "./SectionButton";

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
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        {sections.map((section, idx) => (
          <SectionButton key={idx} text={section} selected={false} />
        ))}
      </div>
    </nav>
  );
};

export default HeaderBar;
