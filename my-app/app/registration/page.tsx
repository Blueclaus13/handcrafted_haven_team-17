"use client";
import { useState } from "react";
import styles from "../ui/componentStyles/RegistrationPage.module.css";
import Button from "../ui/genComponents/button";
import { redirect } from 'next/navigation';

export default function RegisterForm() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      userName: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
      birthday: new Date(formData.get("birthday") as string), // convert to Date
      description: formData.get("description"),
      isSeller: formData.get("isSeller") === "on",
    };

    const res = await fetch("/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" }, // ✅ add this
  body: JSON.stringify(body),
});


    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
    } else {
      
      redirect('/login');
    }
  }

   return (
    <main className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <hr/>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.field}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="userName">Username</label>
          <input type="text" id="userName" name="userName" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="birthday">Birthday</label>
          <input type="date" id="birthday" name="birthday" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" />
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" id="isSeller" name="isSeller"/>
          <label htmlFor="isSeller">Register as Seller</label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button className={styles.button} type="submit">Register</Button>
      </form>
    </main>
  );
}



