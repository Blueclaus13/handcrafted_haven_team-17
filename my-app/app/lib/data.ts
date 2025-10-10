import postgres from 'postgres';
import{Product, Seller, User }from "../lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function getAllProducts() {
    try {
      const products = await sql`
        SELECT 
          p.id, 
          p.name, 
          p.description, 
          p.price, 
          p.image_url,
          COALESCE(AVG(r.score), 0) as avg_score
        FROM products p
        LEFT JOIN reviews r ON r.product_id = p.id
        GROUP BY p.id
      `;
  
      return products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "No description available",
        price: p.price ?? "N/A",
        imageUrl: p.image_url,
        avgScore: Number(p.avg_score), // convert from string → number
      }));
    } catch (err) {
      console.error("Error fetching products:", err);
      return [];
    }
  }

export async function getProductById(productId: string) {
  try {
    // 1️⃣ Fetch the product
    const [product] = await sql`
      SELECT
        id,
        name,
        description,
        price,
        image_url
      FROM products
      WHERE id = ${productId}
    `;

    if (!product) return null;

    // 2️⃣ Fetch all reviews for this product
    const reviews = await sql`
      SELECT
        id,
        product_id,
        score,
        summary
      FROM reviews
      WHERE product_id = ${productId}
    `;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.image_url,
      reviews: reviews.map((r) => ({
        id: r.id,
        score: r.score,
        summary: r.summary,
      })),
    };
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return null;
  }
}

export async function getRandomProducts(limit: number = 3) {
    try {
      const products = await sql`
        SELECT id, name, description, price, image_url
        FROM products
        ORDER BY RANDOM()
        LIMIT ${limit}
      `;
  
      return products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "No description available",
        price: p.price ?? "N/A",
        imageUrl: p.image_url,
      }));
    } catch (err) {
      console.error("Error fetching random products:", err);
      return [];
    }
  }
  
export async function fetchSellers() {
    try{

        const sellers: Seller[] = await sql<Seller[]>`
          SELECT 
            id, 
            firstname, 
            lastname, 
            username, 
            email, 
            description, 
            image_url
          FROM users
          WHERE is_seller = true;`;
        return sellers;
    }catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all sellers.');
  }
}

  export async function fetchUser(userId: string) {
    try{

        const user: User[] = await sql<User[]>`
          SELECT 
            id, 
            firstname, 
            lastname, 
            username, 
            email, 
            description, 
            image_url,
            birthday,
            is_seller,
            created_at,
            updated_at
          FROM users
          WHERE id = ${userId};`;
        return user[0];
    }catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUserProducts(userId: string) {
  try{
      const products: Product[] = await sql<Product[]>`
      SELECT p.id, p.name, p.price, p.description, p.image_url
      FROM users u
      LEFT JOIN products p ON u.id = p.seller_id
      WHERE u.id = ${userId}::uuid;`;
 return products;
    }catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch user products list.');
  }

}

export async function getProductById(productId: string) {
    try {
      const product: Product[] = await sql<Product[]>`
        SELECT id, name, description, price, image_url, seller_id
        FROM products
        WHERE id = ${productId}::uuid;`;
      
      //console.log(product[0]);
  
      return product.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "No description available",
        price: p.price ?? "N/A",
        image_url: p.image_url,
        seller_id: p.seller_id
      }));
      
    } catch (err) {
      console.error("Error geting Product by Id:", err);
      return [];
    }
  }
