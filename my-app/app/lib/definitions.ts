export type Seller = {
  id: string;       
  firstname: string;    
  lastname: string;     
  username: string;   
  email: string;        
  description: string | null;
  image_url: string | null;
};

export type User = {
  id: string;       
  firstname: string;    
  lastname: string;     
  username: string;   
  email: string;
  birthday: Date;        
  description: string | null;
  is_seller: boolean;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  seller_id: string;
};