'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Button from "../genComponents/button";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import style from "../componentStyles/loginForm.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassword(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Sign in using NextAuth credentials provider
    const result = await signIn("credentials", {
      redirect: false, // handle redirect manually
      email,
      password,
    });

    if (result?.error) {
      setMessage(result.error);
      setSuccess(false);
    } else if (result?.ok) {
      setMessage("Logged in successfully!");
      setSuccess(true);
      // Optionally redirect manually
      window.location.href = "/";
    }

    setLoading(false);
  };

  return (
    <div className={style.loginBlock}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <AiOutlineMail className="icon" />
          <label htmlFor="email">Email</label>
          <input
            className={style.input}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={style.inputGroup}>
          <AiFillLock className="icon" />
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            minLength={6}
          />
          <div>
            <input
              type="checkbox"
              id="showPassword"
              onChange={handleShowPassword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
        </div>

        <p className={style.registerText}>Don't have an account? </p>
        <Link href="/registration" className={style.registerLink}>
          Register
        </Link>

        {message && (
          <p
            className={style.error}
            style={{ color: success ? "green" : "red" }}
          >
            {message}
          </p>
        )}

        <Button type="submit" className={style.submitButton} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </div>
  );
}
