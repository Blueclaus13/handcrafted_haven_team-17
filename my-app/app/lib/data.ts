import postgres from 'postgres';
import{Seller }from "../lib/definitions";

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
