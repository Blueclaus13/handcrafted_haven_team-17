import prisma from "@/prisma/lib/prisma";
import SellerCard from "../ui/seller/SellerCard";
import styles from "../ui/componentStyles/SellersPage.module.css";

import getAllProducts from "../lib/data";

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

  const products = await getAllProducts();
  const randomProducts = products
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sellers</h1>
      <div className={styles.productsGrid}>
        {randomProducts?.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.imageUrl || "/images/default-product.png"}
              alt={product.name}
              className={styles.productImage}
            />
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productScore}>
              Rating: {product.avgScore.toFixed(1)} / 5
            </p>
          </div>
        ))}
      </div>
        <h2>
          Explore Our Talented Sellers
        </h2>
      <div className={styles.grid}> 
        {sellers?.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
      </div>
  );
}
