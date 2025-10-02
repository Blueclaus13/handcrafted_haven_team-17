'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
// import { revalidatePath } from 'next/cache';
// import AuthError from 'next-auth';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginAction(
    prevState: { success: boolean; message: string },
    formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = "/profile";
    //console.log("Login action called with:", { email, password});

  // Here you would typically validate the user's credentials with your database
    const result = loginSchema.safeParse({ email, password });
  
    if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

   // Simulation
  if (email === "test@example.com" && password === "123456") {
    redirect(redirectTo); // ✅ Login exitoso
  }

  return {
    success: false,
    message: "Invalid email or password",
  };
}   


// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//    // await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }