// authUtils.ts
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from './firebaseConfig';
import { auth } from "@/app/auth"

import { ZodError } from "zod"
import { signInSchema } from "@/app/lib/zod"

export async function signUp(email, password) {
  try {
    await signInSchema.parseAsync({ email, password });

    const userCredential = await createUserWithEmailAndPassword(firebase_auth, email, password);
    console.log('User signed up successfully:', userCredential.user);
    return {
      status: 'success',
      user: userCredential.user,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.errors);
      return {
        status: 'error',
        message: 'Invalid input data',
      };
    }
    console.error('Signup error:', error);
    return {
      status: 'error',
      message: error.message,
    };
  }
}

export const checkUserCredentials = async (
  email: string,
  password: string
): Promise<boolean | null> => {
  try {
    await signInWithEmailAndPassword(firebase_auth, email, password);
    return true;
  } catch (error: any) {
    console.error("Auth Error:", error.code);
    return null;
  }
};

export async function checkIfUserIsSignedIn() {
  const session = await auth();
  console.log("Session user:", session);
  if (!session?.user) return false;
  return true;
}

export async function getUser() {
    const session = await auth();
    if (!session?.user) return null;
    return session.user;
}
