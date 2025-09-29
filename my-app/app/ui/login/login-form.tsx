'use client';
 
import Button  from "../genComponents/button";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import style  from "../componentStyles/loginForm.module.css";
import { useState, useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import {loginAction} from '../../lib/actions';
import Link from "next/link";
 
export default function LoginForm() {
const [showPassword, setShowPassword] = useState(false);
const [state, formActionWithState] = useActionState(
    loginAction, 
    {   success: false,
        message: ""
    });
 
  return (
    <div className={style.loginBlock}>
        <form action={formActionWithState}>
            <div>
                <div>
                    <div className={style.inputGroup}>
                        <AiOutlineMail className="icon" />
                        <label
                        htmlFor="email"
                        >
                        Email
                        </label>
                        <div className={style.inputContainer}>
                        <input
                            className={style.input}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                        
                        </div>
                    </div>
                    <div className={style.inputGroup}>
                        <AiFillLock className="icon" />
                        <label
                        
                        htmlFor="password"
                        >
                        Password
                        </label>
                        <div className={style.inputContainer}>
                        <input
                            className={style.input}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            required
                            minLength={6}
                        />
                        </div>
                        <input 
                            type="checkbox" 
                            id="checkBoxPassword"
                            onChange={(e) => setShowPassword(e.target.checked)}  /> 
                        <p className={style.registerText}>Show Password</p>
                    </div>
                    <p className={style.registerText}>Don't have an account? </p> 
                    <Link href="/registration" className={style.registerLink}>Registration</Link>
                </div>
                <input type="hidden" name="redirectTo" />
                <Button type="submit" className={style.submitButton}>
                    Log in
                </Button>
            </div>
            {state?.message && (
                <p className={style.error} style={{ color: state.success ? "green" : "red" }}>
                {state.message}</p>
            )}

        </form>

    </div>
    
  );
}