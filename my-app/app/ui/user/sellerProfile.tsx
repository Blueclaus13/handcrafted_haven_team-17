"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Button from "../genComponents/button";
import style from "../componentStyles/profile.module.css";
import { Product, User } from "@/app/lib/definitions";
import Link from "next/link";
const defaultImage = "/users/placeholder-picture-profile.jpg";

export default function SellerProfilePage({
    userData,
    productsList,
}: {
  userData: User;
  productsList: Product[];
})
     {
    const [products] = useState<Product[]>(productsList);
    const router = useRouter();


    function handleEditProfile() {
        router.push(`profile/editUser/${userData.id}`);
    }
    function handleAddProduct() {
        router.push(`profile/addProduct/${userData.id}`);
    }

    if (!userData) return <p>Loading...</p>;

    return (
        <div className={style.profileContainer}>
            {/* ===== USER INFO SECTION ===== */}
            <section className={style.profileSection}>
                <h2>Profile Information</h2>
                <div className={style.profileInfo}>
                    <div className={style.field}>
                        <p>
                            <span className={style.label}>Name: </span>
                            {userData.firstname} {userData.lastname}
                        </p>
                        <p>
                            <span className={style.label}>Email: </span>
                            {userData.email}
                        </p>
                        <p>
                            <span className={style.label}>Description: </span>
                            {userData.description}
                        </p>
                        <p>
                            <span className={style.label}>Birthday: </span>
                            {userData.birthday.toLocaleDateString()}
                        </p>
                        <p>
                            <span className={style.label}>Member since: </span>
                            {userData.created_at.toLocaleDateString()}
                        </p>
                    </div>

                    {/* ✅ FIXED PROFILE IMAGE */}
                    <Image
                        src={userData.image_url || `${defaultImage}`}
                        alt="Profile Picture"
                        width={80}
                        height={80}
                        className={style.profilePicture}
                    />

                    <Button
                        type="button"
                        className={style.profileButton}
                        onClick={handleEditProfile}
                    >
                        Edit Profile
                    </Button>
                </div>
            </section>

            {/* ONLY SELLER visible */}
           {userData.is_seller && 
           (<div className={style.sellerSections}>
                <Button
                        type="button"
                        className={style.btnAddNewProduct}
                        onClick={handleAddProduct}
                    >
                        Add new Product
                    </Button>

                    {/* ===== PRODUCT LIST TABLE ===== */}
                                     {products && products.length > 0 ? (
                     <section className="tablecontainer">
                        <table className={style.productTable}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div className={style.productListImage}>
                                                <Image
                                                    src={product.image_url || "/images/products/default-product-image.png"}
                                                    alt={`Picture of ${product.name || "product"}`}
                                                    width={60}
                                                    height={60}
                                                    style={{ height: "auto" }}
                                                />
                                            </div>
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Link
                                                href={`/profile/editProduct/${product.id}`}
                                                className={style.editProductLink}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                                        ) : (
                                            <p>You do NOT have Products Added</p>
                                        )}
                </div>)}
        </div>
    );
}