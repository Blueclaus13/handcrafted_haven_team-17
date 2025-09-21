'use client';
import Image from 'next/image';
import Nav from './nav';
import style from "../componentStyles/header.module.css";
import Button from './button';

export default function Header() {
  return (
  <div className={style.header}>
    <div className={style.logo}>
        <Image 
        width={50}
        height={50}
        src="/images/placeholder-logo.png" 
        alt="placeholder logo" />
        <p className='smallText'>HANDCRAFTED</p>
    </div>
    <Nav/>
    <div className={style.signProfile}>
        {/* <p>Sign In or</p>
        <p>Profile</p> */}
        <Button text="Sign In or Profile" onClick={() => alert("Sign In clicked!")} />
    </div>
  </div>);
}