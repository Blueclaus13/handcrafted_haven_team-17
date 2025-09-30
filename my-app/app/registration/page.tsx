import styles from "./RegistrationPage.module.css";

import styles from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Register</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <input type="date" id="birthday" name="birthday" required />

        <label htmlFor="email">
          Email
        </label>
        <input type="email" id="email" name="email" placeholder="someone@gmail.com" required />

        <label htmlFor="password">
          Password
        </label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Tell us about yourself..."
        />

        <div className={styles.checkbox}>
          <input type="checkbox" id="isSeller" name="isSeller" />
          <label htmlFor="isSeller">Register as Seller</label>
        </div>

        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  );
}

