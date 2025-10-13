
import SellerProfilePage from "../ui/user/sellerProfile";
import { Product, User } from "@/app/lib/definitions";
import { getUserID } from "../lib/utils";
import { fetchUser, fetchUserProducts } from "../lib/data";


export default async function Page() {
  const id = getUserID();
  if (!id) {
    return <p>Please sign in to view your profile.</p>;
  }
  // const id = "3a3ec7bc-5c17-43e9-adbc-0af12cc025ef"; //seller
  // const id = "75588e6f-aaf0-4942-bce6-d8fc885b6109" //no Seller

  const userData: User = await fetchUser(id);
  const productsList: Product[] = await fetchUserProducts(id);
  
  return (
    <div>
        <SellerProfilePage userData={userData} productsList={productsList}/>
    </div>
  );
}