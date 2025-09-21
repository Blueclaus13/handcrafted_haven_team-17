import Link from 'next/link';
import style from "../componentStyles/nav.module.css";

export default function Nav() {
  return (
  <div className={style.navbar}>
    <ul className={style.navList}>
      <li className={style.navItem}>
        <Link href="/">Home</Link>
      </li>
      <li className={style.navItem}>
        <Link href="/Marketplace">Marketplace</Link>
      </li>
      <li className={style.navItem}>
        <Link href="/Sellers">Sellers</Link>
      </li>
    </ul>
  </div>);
}