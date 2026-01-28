'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserId() {
    const cookiesData = await cookies();
    const encryptToken = cookiesData.get("next-auth.session-token")?.value;

    if (!encryptToken) {
        console.log("No session token found");
        return null;
    }

    const data = await decode({ token: encryptToken, secret: process.env.NEXTAUTH_SECRET! });

    if (!data) {
        console.log("Invalid token or unable to decode");
        return null;
    }

    console.log("Decoded JWT:", data);

    return data.sub || null;
}
