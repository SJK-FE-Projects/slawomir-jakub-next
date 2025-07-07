"use client";

import Link from "next/link";

import { useState, useEffect, useRef } from "react";
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
];

const contactItems = [
  {
    label: "E-Mail",
    href: "mailto:hello@slawomirjakub.com",
  },

  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/slawomirjakubkrzyzak/",
  },

  {
    label: "GitHub",
    href: "https://github.com/mirJakub",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mir.jakub/",
  },
];

const MenuButton = () => {
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleContactDropdown = () => {
    setShowContactDropdown(!showContactDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowContactDropdown(false);
        setShowMobileMenu(false);
      }
    };

    if (showContactDropdown || showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContactDropdown, showMobileMenu]);

  return (
    <div className={styles.menuContainer} ref={dropdownRef}>
      {/* Mobile Menu Button */}
      <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
        Menu
      </button>

      {/* Desktop Menu Row */}
      <div
        className={`${styles.menuRow} ${
          showMobileMenu ? styles.mobileMenuOpen : ""
        }`}
      >
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.menuItem}>
            {item.label}
          </Link>
        ))}
        <div className={styles.dropdownWrapper}>
          <button
            onClick={toggleContactDropdown}
            className={styles.contactButton}
          >
            Contacts
          </button>
        </div>
        {showContactDropdown && (
          <div className={styles.dropdown}>
            {contactItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.dropdownItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuButton;
