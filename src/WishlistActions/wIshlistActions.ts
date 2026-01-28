'use server'
import { getUserToken } from "src/getUserToken";

export async function getLoggedUserWishlist() {
    const token = await getUserToken();

    if (!token) {
        throw new Error("User not authenticated");
    }

    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            method: "GET",
            headers: {
                "token": token
            },
            cache: "no-store" 
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch wishlist");
    }

    return res.json();
}

export async function Createwish(productId: string) {
    const token = await getUserToken();

    if (!token) {
        return { error: "AUTH_ERROR", message: "User not authenticated" };
    }

    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "token": token
            },
            body: JSON.stringify({
                "productId": productId 
            }),
            cache: "no-store" 
        }
    );

    if (!res.ok) {
        throw new Error("Failed to add to wishlist");
    }

    return res.json();
}

export async function RemoveWish(productId: string) {
    const token = await getUserToken();

    if (!token) {
        throw new Error("User not authenticated");
    }

    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
            method: "DELETE",
            headers: {
                "token": token
            }
        }
    );

    if (!res.ok) {
        throw new Error("Failed to remove from wishlist");
    }

    return res.json();
}