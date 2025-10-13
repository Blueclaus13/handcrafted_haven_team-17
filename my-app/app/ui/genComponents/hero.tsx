'use client';

import Image from "next/image";
import styles from "../componentStyles/hero.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <section className={styles.hero}>
      {/* Left: Text */}
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to HandCrafted Haven</h1>
        <p className={styles.subtitle}>
          Exlpore unique, handmade treasures crafted with love.
        </p>

        {/* Change the link depending on session */}
        {sessionStatus === "loading" ? (
          <p>Loading...</p>
        ) : session?.user ? (
          <Link href="/profile" className={styles.registerLink}>
            Profile →
          </Link>
        ) : (
          <Link href="/registration" className={styles.registerLink}>
            Register →
          </Link>
        )}
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
