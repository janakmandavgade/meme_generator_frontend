// "use client";
import { checkIfUserIsSignedIn } from "@/app/lib/authUtils";
import { GenerateButton } from "@/components/generate_meme";
// import { auth } from "@/app/auth"

export default function WelcomePage() {
    
    if (!checkIfUserIsSignedIn()) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg mb-6">You must be logged in to view this page.</p>
        </div>
    );
    else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Meme Generator!</h1>
                <p className="text-lg mb-6">Create and share your favorite memes with ease.</p>
                <GenerateButton />
            </div>
        );
    }
}

// src/app/page.tsx (or your own path)
// 'use client'

// import React from 'react';
// import axios from 'axios';
// import { checkIfUserIsSignedIn } from "@/app/lib/authUtils";
// import { Button } from "@/components/ui/button";

// export default function WelcomePage() {
//     const handleGenerateMeme = async () => {
//         console.log("Generate Meme button clicked");
//         try {
//             const resp = await axios.post('http://127.0.0.1:8001/start', {});
//             console.log("Pipeline start response:", resp.data);
//             // You can handle resp.data.interrupt or resp.data.result here
//         } catch (err) {
//             console.error("Error starting pipeline:", err);
//         }
//     };

//     if (!checkIfUserIsSignedIn()) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//                 <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
//                 <p className="text-lg mb-6">You must be logged in to view this page.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <h1 className="text-4xl font-bold mb-4">Welcome to the Meme Generator!</h1>
//             <p className="text-lg mb-6">Create and share your favorite memes with ease.</p>
//             {/* <Button variant="outline" onClick={handleGenerateMeme}>
//                 Generate A Meme
//             </Button> */}
//         </div>
//     );
// }
