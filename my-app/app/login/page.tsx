import LoginForm from "../ui/login/login-form";
import { Suspense } from 'react';

 
export default function LoginPage() {
  return (

      <div>
        <h1>Login Page</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
  );
}