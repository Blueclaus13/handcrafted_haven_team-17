import { getProductById } from "@/app/lib/data";
import Image from "next/image";
import style from "@/app/ui/componentStyles/ProductPage.module.css";
import AddReviewClient from "@/app/ui/marketplace/AddReviewClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
          <p className={style.price}>${Number(product.price).toFixed(2)}</p>
        </div>
      </div>

      {/* ✅ delegate reviews + modal handling */}
      <AddReviewClient
        productId={product.id}
        initialReviews={product.reviews.map(r => ({
          ...r,
          product_id: product.id, // add the missing property
        }))}
      />
    </main>
  );
}