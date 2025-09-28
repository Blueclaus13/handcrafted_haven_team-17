'use client';
 
import Button  from "../genComponents/button";
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
 
export default function LoginForm() {

 
  return (
    <form >
      <div >
        <h1 >
          Please log in
        </h1>
        <div>
          <div>
            <label
              htmlFor="email"
            >
              Email
            </label>
            <div >
              <input
              
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
        <Button type="submit">
          Log in
        </Button>
        <div>
        </div>
      </div>
    </form>
  );
}