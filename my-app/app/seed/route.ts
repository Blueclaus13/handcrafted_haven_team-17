// /* eslint-disable @typescript-eslint/no-unused-vars */
import postgres from 'postgres';
import { v4 as uuidv4 } from 'uuid';
import { products as placeholderProducts } from '../lib/placeholder_data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Alter products table to allow seller_id to be NULL
  await sql`
    ALTER TABLE IF EXISTS products
    ALTER COLUMN seller_id DROP NOT NULL;
  `;

  // Create products table if it doesn't exist (with seller_id optional)
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      seller_id INT
    );
  `;

  // Create reviews table
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      score FLOAT NOT NULL,
      summary TEXT NOT NULL
    );
  `;

  // Truncate tables to reseed fresh data
  await sql`TRUNCATE TABLE reviews CASCADE;`;
  await sql`TRUNCATE TABLE products CASCADE;`;

  // Insert products and reviews
  for (const product of placeholderProducts) {
    const productId = uuidv4(); // Generate a new UUID for each product

    // Insert product (omit seller_id)
    await sql`
      INSERT INTO products (id, name, price, description, image_url)
      VALUES (${productId}, ${product.name}, ${product.price}, ${product.description}, ${product.imageUrl});
    `;

    // Insert reviews for the product
    if (product.reviews && product.reviews.length > 0) {
      await Promise.all(
        product.reviews.map((review) =>
          sql`
            INSERT INTO reviews (product_id, score, summary)
            VALUES (${productId}, ${review.score}, ${review.summary});
          `
        )
      );
    }
  }
}

export async function GET() {
  try {
    await sql.begin(() => [seedProducts()]);
    return Response.json({ message: 'Products and reviews seeded successfully' });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
