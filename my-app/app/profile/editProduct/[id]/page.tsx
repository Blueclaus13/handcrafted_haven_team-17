import { addProduct } from "@/app/lib/actions";
import { getProductById } from "@/app/lib/data";
import style from "../../../ui/componentStyles/editProductForm.module.css";
import { useActionState } from "react";
import Button from "@/app/ui/genComponents/button";
import { Product } from "@/app/lib/definitions";
import AddProductFrom from "@/app/ui/marketplace/AddProductFrom";


export default async function Page({ params }: { params: { id: string } }){
  const { id } = await params;

  const product: Product[] = await getProductById(id);
     
  if (!product) {
        <h3>Sorry, this product not existed in Database</h3>
    }

  return(
   <div className={style.container}>
    <h2>Edit Product</h2>
    <hr/>
    <AddProductFrom product={product[0]}/>
   </div>
  );
}