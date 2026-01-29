const isDev = process.env.NODE_ENV === "development";

export const NEXTAUTH_API = isDev
  ? "http://localhost:3000"
  : "https://e-commerce-by-next-jade.vercel.app";


export const CHECKOUT_REDIRECT_URL = isDev
  ? "http://localhost:3000/payment-success"
  : "https://e-commerce-by-next-jade.vercel.app/payment-success";