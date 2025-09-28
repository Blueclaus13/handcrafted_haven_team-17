// app/seller/profile/page.tsx

export default function SellerProfilePage() {
    return (
        <main className="max-w-3xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Seller Profile</h1>

            {/* Seller Info */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> Blueclaus</p>
                    <p><span className="font-medium">Email:</span> blueclaus@example.com</p>
                    <p><span className="font-medium">Store:</span> Handcrafted Wonders</p>
                </div>
            </section>

            {/* Manage Products */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">My Products</h2>
                <ul className="space-y-3">
                    <li className="border rounded p-3 flex justify-between items-center">
                        <span>Handmade Necklace</span>
                        <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                            Edit
                        </button>
                    </li>
                    <li className="border rounded p-3 flex justify-between items-center">
                        <span>Wooden Sculpture</span>
                        <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                            Edit
                        </button>
                    </li>
                </ul>
            </section>

            {/* Add Product Form */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Product Name" className="border rounded p-2" />
                    <textarea placeholder="Product Description" className="border rounded p-2" />
                    <input type="number" placeholder="Price" className="border rounded p-2" />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Add Product
                    </button>
                </form>
            </section>
        </main>
    );
}
