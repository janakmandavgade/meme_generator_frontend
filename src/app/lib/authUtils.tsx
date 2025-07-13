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
  if (!session?.user) {
    console.log("User is not signed in");
    return false;
  }
  console.log("User is signed in:", session.user);
  return true;
}

export async function getTokens() {
    const session = await auth();
    if (!session?.tokens?.accessToken) {
        console.log("No access token found");
        return null;
    }
    const refreshToken = session.tokens.refreshToken || null;
    const accessToken = session.tokens.accessToken || null;
    const tokens = {
        accessTkn: accessToken,  
        rfrshTokn: refreshToken,
    };
    return tokens;
}

export async function getUser() {
    // Get the current session
    // This will return the user object if the user is signed in, otherwise it will return
    // null or undefined

    console.log("Fetching user session in getUser");
    const session = await auth();
    if (!session?.user) {
      console.log("No user session found in getUser");
      return null;
    }
    console.log("User session found in getUser:", session.user);
    // Return the user object from the session
    return session.user;
}
