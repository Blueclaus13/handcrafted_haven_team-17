import styles from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form}>
        
        <label htmlFor="firstname">
          First Name
        </label>
        <input type="text" id="firstname" name="firstname" required />

        <label htmlFor="lastName">
          Last Name
        </label>
        <input type="text" id="lastName" name="lastName" required />

        <label htmlFor="userName">
          Username
        </label>
        <input type="text" id="userName" name="userName" required />

        <label htmlFor="birthday">
          Birthday
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
    </main>
  );
}

