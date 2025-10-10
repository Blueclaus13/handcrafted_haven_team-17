import getAllProducts from "@/app/lib/data";
import ProductList from "../ui/marketplace/ProductList";

export default async function MarketplacePage() {
  const products = await getAllProducts();
  return <ProductList products={products} />;
}