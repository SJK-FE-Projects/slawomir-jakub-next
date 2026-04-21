import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectMiniatureHome.module.css";

type ProjectMiniatureHomeProps = {
  cards: string[];
  href: string;
};

export default function ProjectMiniatureHome({
  cards,
  href,
}: ProjectMiniatureHomeProps) {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        {cards.map((src, index) => (
          <div key={src} className={styles.card}>
            <Image
              src={src}
              alt={`Project card ${index + 1}`}
              width={800}
              height={500}
              sizes="(max-width: 768px) 72vw, 800px"
              className={styles.image}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <Link href={href} className={styles.link}>
        See more →
      </Link>
    </div>
  );
}
