import prisma from "@/prisma/lib/prisma";
import SellerCard from "../ui/genComponents/SellerCard";
import styles from "../ui/componentStyles/SellersPage.module.css";

export default async function SellersPage() {
  const sellers = await prisma.user.findMany({
    where: { isSeller: true },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      userName: true,
      email: true,
      description: true,
      imageUrl: true,
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sellers</h1>
      <div className={styles.grid}>
        {sellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
}
