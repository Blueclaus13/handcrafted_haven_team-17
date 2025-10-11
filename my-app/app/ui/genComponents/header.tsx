'use client';
import Image from 'next/image';
import Nav from './nav';
import style from "../componentStyles/header.module.css";
import Button from './button';
import Link from 'next/link';
import {signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status: sessionStatus } = useSession();

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
        {sessionStatus === "loading" ? (
          <p>Loading...</p>
        ) : session?.user ? (
          <>
            <Link href="/profile">
              <Button>Profile</Button>
            </Link>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
            <Link href="/registration">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
  </div>);
}