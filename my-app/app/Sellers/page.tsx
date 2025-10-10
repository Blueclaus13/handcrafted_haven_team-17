import prisma from "@/prisma/lib/prisma";
import SellerCard from "../ui/seller/SellerCard";
import styles from "../ui/componentStyles/SellersPage.module.css";
import { Seller } from "../lib/definitions";

export default async function SellersPage() {
  const sellers: Seller[] = await prisma.users.findMany({
    where: { is_seller: true }, 
    select: {
      id: true,
      firstname: true,  
      lastname: true,   
      username: true,  
      email: true,
      description: true,
      image_url: true,  
    },
  });

  return (
    <div className={styles.container}>
      <h2>Explore Our Talented Sellers</h2>
      <div className={styles.productsGrid}>
      </div>
      <div className={styles.grid}> 
        {sellers?.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
      </div>
  );
}
