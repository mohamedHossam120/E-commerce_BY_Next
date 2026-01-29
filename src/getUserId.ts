'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserId() {
    const cookiesData = await cookies();
    
    // بنحاول نجيب الكوكي العادية (Local) أو المؤمنة (Production)
    const token = cookiesData.get("next-auth.session-token")?.value || 
                  cookiesData.get("__Secure-next-auth.session-token")?.value;

    if (!token) {
        console.log("No session token found");
        return null;
    }

    try {
        const data = await decode({ 
            token: token, 
            secret: process.env.NEXTAUTH_SECRET! 
        });

        if (!data) {
            console.log("Invalid token or unable to decode");
            return null;
        }

        // في RouteMisr الـ ID هو الـ sub
        return data.sub || null;
    } catch (error) {
        console.error("JWT Decode Error:", error);
        return null;
    }
}