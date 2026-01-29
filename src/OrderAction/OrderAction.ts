'use server';

import { cookies } from "next/headers";
import { CHECKOUT_REDIRECT_URL } from "src/config/urls";

type ShippingData = {
  details: string;
  phone: string;
  city: string;
};

/* ================== CHECKOUT ================== */
export async function checkoutPaymenet(
  cartId: string,
  shippingData: ShippingData
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${CHECKOUT_REDIRECT_URL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        shippingAddress: shippingData,
      }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Checkout failed");
  }

  return res.json();
}

/* ================== GET ALL ORDERS ================== */
export default async function getUserOrders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return []; // مهم جدًا عشان orders.map ما يقعش
  }

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/orders/user",
    {
      headers: {
        token,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.data ?? [];
}
