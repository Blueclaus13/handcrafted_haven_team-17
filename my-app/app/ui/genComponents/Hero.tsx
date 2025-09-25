// components/Hero.tsx
// app/components/Hero.tsx
import Image from "next/image";
import styles from "./styles/Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Left: Text */}
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to My App</h1>
        <p className={styles.subtitle}>
          Fast, scalable, and modern web apps made simple with Next.js.
        </p>
        <Link href="/registration" className={styles.registerLink}>
          Register →
        </Link>
      </div>

      {/* Right: Hero Image */}
      <div className={styles.imageWrapper}>
        <Image
          src="/hero-large.png"
          alt="Hero illustration"
          width={600}
          height={500}
          className={styles.image}
          priority
        />
      </div>
    </section>
  );
}