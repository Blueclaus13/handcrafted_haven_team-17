"use client";

import Image from "next/image";
import style from "../componentStyles/editProductForm.module.css";
import { Product } from "@/app/lib/definitions";
import Button from "../genComponents/button";
import { useActionState, useState } from "react";
import { addProduct } from "@/app/lib/actions";

export default function AddProductFrom({product}: {product: Product}) {

     const initialActionState = {
          errorMessage: "",
          success: false,
      };
      const [actionState, formAction, isPending] = useActionState(
      addProduct, 
      initialActionState
      );
      console.log("Price:" + product.price);

      const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ? Number(product.price) : 0,
    imageFile: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  return(
    <form  encType="multipart/form-data" className={style.formStyle}>
                        <div className={style.formgroup}>
                        <label  htmlFor="productName">Product Name:</label>
                        <input 
                            type="text" 
                            id="productName" 
                            name="productName"
                            placeholder="Product Name" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className={style.formgroup}>
                        <label htmlFor="description">Product Description: </label>
                        <textarea 
                            placeholder="Product Description"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required  
                            />
                        </div>
                        <div className={style.formgroup}>
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={style.priceInput}
                                min={0}
                                step={0.01}
                                required
                            />
                        </div>
                        <div className={style.formgroup}>
                            <Image 
                                src={product?.image_url || "/placeholder.png"} 
                                alt={product?.name || "Product Image"} 
                                width={100} 
                                height={100} /> 

                            <label htmlFor="image_file">Change photo (.png)</label>
                            <input
                                type="file"
                                id="image_file"
                                name="image_file"
                                accept="image/png"
                                required
                                onChange={handleFileChange}
                            />
                        </div>
                        <input type="hidden" name="productId" value={product.id} />
                        <div className={style.buttonGroup}>
                            <Button type="button" disabled={isPending} onClick={() => window.history.back()} >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                            {isPending ? "Editing..." : "Edit Product"}
                            </Button>
                        </div>
                        {actionState?.errorMessage && (
                            <p className={style.errorMessage}>{actionState.errorMessage}</p>)}
                    </form>
  );
}