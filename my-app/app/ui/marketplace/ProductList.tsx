
import ClientFilteredGrid from "./clientfilteredgrid";

/**
 * Server component:
 * - Fetches all products once (SSR)
 * - Hands them to the client grid which handles interactive filtering
 */
export type Product = {
  id: string | number;
  name: string;
  description: string;
  price: number | string;
  imageUrl: string;
  avgScore: number;
};
export default async function ProductList({ products }: { products: Product[] }) {
  
  return <ClientFilteredGrid products={products} />;
}
