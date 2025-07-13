import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
// import { signOut } from "@/app/auth"
import SignOutButton from "@/components/logout_button"

export default function MemeGenerated() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Meme Generated Successfully!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Your meme has been generated and is ready for review.</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                    <Button asChild>
                        <Link href="/welcome">Generate Another Meme</Link>
                    </Button>
                    {/* <Button asChild onClick={async () => {
                        await signOut({ redirect: false });
                        location.reload(); // ensures state is reset
                    }}>
                        <Link href="/">Logout</Link>
                    </Button> */}
                    <SignOutButton />
                </CardFooter>
            </Card> 
        </div>
    )
}