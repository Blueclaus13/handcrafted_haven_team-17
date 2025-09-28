export default function RegistrationPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Register</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}