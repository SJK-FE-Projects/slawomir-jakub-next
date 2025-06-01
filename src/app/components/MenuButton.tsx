"use client";

import Link from "next/link";
import styles from "./MenuButton.module.css";

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

const MenuButton = () => {
  return (
    <div className={styles.menuContainer}>
      {menuItems.map((item) => (
        <Link key={item.href} href={item.href} className={styles.menuItem}>
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default MenuButton;
