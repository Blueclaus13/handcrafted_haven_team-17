'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import postgres from 'postgres';
import path from "path";
import fs from "fs";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const productFormSchema = z.object({
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

export async function addProduct(
  prevState:  { errorMessage?: string; success?: boolean },
  formData: FormData) {

    const validatedFields = productFormSchema.safeParse({
      name: formData.get('productName'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
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
      name: formData.get('productName'),
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
  
export async function loginAction(
    prevState: { success: boolean; message: string },
    formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = "/profile";
    //console.log("Login action called with:", { email, password});

  // Here you would typically validate the user's credentials with your database
    const result = loginSchema.safeParse({ email, password });
  
    if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

   // Simulation
  if (email === "test@example.com" && password === "123456") {
    redirect(redirectTo); // ✅ Login exitoso
  }

  return {
    success: false,
    message: "Invalid email or password",
  };
}   
