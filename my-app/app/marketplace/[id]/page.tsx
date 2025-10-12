import { getProductById } from "@/app/lib/data";
import Image from "next/image";
import style from "@/app/ui/componentStyles/ProductPage.module.css";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // 👈 await params first
  const product = await getProductById(id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <main className={style.container}>
      <div className={style.productWrapper}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className={style.image}
        />
        <div className={style.details}>
          <h1 className={style.title}>{product.name}</h1>
          <p className={style.description}>{product.description}</p>
          <p className={style.price}>${product.price}</p>
        </div>
      </div>

      <section className={style.reviews}>
        <h2>Reviews</h2>
        {product.reviews.length > 0 ? (
          <ul className={style.reviewList}>
            {product.reviews.map((r) => (
              <li key={r.id} className={style.reviewItem}>
                <p className={style.reviewScore}>Score: {r.score}/5</p>
                <p>{r.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </main>
  );
}