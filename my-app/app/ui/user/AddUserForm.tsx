"use client";
import { useState } from "react";
import style from "../componentStyles/editUserForm.module.css";
import { User } from "@/app/lib/definitions";
import Button from "../genComponents/button";


export default function AddUserForm({ user }: { user: User }) {
    const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    description: user?.description || "",
    image_file: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image_file: file }));
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Action call here (ej. updateUser(formData))
  };

  return (
    <form  encType="multipart/form-data" className={style.formStyle}>
                        <div className={style.formgroup}>
                            <label  htmlFor="userFirstName">First Name:</label>
                            <input 
                                type="text" 
                                id="userFirstName" 
                                name="userFirstName"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required/>
                        </div>
                        <div className={style.formgroup}>
                            <label  htmlFor="userLasttName">Last Name:</label>
                            <input 
                                type="text" 
                                id="userLastName" 
                                name="userLastName"
                               value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required/>
                        </div>
                        <div className={style.formgroup}>
                            <label  htmlFor="email">Email:</label>
                            <input 
                                type="text" 
                                id="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required/>
                        </div>
                        <div className={style.formgroup}>
                        <label htmlFor="description">You Description: </label>
                        <textarea 
                            id="description"
                            name="description"
                            placeholder="Write something about yourself"
                            value={formData.description}
                            onChange={handleChange}
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
                                onChange={handleFileChange}
                            />
                        </div>
                        <input type="hidden" name="user_id" value={user.id} />
                        <div className={style.buttonGroup}>
                            <Button type="button" onClick={() => window.history.back()}>
                            Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                            </div>
                        {/* {actionState?.errorMessage && (
                            <p className={style.errorMessage}>{actionState.errorMessage}</p>)} */}
                    </form>
  );
}