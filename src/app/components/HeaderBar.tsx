import React from "react";
import styles from "./HeaderBar.module.css";

type HeaderBarProps = {
  headline: string;
  subheadline: string;
};

const HeaderBar: React.FC<HeaderBarProps> = ({ headline, subheadline }) => {
  return (
    <nav>
      <div className={styles.navWrapper}>
        <h1>{headline}</h1>
        <h2>{subheadline}</h2>
      </div>
    </nav>
  );
};

export default HeaderBar;
