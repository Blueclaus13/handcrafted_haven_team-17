'use client';
import Image from 'next/image';
import Link from 'next/link';
import style from "../componentStyles/footer.module.css";

export default function Footer() {
  return (
  <div className={style.footer}>
    <div className={style.message}>
        <h4>Handcraft Wonders</h4>
        <p>Every piece talks a story</p>
        <p>© 2025 Handcraft Wonders. All rights reserved.</p>
    </div>
    <div className={style.contact}>
        <h5>Contact us</h5>
        <p>support@handcraftwonders.com</p>
    </div>
    <div className={style.socialMedia}>
        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <Image 
            width={25}
            height={25}
            src="/images/facebook.svg" 
            alt="facebook icon picture" />
        </Link>
        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <Image 
            width={25}
            height={25}
            src="/images/instagram.svg" 
            alt="instagram icon picture" />
        </Link>
        <Link href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <Image 
            width={25}
            height={25}
            src="/images/pinterest.svg" 
            alt="pinterest icon picture" />
        </Link>
    </div>
  </div>);
}