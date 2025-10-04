import { getRandomProducts } from "@/app/lib/data";
import Image from "next/image";
import style from "../componentStyles/preview.module.css";

export default async function RandomProducts() {
    const randomProducts = await getRandomProducts();

    return (
        <div className={style.container}>
            <h2>
                Product Preview
            </h2>
            <div className={style.grid}>
            {randomProducts.map((product)=> {
                return (
                    <div 
                    key={product.id}
                    className={style.card}
                    >
                        <div className={style.productPreviewImage}>
                            <Image 
                                src={product.imageUrl}
                                alt={`Picture of ${product.name}`}
                                width={100}
                                height={0}      // still required, but won’t matter with auto style
                                style={{ height: "auto" }}
                            />
                        </div>
                        <div className={style.productPreviewName}>
                            <p>{product.name}</p>
                        </div>
                        <div className={style.productPreviewPrice}>
                            <p>
                                {product.price}
                            </p>
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    )
}