
import SellerProfilePage from "../ui/user/sellerProfile";
import { Product, User } from "@/app/lib/definitions";
import { fetchUser, fetchUserProducts } from "@/app/lib/data";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function Page() {

  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
  return <p>Please sign in to view your profile.</p>;
}

  const userData: User = await fetchUser(session?.user.id as string || "");
  const productsList: Product[] = await fetchUserProducts(session?.user.id as string || "");

  console.log("USER DATA:", userData);
  console.log("PRODUCTS LIST:", productsList);

  
  return (
    <div>
        <SellerProfilePage userData={userData} productsList={productsList}/>
    </div>
  );
}