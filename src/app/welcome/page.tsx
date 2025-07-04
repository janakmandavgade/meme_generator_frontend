import { checkIfUserIsSignedIn } from "@/app/lib/authUtils";

export default function WelcomePage() {

    if (!checkIfUserIsSignedIn()) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg mb-6">You must be logged in to view this page.</p>
        </div>
    );
    else{
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Meme Generator!</h1>
        <p className="text-lg mb-6">Create and share your favorite memes with ease.</p>
        </div>
    );
    }
}