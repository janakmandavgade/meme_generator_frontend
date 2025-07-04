// app/lib/signupAction.ts
"use server";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase_auth } from "@/app/lib/firebaseConfig"; // your firebase.ts

import { redirect } from "next/navigation";

export async function signupAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        await createUserWithEmailAndPassword(firebase_auth, email, password);
        redirect("/login"); // or wherever you want to send them
    } catch (error: any) {
        if(error.code === 'auth/email-already-in-use') {
            await redirect("/login?error=email-already-in-use");
        }
        console.error("Signup failed:", error.message);
        throw new Error("Signup failed: " + error.message);
    }
}
