"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import style from "@/app/ui/componentStyles/profile.module.css";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) redirect("/login");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    console.log("Submitting form data:", {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      image_file: formData.get("image_file"),
    });

    // API will get seller_id from session
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }

    const data = await response.json();
    setLoading(false);

    console.log("Response from /api/addProduct:", data);

    if (data.success) {
      alert("✅ Product added successfully!");
      e.currentTarget.reset();
    } else {
      alert("❌ " + (data.error || "Failed to add product"));
    }
  };

  return (
    <div className={style.addProductContainer}>
      <h1 className={style.addProductTitle}>Add Product</h1>

      <form onSubmit={handleSubmit} className={style.addProductForm}>
        {/* Product Name */}
        <div className={style.formgroup}>
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            placeholder="e.g., Wooden Fence Panel"
            required
          />
        </div>

        {/* Description */}
        <div className={style.formgroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a short product description..."
            rows={3}
          />
        </div>

        {/* Price */}
        <div className={style.formgroup}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            placeholder="e.g., 150.00"
            required
          />
        </div>

        {/* Image Upload */}
        <div className={style.formgroup}>
          <label htmlFor="image_file">Product Image</label>
          <input
            id="image_file"
            type="file"
            name="image_file"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={style.submitBtn}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
