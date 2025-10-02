import SellerCard from "../ui/seller/SellerCard";
import styles from "../ui/componentStyles/SellersPage.module.css";
import { Seller }from "../lib/definitions";
import getAllProducts, { fetchSellers } from "../lib/data";

export default async function SellersPage() {
  const sellers: Seller[] = await fetchSellers();
  const randomProducts = await getAllProducts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sellers</h1>
      <div className={styles.grid}>
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
        {sellers?.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
}
