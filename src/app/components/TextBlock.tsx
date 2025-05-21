// src/components/TextBlock.tsx
import React from "react";
import SectionButton from "./SectionButton";
import styles from "./TextBlock.module.css";

type BaseProps = {
  /** text for the SectionButton */
  sectionLabel: string;
  /** optional class override */
  className?: string;
};

type LargeProps = BaseProps & {
  variant: "large";
  /** main body text */
  text: string;
};

type DateProps = BaseProps & {
  variant: "date";
  /** position or role title */
  title: string;
  /** date string (e.g. “Jan 2020 – Mar 2022”) */
  date: string;
  /** company name */
  company: string;
  /** description copy */
  description: string;
};

type SkillsProps = BaseProps & {
  variant: "skills";
  /** heading for this skill block */
  title: string;
  /** descriptive text under the heading */
  description: string;
};

export type TextBlockProps = LargeProps | DateProps | SkillsProps;

export default function TextBlock(props: TextBlockProps) {
  const { sectionLabel, className } = props;

  switch (props.variant) {
    case "large": {
      return (
        <div className={`${styles.block} ${className ?? ""}`}>
          <div className={styles.sectionButtonContainer}>
            <SectionButton text={sectionLabel} selected={false} />
          </div>
          <div className={styles.contentContainer}>
            <div className="textLarge">{props.text}</div>
          </div>
        </div>
      );
    }

    case "date": {
      return (
        <div className={`${styles.block} ${className ?? ""}`}>
          <div className={styles.sectionButtonContainer}>
            <SectionButton text={sectionLabel} selected={false} />
          </div>
          <div className={styles.contentContainer}>
            <div className="textLarge">{props.title}</div>
            <div className={styles.meta}>
              <div className="textRegular">{props.date}</div>
              <div className="textRegular">{props.company}</div>
            </div>
            <div className="textDefault">{props.description}</div>
          </div>
        </div>
      );
    }

    case "skills": {
      return (
        <div className={`${styles.block} ${className ?? ""}`}>
          <div className={styles.sectionButtonContainer}>
            <SectionButton text={sectionLabel} selected={false} />
          </div>
          <div className={styles.contentContainer}>
            <div className="textLarge">{props.title}</div>
            <div className="textDefault">{props.description}</div>
          </div>
        </div>
      );
    }
  }
}
