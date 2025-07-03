// authUtils.ts
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from './firebaseConfig';

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
