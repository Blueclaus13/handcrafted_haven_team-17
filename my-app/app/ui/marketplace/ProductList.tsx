import Image from "next/image";
import getAllProducts from "@/app/lib/data";
import style from "../componentStyles/products.module.css";

export default async function ProductList() {
    const products = await getAllProducts();
    
        return (
            <div className={style.container}>
                {products.map((product, i)=> {
                    return (
                        <div 
                        key={product.id}
                        className={style.card}
                        >
                            <div className={style.productListImage}>
                                <Image 
                                    src={product.imageUrl}
                                    alt={`Picture of ${product.name}`}
                                    width={250}
                                    height={0}      // still required, but won’t matter with auto style
                                    style={{ height: "auto" }}
                                />
                            </div>
                            <div className={style.productListName}>
                                <p>{product.name}</p>
                            </div>
                            <div className={style.productListDescription}>
                                <p>{product.description}</p>
                            </div>
                            <div className={style.productListPrice}>
                                <p>
                                    {product.price}
                                </p>
                            </div>
                            <div className={style.productListScore}>
                                Review Score: {product.reviews[0].score} {/* This is a placeholder. I will write a function that calculates a random score and list it here*/}
                            </div>
                        </div>
                    );
                })}
            </div>
        )

}