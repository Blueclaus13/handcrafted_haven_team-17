// app/seller/page.tsx
import Link from "next/link";

export default function SellerPage() {
    return (
        <main className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Seller Page</h1>

            {/* About Seller */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">About the Seller</h2>
                <p>Blueclaus has been creating handcrafted wonders for 10+ years, specializing in wooden crafts and jewelry.</p>
            </section>

            {/* Product List */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Products</h2>
                <ul className="space-y-3">
                    <li className="border rounded p-3">Handmade Necklace - $45</li>
                    <li className="border rounded p-3">Wooden Sculpture - $120</li>
                </ul>
            </section>

            {/* Featured Comments */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
                <blockquote className="border-l-4 pl-4 italic text-gray-600">
                    “Absolutely love the quality and attention to detail!” – Sarah K.
                </blockquote>
            </section>

            {/* Contact Seller */}
            <div className="flex justify-between items-center">
                <Link href="/Sellers/profile">
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Contact Seller
                    </button>
                </Link>
            </div>

            
        </main>
    );
}
