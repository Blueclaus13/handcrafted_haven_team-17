"use client";

import Image from "next/image";
import styles from "../componentStyles/SellerCard.module.css";

type Seller = {
  id: string;
  firstname: string;  
  lastname: string;   
  username: string;    
  email: string;
  description?: string | null;
  image_url?: string | null; 
};



export default function SellerCard({ seller }: { seller: Seller }) {

  return (
    <div className={styles.card}>
        <Image
          src={`${seller.image_url? seller.image_url : "/users/placeholder-picture-profile.jpg"}`}
          alt={`${seller.firstname} ${seller.lastname}`}
          width={100}
          height={100}
          className={styles.avatar}
        />
      <h2 className={styles.name}>
        {seller.firstname} {seller.lastname}
      </h2>
      <p className={styles.username}>@{seller.username}</p>
      {seller.description && (
        <p className={styles.description}>{seller.description}</p>
      )}
    </div>
  );
}
