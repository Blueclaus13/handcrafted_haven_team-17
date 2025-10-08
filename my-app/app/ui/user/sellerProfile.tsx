"use client";
import {  useState, useActionState } from "react";


import Image from "next/image"; 
import Button from "../genComponents/button";
import style from "../componentStyles/profile.module.css";
import {addProduct }from "../../lib/actions";
import { Product, User } from "@/app/lib/definitions";
import Modal from "../genComponents/modal";
const defaultImage = "placeholder-picture-profile.jpg";

export default function SellerProfilePage({
  userData,
  productsList,
}: {
  userData: User;
  productsList: Product[];
})
     {
    const [products, setProducts] = useState<Product[]>(productsList);
    console.log(products)

    const initialActionState = {
        errorMessage: "",
        success: false,
    };
    const [actionState, formAction, isPending] = useActionState(
    addProduct, 
    initialActionState
    );
    const [showModal, setShowModal] = useState<boolean>(false);

    function toggleModal() {
     setShowModal(!showModal);
    }

  if (!userData) return <p>Loading...</p>;

    return (
        <div className={style.profileContainer}>
            <section className={style.profileSection}>
                <h2>Profile Information</h2>
                <div className={style.profileInfo}>
                    <div className={style.field}>
                        <p><span className={style.label}>Name: </span> {userData.firstname} {userData.lastname}</p>
                        <p><span className={style.label}>Email: </span>{userData.email}</p>
                        <p><span className={style.label}>Birthday: </span> {userData.birthday.toLocaleDateString()}</p>
                        <p ><span className={style.label}>Member since: </span> {userData.created_at.toLocaleDateString()}</p>
                        </div>
                    <Image 
                    src={`/users/${userData.image_url|| defaultImage}`}
                    alt={`${userData.firstname} ${userData.lastname} Picture`}
                    width={50}
                    height={50}
                    className={style.profilePicture}
                    />
                    <Button 
                     type="button" className={style.profileButton}>
                        Edit Profile
                    </Button>  
                </div>
            </section>

            {/* Manage Products */}
           {userData.is_seller && 
           (<div className={style.sellerSections}>
                <Button 
                className={style.btnAddNewProduct}
                type="button"
                onClick={toggleModal}
                    >Add new Product</Button>
                <Modal  
                    open={showModal} 
                    onClose={toggleModal}
                    title="Add New Product">
                    <section className={style.addProductSection}>
                    <form action={formAction} encType="multipart/form-data" className={style.formStyle}>
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
                <section className="tablecontainer">
                    <table className={style.productTable}>
                        <thead>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Edit</th>
                        </thead>
                        <tbody>
                {products?.map((product)=>(
                            <tr  key={product.id}>
                                <td>
                                    <div className={style.productListImage}>
                                        <Image 
                                            src={product.image_url}
                                            alt={`Picture of ${product.name}`}
                                            width={50}
                                            height={50}    
                                            style={{ height: "auto" }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p>{product.name}</p>
                                    </div>
                                </td>
                                <td>
                                    <div >
                                       <p>{product.description}</p>
                                    </div>
                                </td>
                                <td>
                                    <div >
                                        <p> {product.price}</p>
                                    </div>
                                </td>
                                <td>
                                    <Button
                                        type="button"
                                        id={product.id}
                                    >Edit</Button> 
                                </td>
                            </tr>
                        ))}
                 </tbody>
            </table>
            </section>
           </div>)}   
        </div>
    );
}
