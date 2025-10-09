'use client';
import Link from 'next/link';
import style from "../componentStyles/nav.module.css";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
  <div className={style.navbar}>
      <button 
        className={style.menuToggle} 
        onClick={() => setOpen(!open)} 
        aria-label="Toggle navigation"
      >
      {open ? "✖" : "☰"}
      </button>
    <ul className={`${style.navList} ${open ? style.open : ""}`}>
      <li className={style.navItem}>
        <Link href="/">Home</Link>
      </li>
      <li className={style.navItem}>
        <Link href="/marketplace">Marketplace</Link>
      </li>
      <li className={style.navItem}>
        <Link href="/Sellers">Sellers</Link>
      </li>
    </ul>
  </div>);
}