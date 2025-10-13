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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = user.image_url;

      // 🖼️ If a new file is uploaded, convert to Base64 (for now; replace with cloud upload if needed)
      if (formData.image_file) {
        const reader = new FileReader();
        reader.readAsDataURL(formData.image_file);
        imageUrl = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      }

      const updatedData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        description: formData.description,
        image_url: imageUrl,
      };

      const response = await fetch(`/api/editUser/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ User updated successfully!");
      } else {
        setMessage(`❌ Failed to update user: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("❌ Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={style.formStyle}
    >
      <div className={style.formgroup}>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />
      </div>

      <div className={style.formgroup}>
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />
      </div>

      <div className={style.formgroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className={style.formgroup}>
        <label htmlFor="description">Your Description:</label>
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
          onChange={handleFileChange}
        />
      </div>

      <input type="hidden" name="user_id" value={user.id} />

      <div className={style.buttonGroup}>
        <Button type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className={style.statusMessage}>{message}</p>}
    </form>
  );
}
