"use client";
import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Button from "../genComponents/button";
import style from "../componentStyles/profile.module.css";
import { addProduct } from "../../lib/actions";
import { Product, User } from "@/app/lib/definitions";
import Modal from "../genComponents/modal";
import Link from "next/link";
import { useSession } from "next-auth/react";
const defaultImage = "placeholder-picture-profile.jpg";

export default function SellerProfilePage({
    userData,
    productsList,
}: {
  userData: User;
  productsList: Product[];
})
     {
    const { data: session, status: sessionStatus } = useSession();
    console.log(`Session data in profile page:  ${session?.user.id}`);

    const [products, setProducts] = useState<Product[]>(productsList);
    const router = useRouter();

    const initialActionState = {
        errorMessage: "",
        success: false,
    };
    const [actionState, formAction, isPending] = useActionState(
        addProduct,
        initialActionState
    );
    const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);

    function toggleAddProductModal() {
        setShowAddProductModal(!showAddProductModal);
    }

    function handleEditProfile() {
        router.push(`profile/editUser/${userData.id}`);
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
                        src={
                            userData.image_url
                                ? userData.image_url.startsWith("/users/")
                                    ? userData.image_url
                                    : `/users/${userData.image_url}`
                                : `/${defaultImage}`
                        }
                        alt={`${userData.firstname || "User"} ${userData.lastname || ""
                            } Picture`}
                        width={80}
                        height={80}
                        className={style.profilePicture}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `/${defaultImage}`;
                        }}
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
                className={style.btnAddNewProduct}
                type="button"
                onClick={toggleAddProductModal}
                    >Add new Product</Button>
                <Modal  
                    open={showAddProductModal} 
                    onClose={toggleAddProductModal}
                    title="Add New Product">
                    <section className={style.addProductSection}>
                    <form action={formAction}  className={style.formStyle}>
                        <div className={style.formgroup}>
                        <label  htmlFor="productName">Product Name:</label>
                        <input 
                            type="text" 
                            id="productName" 
                            name="productName"
                            placeholder="Product Name" 
                            required/>
                        </div>
                        <div className={style.formgroup}>
                        <label htmlFor="description">Product Description: </label>
                        <textarea 
                            placeholder="Product Description"
                            id="description"
                            name="description"
                            required  />
                        </div>
                        <div className={style.formgroup}>
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="0.00"
                                min={0}
                                step={0.01}
                                required
                            />
                        </div>
                        <div className={style.formgroup}>
                            <label htmlFor="image_file">Upload your photo (.png)</label>
                            <input
                                type="file"
                                id="image_file"
                                name="image_file"
                                accept="image/png"
                                required
                                //onChange={handleFileChange}
                            />
                        </div>
                        <input type="hidden" name="userId" value={userData.id} />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Adding..." : "Add Product"}
                        </Button>
                        {actionState?.errorMessage && (
                            <p className={style.errorMessage}>{actionState.errorMessage}</p>)}
                    </form>
            </section>
                </Modal>

                    {/* ===== PRODUCT LIST TABLE ===== */}
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
                                                    src={
                                                        product.image_url
                                                            ? product.image_url.startsWith("/users/")
                                                                ? product.image_url
                                                                : `/users/${product.image_url}`
                                                            : "/placeholder-picture-profile.jpg"
                                                    }
                                                    alt={`Picture of ${product.name || "product"}`}
                                                    width={60}
                                                    height={60}
                                                    style={{ height: "auto" }}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src =
                                                            "/placeholder-picture-profile.jpg";
                                                    }}
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
                </div>
            )}
        </div>
    );
}
