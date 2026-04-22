"use client";

import React from "react";
import SectionButton from "./SectionButton";
import styles from "../page.module.css";

type BaseProps = {
  sectionLabel: string;
  className?: string;
  id?: string;
};

type LargeProps = BaseProps & {
  variant: "large";
  text: string[];
};

type DateProps = BaseProps & {
  variant: "date";
  items: Array<{
    title: string;
    date: string;
    company: string;
    description: string;
  }>;
};

type SkillsProps = BaseProps & {
  variant: "skills";
  items: Array<{
    title: string;
    description: string;
  }>;
  columns?: Array<{
    items: string[];
  }>;
};

export type TextBlockProps = LargeProps | DateProps | SkillsProps;

type TextBlocksProps = {
  cases: TextBlockProps[];
  variant?: "default" | "resume";
};

function TextBlockContainer({
  textBlock,
  variant,
}: {
  textBlock: TextBlockProps;
  variant: "default" | "resume";
}) {
  const { sectionLabel, id } = textBlock;

  if (variant === "resume") {
    return (
      <section className={styles.resumeBlock} id={id}>
        <SectionButton
          text={sectionLabel}
          selected={false}
          className={styles.stickySectionButton}
        />

        {textBlock.variant === "large" && Array.isArray(textBlock.text) && (
          <div className={styles.textContent}>
            {textBlock.text.map((text: string, index: number) => (
              <div
                key={index}
                className="textLarge"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
        )}

        {textBlock.variant === "date" && Array.isArray(textBlock.items) && (
          <div className={styles.textContent}>
            {textBlock.items.map((item, index) => (
              <div key={index} className={styles.dateItem}>
                <div className="textCaption">{item.date}</div>
                <div className="textLarge">{item.title}</div>
                <div className={styles.meta}>
                  <div className="textDefault">{item.company}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {textBlock.variant === "skills" &&
          Array.isArray(textBlock.items) &&
          (textBlock.columns ? (
            <div className={`${styles.textContent} ${styles.skillsColumns}`}>
              {textBlock.columns.map((column, columnIndex) => (
                <div key={columnIndex} className={styles.skillsColumn}>
                  {column.items.map((title) => {
                    const item = textBlock.items.find(
                      (entry) => entry.title === title,
                    );
                    if (!item) return null;

                    return (
                      <div key={item.title} className={styles.skillItem}>
                        <div className="textLarge">{item.title}</div>
                        <div
                          className="textDefault"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.textContent}>
              {textBlock.items.map((item, index) => (
                <div key={index} className={styles.skillItem}>
                  <div className="textLarge">{item.title}</div>
                  <div
                    className="textDefault"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              ))}
            </div>
          ))}
      </section>
    );
  }

  return (
    <div className={styles.contentGrid} id={id}>
      <div className={`${styles.width2} ${styles.pull1}  `}>
        <SectionButton
          text={sectionLabel}
          selected={false}
          className={styles.stickySectionButton}
        />
      </div>

      <div className={`${styles.width4} ${styles.pull3} section fluid`}>
        {textBlock.variant === "large" && Array.isArray(textBlock.text) && (
          <div className={styles.textContent}>
            {textBlock.text.map((text: string, index: number) => (
              <div
                key={index}
                className="textLarge"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
        )}

        {textBlock.variant === "date" && Array.isArray(textBlock.items) && (
          <div className={styles.textContent}>
            {textBlock.items.map((item, index) => (
              <div key={index} className={styles.dateItem}>
                <div className="textCaption">{item.date}</div>
                <div className="textLarge">{item.title}</div>
                <div className={styles.meta}>
                  <div className="textDefault">{item.company}</div>
                </div>
                <div
                  className="textCaption"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            ))}
          </div>
        )}

        {textBlock.variant === "skills" && Array.isArray(textBlock.items) && (
          <div className={styles.textContent}>
            {textBlock.items.map((item, index) => (
              <div key={index} className={styles.skillItem}>
                <div className="textLarge">{item.title}</div>
                <div
                  className="textDefault"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TextBlocks({
  cases,
  variant = "default",
}: TextBlocksProps) {
  if (variant === "resume") {
    const fullWidthCases = cases.filter(
      (textBlock) =>
        textBlock.variant === "skills" && textBlock.sectionLabel === "Skills",
    );
    const columnCases = cases.filter(
      (textBlock) =>
        !(
          textBlock.variant === "skills" && textBlock.sectionLabel === "Skills"
        ),
    );
    const selectedClientsCases = columnCases.filter(
      (textBlock) => textBlock.sectionLabel === "Selected Clients",
    );
    const nonSelectedClientsCases = columnCases.filter(
      (textBlock) => textBlock.sectionLabel !== "Selected Clients",
    );
    const leftColumnCases = nonSelectedClientsCases.filter(
      (_, index) => index % 2 === 0,
    );
    const rightColumnCases = [
      ...nonSelectedClientsCases.filter((_, index) => index % 2 !== 0),
      ...selectedClientsCases,
    ];

    return (
      <div className={styles.textBlocksStack}>
        {fullWidthCases.map((textBlock) => (
          <div key={textBlock.id} className={styles.resumeFullWidthBlock}>
            <TextBlockContainer textBlock={textBlock} variant={variant} />
          </div>
        ))}

        <div className={styles.resumeBlocksGrid}>
          <div className={styles.resumeColumn}>
            {leftColumnCases.map((textBlock) => (
              <TextBlockContainer
                key={textBlock.id}
                textBlock={textBlock}
                variant={variant}
              />
            ))}
          </div>

          <div className={styles.resumeColumn}>
            {rightColumnCases.map((textBlock) => (
              <TextBlockContainer
                key={textBlock.id}
                textBlock={textBlock}
                variant={variant}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const wrapperClass = styles.textBlocksStack;

  return (
    <div className={wrapperClass}>
      {cases.map((textBlock) => (
        <TextBlockContainer
          key={textBlock.id}
          textBlock={textBlock}
          variant={variant}
        />
      ))}
    </div>
  );
}
