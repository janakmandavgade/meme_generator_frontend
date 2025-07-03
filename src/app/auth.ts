
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { ZodError } from "zod"
// import { authAdmin } from "@/app/lib/firebaseAdmin";
import { signInSchema } from "@/app/lib/zod"
// import { redirect } from "next/navigation";
// import { firebase_app } from "@/app/lib/firebaseConfig";
// import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from '@/app/lib/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const { handlers, signIn, signOut, auth } = NextAuth({
providers: [Google,
    Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
        email: {},
        password: {},
    },
    authorize: async (credentials) => {
        try {
            let user = null
            console.log("Credentials in auth.tsx: line 27: ", credentials)
            const { email, password } = await signInSchema.parseAsync(credentials)
            console.log("Credentials in auth.tsx: line 29: ", email, password)
            // logic to salt and hash password
            // const pwHash = saltAndHashPassword(credentials.password)

            // logic to verify if the user exists
            user = await checkUserCredentials(email, password)

            console.log("Credentials in auth.tsx: line 36: ")

            console.log("User in auth.tsx:", user)
            // let userRecord;
            //   try {
            //     userRecord = await authAdmin.getUserByEmail(email);
            //     if (userRecord) {
            //         redirect('/welcome')
            //     }else {
            //         // User not found, handle accordingly
            //         console.error("User not found");
            //         throw new Error("User not found");
            //     }
            //   } catch (err) {
            //     // User not found
            //     console.error("User not found:", err);
            //     redirect('/login')
            //     // return {
            //     //     "status": "error",
            //     //     "message": "User not found",
            //     // };
            //   }

            if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            console.log("No Credentials in auth.tsx: line 62: ")
            throw new Error("Invalid credentials.")
            }
            console.log("Credentials in auth.tsx: line 27: ")
            // return user object with their profile data
            return user;
        }
        catch (error) {
            console.log("No in auth.tsx: line 70: ")
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
          return null
        }
    },
    }),
],
session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.uid as string;
      session.user.email = token.email as string;
      return session;
    },
  },
})


export const checkUserCredentials = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password);
    const user = userCredential.user;
    return user
  } catch (error) {
    console.error("Auth Error:", error);
    return null
  }
};

