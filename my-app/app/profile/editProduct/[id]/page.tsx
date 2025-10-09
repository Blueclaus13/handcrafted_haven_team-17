import { addProduct } from "@/app/lib/actions";
import { getProductById } from "@/app/lib/data";
import style from "../../../ui/componentStyles/editProductForm.module.css";
import { useActionState } from "react";
import Button from "@/app/ui/genComponents/button";
import { Product } from "@/app/lib/definitions";


export default async function Page({ params }: { params: { id: string } }){
  const { id } = await params;

  const product: Product[] = await getProductById(id);
     

  if (!product) {
        <h3>Sorry, this product not existed in Database</h3>
    }

  // const initialActionState = {
  //         errorMessage: "",
  //         success: false,
  //     };
  //     const [actionState, formAction, isPending] = useActionState(
  //     addProduct, 
  //     initialActionState
  //     );

  return(
   <div className={style.container}>
    <h2>Edit Product</h2>
    <hr/>
    <form  encType="multipart/form-data" className={style.formStyle}>
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
                        <input type="hidden" name="productId" value={id} />
                        {/* <Button type="submit" disabled={isPending}>
                            {isPending ? "Editing..." : "Edit Product"}
                        </Button>
                        <Button type="button" disabled={isPending}>
                            Cancel
                        </Button>
                        {actionState?.errorMessage && (
                            <p className={style.errorMessage}>{actionState.errorMessage}</p>)} */}
                    </form>
   </div>
  );
}