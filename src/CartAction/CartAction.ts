'use server'
import { getUserToken } from "src/getUserToken"
import { CartData } from "src/types/cart.type";
export async function getCartData() {

    const token = await getUserToken()

    if (!token) {
        throw new Error("token error");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        headers: {
            token: token,
            "Cache-Control": "no-cache"
        }
    })
    const data: CartData = await res.json()
    console.log(data);
    return data;
}
export async function AddProductToCart(id: string) {
    const token: unknown = await getUserToken();
    if (!token) {
        throw new Error("token error")
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        method: "POST",
        body: JSON.stringify({
            productId: id,
        }),
        headers: {
            token: String(token),
            "Content-Type": "application/json",
        },
    });
     const data = await res.json();
    return data;
}
export async function removeProduct(id:string){
    const token= await getUserToken()
    if(!token){
        throw new Error("token Error");
    }
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
        method:"delete",
        headers:{
            token:token
        }
    })
    const data=await res.json()
    return data

}
export async function clearCart(){
    const token=await getUserToken()
    if(!token){
        throw new Error("token Error")
    }
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        method:"delete",
        headers:{
            token:token
        }
    });
    const data=await res.json()
    return data
}
export async function updateProductQuantity(id:string,count:number) {
    const token=await getUserToken()
    if(!token){
        throw new Error("token error")
    }
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
        method:"put",
        body:JSON.stringify({
            count:count
        }),
        headers:{
            token:token,
            'content-type':"application/json"
        }
    })
    const data=await res.json()
    return data
}