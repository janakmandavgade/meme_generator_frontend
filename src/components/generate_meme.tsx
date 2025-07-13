// GenerateButton.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
// import { getTokens } from "@/app/lib/authUtils";

type InterruptValue = {
    audio_type: string;
    title: string;
    description: string;
    keywords: string;
};
type StartResponse =
    | { interrupt: { value: InterruptValue; resume: string } }
    | { result: any };

export function GenerateButton() {
    const [loading, setLoading] = useState(false);
    const [access, setAccess] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<string | null>(null);
    const router = useRouter()

    async function base64ToBlobUrl(b64: string, type = "video/mp4"): Promise<string> {
        const blob = await fetch(`data:${type};base64,${b64}`).then(r => r.blob());
        return URL.createObjectURL(blob);
    }

    async function setting_access_tokens(): Promise<any> {

        const tokensResp = await fetch("/api/tokens");
        if (!tokensResp) {
            console.log("Tokens not available");
            return;
        }
        const { accessTkn, rfrshTokn } = await tokensResp.json();
        setAccess(accessTkn);
        setRefresh(rfrshTokn);
        console.log("Access Token:", accessTkn);
        console.log("Refresh Token:", rfrshTokn);
        return;
        // return tokens;
    }

    const handleClick = async () => {
        setLoading(true);

        const tokensResp = await fetch("/api/tokens");
        if (!tokensResp) {
            console.log("Tokens not available");
            return;
        }
        const { accessTkn, rfrshTokn } = await tokensResp.json();

        try {
            await setting_access_tokens()

            console.log("Inside handleclick Access Token:", accessTkn);
            console.log("Inside handleclick Refresh Token:", rfrshTokn);

            const resp = await axios.post<StartResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/start`, {
                access_token: accessTkn,
                refresh_token: rfrshTokn,
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );
            console.log("Pipeline response:", resp.data);

            console.log("Interrupt value:", resp.data.state);

            const title = resp.data.state.data.title;
            const description = resp.data.state.data.description;
            const keywords = resp.data.state.data.keywords;
            const video_bytes = resp.data.state.data.video_bytes;
            const response = resp.data.interrupt[0].ns[0];
            const videoUrl = await base64ToBlobUrl(video_bytes, "video/mp4");
            const audio_type = resp.data.state.data.audio_type
            // console.log("Audio Type:", audio_type);
            console.log("Title:", title);
            console.log("Description:", description);
            console.log("Keywords:", keywords);
            console.log("Video Url:", videoUrl);
            console.log("Response:", response);
            sessionStorage.setItem("memeData", JSON.stringify({ title, description, keywords, videoUrl, response, audio_type }));
            router.push('/verify_meme_details');
        } catch (err) {
            console.error("Error calling pipeline:", err);
        }
        setLoading(false);
    };

    // const handleClick = async () => {
    //     setLoading(true);

    //     const tokensResp = await fetch("/api/tokens");
    //     const { accessTkn, rfrshTokn } = await tokensResp.json();

    //     console.log("Fetched tokens:", accessTkn, rfrshTokn);

    //     try {
    //         const resp = await axios.post<StartResponse>(
    //             "http://127.0.0.1:8001/start",
    //             {
    //                 access_token: accessTkn,
    //                 refresh_token: rfrshTokn,
    //             },
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             }
    //         );
    //         // handle resp.data...
    //     } catch (err) {
    //         console.error("Error calling pipeline:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <Button variant="outline" onClick={handleClick} disabled={loading}>
            {loading ? "Generating…" : "Generate A Meme"}
        </Button>
    );
}
