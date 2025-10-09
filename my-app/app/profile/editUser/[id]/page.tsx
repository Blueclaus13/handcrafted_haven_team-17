
import { fetchUser } from "@/app/lib/data";
import style from "../../../ui/componentStyles/editUserForm.module.css";
import { useActionState, useState } from "react";
import Button from "@/app/ui/genComponents/button";
import { Product, User } from "@/app/lib/definitions";


export default async function Page({ params }: { params: { id: string } }){
  const { id } = await params;

  const user: User = await fetchUser(id);
     
  if (!user) {
        <h3>Sorry, this user not existed in Database</h3>
    }

  // const initialActionState = {
  //         errorMessage: "",
  //         success: false,
  //     };
  //     const [actionState, formAction, isPending] = useActionState(
  //     addProduct, 
  //     initialActionState
  //     );
    //const [description, setDescription] = useState(user?.description || "");

  return(
   <div className={style.container}>
    <h2>Edit User</h2>
    <hr/>
    <form  encType="multipart/form-data" className={style.formStyle}>
                        <div className={style.formgroup}>
                            <label  htmlFor="userFirstName">First Name:</label>
                            <input 
                                type="text" 
                                id="userFirstName" 
                                name="userFirstName"
                                value={user.firstname}
                                required/>
                        </div>
                        <div className={style.formgroup}>
                            <label  htmlFor="userLasttName">Last Name:</label>
                            <input 
                                type="text" 
                                id="userLastName" 
                                name="userLastName"
                                value={user.lastname}
                                required/>
                        </div>
                        <div className={style.formgroup}>
                            <label  htmlFor="email">Email:</label>
                            <input 
                                type="text" 
                                id="email" 
                                name="email"
                                value={user.email}
                                required/>
                        </div>
                        <div className={style.formgroup}>
                        <label htmlFor="description">You Description: </label>
                        <textarea 
                            placeholder="Produc Description"
                            id="description"
                            name="description"
                            // value={description}
                            // onChange={(e) => setDescription(e.target.value)} 
                             />
                        </div>
                        <div className={style.formgroup}>
                            <label htmlFor="image_file">Upload your photo (.png)</label>
                            <input
                                type="file"
                                id="image_file"
                                name="image_file"
                                accept="image/png"
                                required
                                //onChange={handleFileChange}
                            />
                        </div>
                        <input type="hidden" name="user_id" value={id} />
                        {/* <Button type="submit" disabled={isPending}>
                            {isPending ? "Editing..." : "Edit Product"}
                        </Button>
                        <Button type="button" disabled={isPending}>
                            Cancel
                        </Button>
                        {actionState?.errorMessage && (
                            <p className={style.errorMessage}>{actionState.errorMessage}</p>)} */}
                    </form>
   </div>
  );
}