// src/components/TextBlock.tsx
import React from "react";
import SectionButton from "./SectionButton";
import styles from "./TextBlock.module.css";

type BaseProps = {
  /** text for the SectionButton */
  sectionLabel: string;
  /** optional class override */
  className?: string;
  /** optional id for the section */
  id?: string;
};

type LargeProps = BaseProps & {
  variant: "large";
  /** main body text items */
  text: string[];
};

type DateProps = BaseProps & {
  variant: "date";

  /** array of experience items */
  items: Array<{
    /** position or role title */
    title: string;
    /** date string (e.g. "Jan 2020 – Mar 2022") */
    date: string;
    /** company name */
    company: string;
    /** description copy */
    description: string;
  }>;
};

type SkillsProps = BaseProps & {
  variant: "skills";

  /** array of skill items */
  items: Array<{
    /** heading for this skill block */
    title: string;
    /** descriptive text under the heading */
    description: string;
  }>;
};

export type TextBlockProps = LargeProps | DateProps | SkillsProps;

const TextBlock = React.forwardRef<HTMLDivElement, TextBlockProps>(
  (props, ref) => {
    const { sectionLabel, className, id } = props;

    switch (props.variant) {
      case "large": {
        return (
          <div
            ref={ref}
            className={`$ {
                            styles.block
                        }

                        $ {
                            className ?? ""
                        }

                        `}
            id={id}
          >
            {" "}
            <div className={styles.sectionButtonContainer}>
              {" "}
              <SectionButton text={sectionLabel} selected={false} />{" "}
            </div>{" "}
            <div className={styles.contentContainerLarge}>
              {" "}
              {/* <img src="/projectImages/Slawomir_S.jpg" alt="Profile" />{" "}
              <div className={styles.textContainer}> */}
              {props.text.map((text, index) => (
                <div
                  key={index}
                  className="textLarge"
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                />
              ))}
              {/* </div> */}
            </div>{" "}
          </div>
        );
      }

      case "date": {
        return (
          <div
            ref={ref}
            className={`$ {
                            styles.block
                        }

                        $ {
                            className ?? ""
                        }

                        `}
            id={id}
          >
            {" "}
            <div className={styles.sectionButtonContainer}>
              {" "}
              <SectionButton text={sectionLabel} selected={false} />{" "}
            </div>{" "}
            <div className={styles.contentContainer}>
              {" "}
              {props.items.map((item, index) => (
                <div key={index} className={styles.dateItem}>
                  {" "}
                  <div className="textLarge"> {item.title}</div>{" "}
                  <div className={styles.meta}>
                    {" "}
                    <div className="textRegular"> {item.date}</div>{" "}
                    <div className="textRegular"> {item.company}</div>{" "}
                  </div>{" "}
                  <div
                    className="textDefault"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />{" "}
                </div>
              ))}
            </div>{" "}
          </div>
        );
      }

      case "skills": {
        return (
          <div
            ref={ref}
            className={`$ {
                            styles.block
                        }

                        $ {
                            className ?? ""
                        }

                        `}
            id={id}
          >
            {" "}
            <div className={styles.sectionButtonContainer}>
              {" "}
              <SectionButton text={sectionLabel} selected={false} />{" "}
            </div>{" "}
            <div className={styles.contentContainer}>
              {" "}
              {props.items.map((item, index) => (
                <div key={index} className={styles.skillItem}>
                  {" "}
                  <div className="textLarge"> {item.title}</div>{" "}
                  <div
                    className="textDefault"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />{" "}
                </div>
              ))}
            </div>{" "}
          </div>
        );
      }
    }
  }
);

TextBlock.displayName = "TextBlock";

export default TextBlock;
