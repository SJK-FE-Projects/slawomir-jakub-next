// src/components/TextBlock.tsx
import React from "react";
import styles from "./TextBlock.module.css";

type BaseProps = {
  /** common styling/layout props */
  className?: string;
};

type LargeProps = BaseProps & {
  variant: "large";
  text: string;
  actionLabel: string;
  onActionClick?: () => void;
};

type DateProps = BaseProps & {
  variant: "date";
  title: string;
  dateFrom: string;
  dateTo?: string;
  description: string;
};

type SkillsProps = BaseProps & {
  variant: "skills";
  label: string;
  items: string[];
};

type ClientsProps = BaseProps & {
  variant: "clients";
  region: string;
  clients: string[];
};

export type TextBlockProps =
  | LargeProps
  | DateProps
  | SkillsProps
  | ClientsProps;

export default function TextBlock(props: TextBlockProps) {
  switch (props.variant) {
    case "large":
      const { text, actionLabel, onActionClick, className } = props;
      return (
        <div className={`${styles.block} ${className ?? ""}`}>
          <button className={styles.actionButton} onClick={onActionClick}>
            {actionLabel}
          </button>
          <div className={styles.textLarge}>{text}</div>
        </div>
      );

    case "date":
      const { title, dateFrom, dateTo, description } = props;
      return (
        <div className={styles.block}>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>
            {dateFrom}
            {dateTo ? `—${dateTo}` : ""}
          </div>
          <div className={styles.desc}>{description}</div>
        </div>
      );

    case "skills":
      return (
        <div className={styles.block}>
          <div className={styles.title}>{props.label}</div>
          <ul className={styles.list}>
            {props.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      );

    case "clients":
      return (
        <div className={styles.block}>
          <div className={styles.title}>{props.region}</div>
          <ul className={styles.list}>
            {props.clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      );
  }
}
