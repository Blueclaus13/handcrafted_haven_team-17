import prisma from "@/prisma/lib/prisma";
import SellerCard from "../ui/genComponents/SellerCard";
import styles from "../ui/componentStyles/SellersPage.module.css";

export default async function SellersPage() {
  const sellers = await prisma.users.findMany({
    where: { is_seller: true }, // ✅ match Prisma schema
    select: {
      id: true,
      firstname: true,   // ✅ schema: firstname
      lastname: true,    // ✅ schema: lastname
      username: true,    // ✅ schema: username
      email: true,
      description: true,
      image_url: true,   // ✅ schema: image_url
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
