"use client";

import Image from "next/image";
import styles from "../componentStyles/SellerCard.module.css";
import { Seller } from "../../lib/definitions";

export default function SellerCard({ seller }: { seller: Seller }) {
  const defaultImage = "/images/default-profile.jpg";

  return (
    <div className={styles.card}>
      {seller.imageUrl ? (
        <Image
          src={seller.imageUrl}
          alt={`${seller.firstName} ${seller.lastName}`}
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
            // Hide image if it fails, so initials show
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      {/* fallback initials if no image
      {!seller.imageUrl && (
        <div className={styles.initials}>
          {seller.firstName[0]}
        </div>
      )} */}

      <h2 className={styles.name}>
        {seller.firstName} {seller.lastName}
      </h2>
      <p className={styles.username}>@{seller.userName}</p>
      {seller.description && (
        <p className={styles.description}>{seller.description}</p>
      )}
    </div>
  );
}
