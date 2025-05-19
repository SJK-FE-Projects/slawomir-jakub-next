import Image from "next/image";
import styles from "./page.module.css";
import SectionButton from "./components/SectionButton";
import MenuButton from "./components/MenuButton";
import HeaderBar from "./components/HeaderBar";

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
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
