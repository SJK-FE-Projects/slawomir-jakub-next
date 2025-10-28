import React from "react";

const Footer: React.FC = () => {
  const handleScrollTop = () => {
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <footer
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        zIndex: 1,
      }}
    >
      <h3
        className="textRegular"
        onClick={handleScrollTop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleScrollTop();
          }
        }}
        style={{
          cursor: "pointer",
          userSelect: "none",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.7";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        • Slawomir Jakub •
      </h3>
    </footer>
  );
};

export default Footer;
