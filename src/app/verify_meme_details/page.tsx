// "use client";
// import { useEffect, useState } from "react";

// export default function VerifyPage() {
//     const [data, setData] = useState<{ title: string; description: string; keywords: string }>({ title: "", description: "", keywords: "" });
//     useEffect(() => {
//         const item = sessionStorage.getItem("memeData");
//         if (item) setData(JSON.parse(item));
//     }, []);
//     return (
//         <div>
//             <form className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//                 Title
//                 <input  defaultValue={data.title} />
//                 <input defaultValue={data.description} />
//                 <input defaultValue={data.keywords} />
//             </form>
//         </div>
//     );
// }

"use client";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    // CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRouter } from "next/navigation";


export default function VerifyMemeDetails() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState("");
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [audio_type, setAudioType] = useState<string>("");

    const router = useRouter();

    // Load initial values from sessionStorage
    useEffect(() => {
        const saved = sessionStorage.getItem("memeData");
        if (saved) {
            const { title, description, keywords, videoUrl, response, audio_type } = JSON.parse(saved);
            setTitle(title);
            setDescription(description);
            setKeywords(keywords);
            setVideoUrl(videoUrl);
            setResponse(response);
            setAudioType(audio_type)
        }
        console.log("Loaded meme data from sessionStorage:", { title, description, keywords, videoUrl, response, audio_type });
    }, []);

    // const handleLogout = async () => {
    //     try {
    //         await signOut();
            
    //         router.push("/login");
    //     } catch (error) {
    //         console.error("Logout failed:", error);
    //     }
    // }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updated = { title, description, keywords, response, audio_type };
        console.log("Updated form values:", updated);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/resume`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    interrupt: {
                        resume: response
                    },
                    updated: {
                        audio_type,
                        title,
                        description,
                        keywords,
                        
                    }
                }),
            });

            const result = await res.json();
            console.log("Resume result:", result);


        } catch (err) {
            console.error("Error calling /resume:", err);
        }
        router.push("/meme_generated");
        // You can optionally trigger further actions here (e.g., enable submit button or send to backend)
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 gap-6">
            {/* Video Preview Card */}
            {videoUrl && (
                <Card className="w-full md:w-1/2 h-[97vh] shadow-lg">
                    {/* <CardHeader className="flex justify-center items-center">
                        <CardTitle className="text-center text-2xl">Preview</CardTitle>
                    </CardHeader> */}
                    <CardContent className="flex items-center justify-center p-0 h-[calc(97vh-3rem)]">
                        {/* card header is ~3rem tall, so we subtract that */}
                        <video
                            src={videoUrl}
                            controls
                            className="h-[95%] w-auto object-cover rounded-b-lg rounded-t-lg"
                        />
                    </CardContent>
                </Card>
            )}

            {/* Details Verification Card */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <Card className="w-full max-w-lg shadow-lg">
                    <CardHeader>
                        <CardTitle>Verify Meme Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            id="verify-form"
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="keywords">Keywords</Label>
                                <Input
                                    id="keywords"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}