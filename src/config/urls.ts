const isDev = process.env.NODE_ENV === "development";

export const NEXTAUTH_API = isDev
  ? "http://localhost:3000"
  : "https://e-commerce-by-next-jade.vercel.app";

