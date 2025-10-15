
import { getOnlyProductById} from "@/app/lib/data";
import style from "../../../ui/componentStyles/editProductForm.module.css";
import { Product } from "@/app/lib/definitions";
import EditProductForm from "@/app/ui/marketplace/EditProductForm";


export default async function Page({ params }: { params: { id: string } }){
  const { id } = await params;

  const product: Product[] = await getOnlyProductById(id);
     
  if (!product) {
        <h3>Sorry, this product not existed in Database</h3>
    }

  return(
   <div className={style.container}>
    <h2>Edit Product</h2>
    <hr/>
    <EditProductForm product={product[0]}/>
   </div>
  );
}