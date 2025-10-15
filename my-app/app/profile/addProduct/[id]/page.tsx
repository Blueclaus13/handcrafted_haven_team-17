

import style from "../../../ui/componentStyles/editProductForm.module.css";
import AddProductForm from "@/app/ui/marketplace/AddProductForm";


export default async function Page({ params }: { params: { id: string } }){
  const { id } = await params;

  

  return(
   <div className={style.container}>
    <h2>Add Product</h2>
    <hr/>
    <AddProductForm userId={id}/>
   </div>
  );
}
