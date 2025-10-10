
import { fetchUser } from "@/app/lib/data";
import style from "../../../ui/componentStyles/editUserForm.module.css";


import { User } from "@/app/lib/definitions";
import AddUserForm from "@/app/ui/user/AddUserForm";


export default async function Page({ params }: { params: { id: string } }){
  const { id } = await params;

  const user: User = await fetchUser(id);
     
  if (!user) {
        <h3>Sorry, this user not existed in Database</h3>
    }

  return(
   <div className={style.container}>
    <h2>Edit User</h2>
    <hr/>
    <AddUserForm user={user}/>
   </div>
  );
}