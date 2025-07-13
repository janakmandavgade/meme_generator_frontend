import { auth } from "@/app/auth"; // or wherever your auth() comes from
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session?.tokens?.accessToken) {
        return NextResponse.json(
            { error: "No access token found" },
            { status: 401 }
        );
    }

    const tokens = {
        accessTkn: session.tokens.accessToken,
        rfrshTokn: session.tokens.refreshToken,
    };

    return NextResponse.json(tokens);
}
