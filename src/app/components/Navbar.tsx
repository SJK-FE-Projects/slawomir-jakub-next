"use client";

import styles from "./navbar.module.css";
import MenuButton from "./MenuButton";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.headlines}>
        <span className={styles.logo}>Sławomir Jakub</span>
        <h1 className={styles.headline}>
          Hej! I&apos;m Slawomir Jakub Krzyzak
        </h1>
        <h2 className={styles.subheadline}>Web Web Projects</h2>
      </div>
      <div className={styles.stickyMenu}>
        <MenuButton />
      </div>
    </nav>
  );
};

export default Navbar;
