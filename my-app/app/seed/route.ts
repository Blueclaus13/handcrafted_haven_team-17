import postgres from 'postgres';
import { products } from '../lib/placeholder_data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Create products table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      seller_id INT NOT NULL
    );
  `;

  // Create reviews table (with foreign key to products)
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      score FLOAT NOT NULL,
      summary TEXT NOT NULL
    );
  `;

  // Insert products + reviews
  for (const product of products) {
    // Insert product
    const [insertedProduct] = await sql`
      INSERT INTO products (id, name, price, description, image_url, seller_id)
      VALUES (${product.id}, ${product.name}, ${product.price}, ${product.description}, ${product.imageUrl}, ${product.sellerId})
      ON CONFLICT (id) DO NOTHING
      RETURNING id;
    `;

    // Insert reviews for the product
    if (product.reviews && product.reviews.length > 0) {
      await Promise.all(
        product.reviews.map((review) =>
          sql`
            INSERT INTO reviews (product_id, score, summary)
            VALUES (${insertedProduct?.id || product.id}, ${review.score}, ${review.summary})
            ON CONFLICT (id) DO NOTHING;
          `
        )
      );
    }
  }
}

export async function GET() {
  try {
    await sql.begin((sql) => [
      seedProducts(),
    ]);

    return Response.json({ message: 'Products and reviews seeded successfully' });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}