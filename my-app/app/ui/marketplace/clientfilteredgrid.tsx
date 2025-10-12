"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Filters, { FiltersState } from "../genComponents/filters";
import style from "../componentStyles/products.module.css";

export type Product = {
  id: string | number;
  name: string;
  description: string;
  price: number | string;
  imageUrl: string;
  avgScore: number;
};

function toNumberPrice(value: number | string): number {
  if (typeof value === "number") return value;
  const n = Number(String(value).replace(/[^\d.,-]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export default function ClientFilteredGrid({ products }: { products: Product[] }) {
  // filters that are currently applied to the list
  const [applied, setApplied] = useState<FiltersState>({
    query: "",
    minPrice: "",
    maxPrice: "",
    minScore: "",
  });

  const filtered = useMemo(() => {
    const q = applied.query.trim().toLowerCase();
    const minP = applied.minPrice === "" ? null : Number(applied.minPrice);
    const maxP = applied.maxPrice === "" ? null : Number(applied.maxPrice);
    const minS = applied.minScore === "" ? null : Number(applied.minScore);

    return products.filter((p) => {
      const price = toNumberPrice(p.price);
      const score = Number(p.avgScore ?? 0);

      const matchesQ =
        q.length === 0 ||
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q);

      const matchesMinP = minP === null || price >= minP;
      const matchesMaxP = maxP === null || price <= maxP;
      const matchesMinS = minS === null || score >= minS;

      return matchesQ && matchesMinP && matchesMaxP && matchesMinS;
    });
  }, [products, applied]);

  return (
    <div className={style.container}>
      {/* Filter bar (draft inputs + Apply button) */}
      <Filters initial={applied} onApply={setApplied} />

      {/* Your original card layout (unchanged) */}
      {filtered.map((product) => (
        <div key={product.id} className={style.card}>
          <div className={style.productListImage}>
            <Image
              src={product.imageUrl}
              alt={`Picture of ${product.name}`}
              width={250}
              height={0} // still required, but height controlled by CSS
              style={{ height: "auto" }}
            />
          </div>

          <div>
            <div className={style.productListName}>
              <p>{product.name}</p>
            </div>

            <div className={style.productListDescription}>
              <p>{product.description}</p>
            </div>

            <div className={style.productListPrice}>
              <p>{typeof product.price === "number" ? product.price.toFixed(2) : product.price}</p>
            </div>

            <div className={style.productListScore}>
              Review Score: {Number(product.avgScore ?? 0).toFixed(1)}
            </div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p style={{ opacity: 0.65, padding: "0.75rem 0" }}>
          No products match those filters.
        </p>
      )}
    </div>
  );
}
