"use client";

import style from "../componentStyles/editProductForm.module.css";
import Button from "../genComponents/button";
import { useState } from "react";
import { addProduct, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function AddProductFrom({userId}: {userId: string}) {
  //console.log(`User ID in AddProductForm: ${userId}`);

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price:  0,
    imageFile: null as File | null,
    seller_id: userId
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
  const initialState: State = { message: null, errors: {} };

  const [actionState, formAction, isPending] = useActionState(
    addProduct,
    initialState
  );
  

  return(
    <form  action={formAction} className={style.formStyle}>
                        <div className={style.formgroup}>
                        <label  htmlFor="productName">Product Name:</label>
                        <input 
                          type="text" 
                          id="productName" 
                          name="productName"
                          placeholder="Product Name" 
                          value={formData.productName}
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

                            <label htmlFor="image_file">Change photo (.jpg)</label>
                            <input
                                type="file"
                                id="image_file"
                                name="image_file"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleFileChange}
                            />
                        </div>
                        <input type="hidden" name="seller_id" value={userId} />
                        <div className={style.buttonGroup}>
                          <Button type="button" disabled={isPending} onClick={() => window.history.back()} >
                                  Cancel
                             </Button>

                            <Button type="submit" disabled={isPending}>
                            {isPending ? "Adding..." : "Add Product"}
                            </Button>
                        </div>
            {actionState?.message && (
              <p className={style.errorMessage}>{actionState.message}</p>)}
                    </form>
  );
}