
// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import { ZodError } from "zod"
// // import { authAdmin } from "@/app/lib/firebaseAdmin";
// import { signInSchema } from "@/app/lib/zod"
// // import { redirect } from "next/navigation";
// // import { firebase_app } from "@/app/lib/firebaseConfig";
// // import { onAuthStateChanged } from 'firebase/auth';
// import { firebase_auth } from '@/app/lib/firebaseConfig';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { redirect } from "next/navigation"
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// export const { handlers, signIn, signOut, auth } = NextAuth({
// providers: [Google,
//     Credentials({
//     // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//     // e.g. domain, username, password, 2FA token, etc.
//     credentials: {
//         email: {},
//         password: {},
//     },
//     authorize: async (credentials) => {
//         try {
//             if(!credentials || !credentials.email || !credentials.password) {
//                 console.log("Credentials in auth.tsx: line 28: ", credentials)
//                 return null
//               }
//             let user = null
//             // console.log("Credentials in auth.tsx: line 27: ", credentials)
//             // const { email, password } = await signInSchema.parseAsync(credentials)
//             // console.log("Credentials in auth.tsx: line 29: ", email, password)
//             // logic to salt and hash password
//             // const pwHash = saltAndHashPassword(credentials.password)
//             console.log("Credentials in auth.tsx: line 32: ", credentials)

//             // logic to verify if the user exists
//             user = await checkUserCredentials(credentials.email, credentials.password)

//             console.log("Credentials in auth.tsx: line 36: ")

//             console.log("User in auth.tsx:", user)

//             if (!user) {
//             // No user found, so this is their first attempt to login
//             // Optionally, this is also the place you could do a user registration
//             console.log("No Credentials in auth.tsx: line 62: ")
//             }
//             console.log("Credentials in auth.tsx: line 27: ")
//             // return user object with their profile data
//             return {
//               id: user.uid,
//               email: user.email,
//               name: user.displayName || user.email,
//             };
//         }
//         catch (error) {
//           console.log("No in auth.tsx: line 70: ")
//           if(error.code === 'auth/missing-email' || error.code === 'auth/invalid-credential') {
//             // Handle missing email error
//             console.log("Missing email:", error.message);
//           }

//           if (error instanceof ZodError) {
//             // Return `null` to indicate that the credentials are invalid
//             console.log("Error in zod in auth.tsx: line 73: ", error.errors)
//             return null
//           }
//           return null
//         }
//     },
//     }),
// ],
// session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.uid = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.uid as string;
//       session.user.email = token.email as string;
//       return session;
//     },
//   },
// })


// export const checkUserCredentials = async (
//   email: string,
//   password: string
// ) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password);
//     const user = userCredential.user;
//     return user
//   } catch (error) {
//     console.log("Inside the checkUserCredentials function in auth.ts: line 100: ")
//     if(error.code === 'auth/missing-email' || error.code === 'auth/invalid-credential') {
//       // Handle missing email error
//       console.log("Missing email:", error.message);
//       // throw new Error("InvalidCredentials");
//     }
//     // console.error("Auth Error:", error);
//     return null
//   }
// };

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { ZodError } from "zod"
import { firebase_auth } from '@/app/lib/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            console.log("Missing credentials");
            return null;
          }

          // Validate credentials with Zod (uncomment if needed)
          // const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await checkUserCredentials(
            credentials.email as string, 
            credentials.password as string
          );

          if (!user) {
            console.log("User authentication failed");
            return null;
          }

          // Return user object that matches NextAuth's expected format
          return {
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email,
          };
        } catch (error) {
          console.log("Authorization error:", error);
          
          if (error instanceof ZodError) {
            console.log("Validation error:", error.errors);
          }
          
          return null;
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
  pages: {
    signIn: '/login', // Custom sign-in page
  },
})

export const checkUserCredentials = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    console.log("Firebase auth error:", error.code, error.message);
    return null;
  }
};