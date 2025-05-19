import Image from "next/image";
import styles from "./page.module.css";
import SectionButton from "./components/SectionButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SectionButton text="text" selected={true} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
