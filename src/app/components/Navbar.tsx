"use client";

import styles from "./navbar.module.css";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.headlines}>
        <h1 className={styles.logo}>Slawomir Jakub</h1>
        <h1 className={styles.headline}>
          Hej! I&apos;m Slawomir Jakub Krzyzak
        </h1>
        <h2 className={styles.subheadline}>Web Web Projects</h2>
      </div>
    </nav>
  );
};

export default Navbar;
