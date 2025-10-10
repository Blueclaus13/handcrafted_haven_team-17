"use client";

import Image from "next/image";
import Link from "next/link";
import style from "../componentStyles/products.module.css";

export default function ProductList({ products }: { products: any[] }) {
  return (
    <div className={style.container}>
      {products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product.id}
            href={`/marketplace/${product.id}`}
            className={style.card}
          >
            <div className={style.productListImage}>
              <Image
                src={product.imageUrl}
                alt={`Picture of ${product.name}`}
                width={250}
                height={0}
                style={{ height: "auto" }}
              />
            </div>
            <div className={style.productListName}>
              <p>{product.name}</p>
            </div>
            <div className={style.productListDescription}>
              <p>{product.description}</p>
            </div>
            <div className={style.productListPrice}>
              <p>${product.price}</p>
            </div>
            <div className={style.productListScore}>
              Review Score: {product.avgScore?.toFixed(1) ?? "N/A"}
            </div>
          </Link>
        ))
      ) : (
        <p className={style.noResults}>No products found.</p>
      )}
    </div>
  );
}