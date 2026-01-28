'use client'
import { createContext, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import { getCartData } from "./CartAction/CartAction";
import { CartData } from "./types/cart.type";

export const CountContext = createContext<unknown>(null);

export default function CountProvider({ children }:{children:React.ReactNode}) {
    const [count, setCount] = useState(0);

    async function getCart() {
        const token = await getUserToken();
        if (token) {
            const data: CartData = await getCartData();
            const sum = data.data.products.reduce(
                (total, item) => total + item.count,
                0
            );
            setCount(sum);
        }
    }

    useEffect(() => {
        (async () => {
            await getCart();
        })();
    }, []);

    return (
        <CountContext.Provider value={{ count, setCount }}>
            {children}
        </CountContext.Provider>
    );
}
