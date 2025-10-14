'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import postgres from 'postgres';
import path from "path";
import fs from "fs";
import { revalidatePath } from 'next/cache';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


const productFormSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  description: z.string(),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  image_file: z.file({
    message: 'Please add a picture'
  }),
  seller_id: z.string()
});

// For updates we want `image_file` to be optional so the caller can update
// other fields without uploading a new image.
const UpdateProduct = productFormSchema.partial({ image_file: true }).omit({ seller_id: true });
const CreateProduct = productFormSchema.omit({ productId: true});


export async function addProduct(
  prevState:  { errorMessage?: string; success?: boolean },
  formData: FormData) {

    const validatedFields = CreateProduct.safeParse({
      productName: formData.get('productName'),
      description: formData.get('description'),
      image_file: formData.get('image_file'),
      price: formData.get('price'),
      seller_id: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

   // Prepare data for insertion into the database
  const { productName, description, image_file, price, seller_id } = productFormSchema.parse({
      productName: formData.get('productName'),
      description: formData.get('description'),
      image_file: formData.get('image_file'),
      price: formData.get('price'),
      seller_id: formData.get('userId'),
  });
  
  let image_url = null
  if (image_file && image_file.size > 0) {
    const arrayBuffer = await image_file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadPath = path.join(process.cwd(), "public", "images", "products", image_file.name);
    fs.writeFileSync(uploadPath, buffer);
    image_url = `/images/products/${image_file.name}`;
  }

  try{
    await sql`
      INSERT INTO products (name, price, description, image_url, seller_id)
      VALUES (${productName}, ${price}, ${description}, ${image_url}, ${seller_id})
    `;
    console.log("success inserting Product")
    return { message: "Product added successfully!" };
  }catch (error) {
    // We'll log the error to the console for now
    console.error(error);
     return { errorMessage: 'Database Error: Failed to add product.', success: false  };
  }
}
  

export type State = {
    errors?: {
        productId?: string[];
        price?: string[];
        productName?: string[];
        description?: string[];
        image_file?: string[];
    };
    message?: string | null;
};

export async function updateProduct(
  prevState: State | undefined,
  formData: FormData
) {
  
    const validatedFields = UpdateProduct.safeParse({
      productId: formData.get('productId'),
      productName: formData.get('productName'),
      description: formData.get('description'),
      image_file: formData.get('image_file'),
      price: formData.get('price')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Product.',
    } as State;
  }

  const { productId, productName, description, image_file, price} = UpdateProduct.parse({
   productId: formData.get('productId'),
   productName: formData.get('productName'),
   description: formData.get('description'),
   image_file: formData.get('image_file'),
   price: formData.get('price')
   });
  //  console.log("Current URL: ", current_url);
  //  console.log("Image File Name: ", image_file?.name);
  //  console.log("Product name: ", productName);
  //  console.log("Product ID: ", productId);  
  //  console.log("Description: ", description);
  // console.log("Price: ", price);
    
  // Only upload and set a new image URL when the client provided a file.
  const newImageUrl = (image_file && (image_file as File).size > 0)
    ? `/images/products/${(image_file as File).name}`
    : null;

  if (newImageUrl) {
    // persist file to disk
    const arrayBuffer = await (image_file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadPath = path.join(process.cwd(), "public", "images", "products", (image_file as File).name);
    fs.writeFileSync(uploadPath, buffer);
  }

  try {
    await sql`
      UPDATE products
      SET name = ${productName},
          description = ${description},
          price = ${price},
          image_url = COALESCE(${newImageUrl}, image_url)
      WHERE id = ${productId}::uuid
    `;

  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Product.' } as State;

  }
    revalidatePath('/profile');
    redirect('/profile');
}
