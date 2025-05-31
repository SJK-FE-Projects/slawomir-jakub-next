"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MenuButton.module.css";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "About",
      href: "/",
    },

    {
      label: "Projects",
      href: "/projects",
    },

    {
      label: "Contacts",
      href: "/contacts",
    },
  ];

  return (
    <div className={styles.menuContainer}>
      {" "}
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {" "}
        Menu{" "}
      </button>{" "}
      {isOpen && (
        <div className={styles.dropdown}>
          {" "}
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              {" "}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
