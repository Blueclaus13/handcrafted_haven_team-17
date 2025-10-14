'use client';
import Link from 'next/link';
import style from "../componentStyles/nav.module.css";
import { useState } from "react";
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/Sellers", label: "Sellers" },
  ];

  return (
    <nav className={style.navbar}>
      <button
        className={style.menuToggle}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? "✖" : "☰"}
      </button>

      <ul className={`${style.navList} ${open ? style.open : ""}`}>
        {navItems.map((item) => (
          <li
            key={item.href}
            className={`${style.navItem} ${
              pathname === item.href ? style.active : ""
            }`}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}