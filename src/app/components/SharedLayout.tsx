import HeaderBar from "./HeaderBar";
import MenuButton from "./MenuButton";

type SharedLayoutProps = {
  children: React.ReactNode;
  headline?: string;
  subheadline?: string;
  sections?: string[];
};

const SharedLayout: React.FC<SharedLayoutProps> = ({
  children,
  headline = "Hej! I'm Slawomir Jakub Krzyzak",
  subheadline = "Web Designer and Developer. Born in PL. Made in EU.",
  sections = [
    "Professional Summary",
    "Professional Experience",
    "Education & Training",
    "Technical Skills",
    "Selected Clients",
  ],
}) => {
  return (
    <>
      <div className="menuButton">
        <MenuButton />
      </div>
      <div className="headerBar">
        <HeaderBar
          headline={headline}
          subheadline={subheadline}
          sections={sections}
        />
      </div>
      {children}
    </>
  );
};

export default SharedLayout;
