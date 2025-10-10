"use client";

import Link from "next/link";
import ClientFilteredGrid from "./clientfilteredgrid";

/**
 * Server component:
 * - Fetches all products once (SSR)
 * - Hands them to the client grid which handles interactive filtering
 */
export default async function ProductList() {
  const products = await getAllProducts();
  return <ClientFilteredGrid products={products} />;
}
