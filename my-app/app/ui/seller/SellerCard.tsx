"use client";

import Image from "next/image";
import styles from "../componentStyles/SellerCard.module.css";

type Seller = {
  id: string;
  firstname: string;   // ✅ match Prisma schema
  lastname: string;    // ✅ match Prisma schema
  username: string;    // ✅ match Prisma schema
  email: string;
  description?: string | null;
  image_url?: string | null; // ✅ match Prisma schema
};

export default function SellerCard({ seller }: { seller: Seller }) {
  const defaultImage = "/images/default-profile.jpg";

  return (
    <div className={styles.card}>
      {seller.image_url ? (
        <Image
          src={`/users/${seller.image_url}`}
          alt={`${seller.firstname} ${seller.lastname}`}
          width={100}
          height={100}
          className={styles.avatar}
        />
      ) : (
        <Image
          src={defaultImage}
          alt="Default profile"
          width={100}
          height={100}
          className={styles.avatar}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}

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
