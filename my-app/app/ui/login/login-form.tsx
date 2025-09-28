'use client';
 
import Button  from "../genComponents/button";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import style  from "../componentStyles/loginForm.module.css";
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
 
export default function LoginForm() {

 
  return (
    <div className={style.loginBlock}>
        <form >
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
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            minLength={6}
                        />
                        
                        </div>
                    </div>
                </div>
                <input type="hidden" name="redirectTo" />
                <Button type="submit" className={style.submitButton}>
                    Log in
                </Button>
            </div>

        </form>

    </div>
    
  );
}