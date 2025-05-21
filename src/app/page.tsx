import Image from "next/image";
import styles from "./page.module.css";
import SectionButton from "./components/SectionButton";
import MenuButton from "./components/MenuButton";
import HeaderBar from "./components/HeaderBar";
import TextBlock from "./components/TextBlock";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MenuButton />
        <HeaderBar
          headline="Hej! I'm Slawomir Jakub Krzyzak"
          subheadline="Web Designer and Developer. Born in PL. Made in EU."
          sections={["Section 1", "Section 2", "Section 3"]}
        />
        <TextBlock
          variant="large"
          sectionLabel="Who I am"
          text="A Berlin-based ambitious Frontend Developer…"
        />

        <TextBlock
          variant="date"
          sectionLabel="Experience"
          title="Senior Web Designer"
          date="Jan 2020 – Mar 2022"
          company="Acme Co."
          description="Worked on…"
        />

        <TextBlock
          variant="skills"
          sectionLabel="Skillset"
          title="Core Competencies"
          description="React, TypeScript, Figma…"
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
