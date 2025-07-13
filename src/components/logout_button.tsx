
import { signOut } from "@/app/auth.ts"
import { Button } from "./ui/button"

export default function SignOutButton() {
    return (
        <form action={async () => {
            "use server"
            await signOut({redirectTo:"/"});
        }}>
            <Button type="submit">Logout</Button>
        </form>
    );
}