'use client';
import Image from 'next/image';
import Link from 'next/link';
import style from "../componentStyles/footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      {/* Brand & Message */}
      <div className={style.message}>
        <h4>Handcraft Wonders</h4>
        <p className={style.tagline}>Every piece talks a story</p>
        <p className={style.copy}>© 2025 Handcraft Wonders. All rights reserved.</p>
      </div>

      {/* Contact Info */}
      <div className={style.contact}>
        <h5>Contact Us</h5>
        <p>support@handcraftwonders.com</p>
      </div>

      {/* Social Media Links */}
      <div className={style.socialMedia}>
        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Image width={25} height={25} src="/images/facebook.svg" alt="Facebook" />
        </Link>
        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Image width={25} height={25} src="/images/instagram.svg" alt="Instagram" />
        </Link>
        <Link href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
          <Image width={25} height={25} src="/images/pinterest.svg" alt="Pinterest" />
        </Link>
      </div>
    </footer>
  );
}
