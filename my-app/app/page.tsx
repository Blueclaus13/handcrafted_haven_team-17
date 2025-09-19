import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <section className={styles.section}>
        <h1 className={styles.title}>Welcome to My Next.js App</h1>
        <p className={styles.description}>
          Get started by editing <code>app/page.tsx</code>
        </p>
       </section>
    </div>
  );
}
