

export type Seller = {
  id: string;           // UUID
  firstName: string;    // NOT NULL
  lastName: string;     // NOT NULL
  userName: string;     // NOT NULL
  email: string;        // NOT NULL
  description: string | null;
  imageUrl: string | null;
};