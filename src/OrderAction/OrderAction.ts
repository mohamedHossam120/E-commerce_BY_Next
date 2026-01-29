'use server'
import { getUserToken } from "src/getUserToken"

export async function checkoutPaymenet(cartId: string, shippingData: { details: string, phone: string, city: string }) {
    const token = await getUserToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${NEXTAUTH_API}`, {
            method: "post",
            body: JSON.stringify({
                "shippingAddress": shippingData
            }),
            headers: {
                'content-type': "application/json",
                 token: token
            }
        })
        const data=await res.json()
        return data
    }

}
import { getUserId } from "src/getUserId";
import { NEXTAUTH_API } from "src/config/urls"

export default async function getUserOrders() {
    const userId = await getUserId();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        {
            cache: "no-store"
        }
    );

    return res.json();
}




// 'use server';

// import { getUserToken } from "src/getUserToken";

// export default async function getUserOrders() {
//   const token = await getUserToken();

//   if (!token) {
//     throw new Error("User not authenticated");
//   }

//   const res = await fetch(
//     "https://ecommerce.routemisr.com/api/v1/orders/user",
//     {
//       headers: {
//         token: token,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     const error = await res.text();
//     throw new Error(error);
//   }

//   return res.json();
// }
