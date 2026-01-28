"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getLoggedUserWishlist, RemoveWish } from "src/WishlistActions/wIshlistActions";
import AddCartBtn from "src/app/_Component/ProductCard/AddCartBtn";
import { product as ProductType } from "src/types/products.type";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [items, setItems] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // 1. جلب البيانات عند فتح الصفحة
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await getLoggedUserWishlist();
        setItems(res?.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  async function handleDelete(productId: string) {
    setIsProcessing(productId); 
    try {
      const res = await RemoveWish(productId);
      
      if (res.status === "success") {
        setItems((prev) => prev.filter((item) => item._id !== productId));
        toast.success("Item removed successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Failed to delete item");
    } finally {
      setIsProcessing(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-gray-800 border-b pb-5">
        My Wishlist ❤️ <span className="text-main text-lg ml-2">({items.length})</span>
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <p className="text-gray-500 text-xl font-medium">Your wishlist is empty!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {items.map((item) => (
            <div 
              key={item._id} 
              className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group"
            >
              <div className="relative w-32 h-32 flex-shrink-0 border rounded-xl overflow-hidden bg-gray-50">
                <Image
                  src={item.imageCover}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-grow text-center md:text-left">
                <h3 className="font-bold text-gray-800 text-lg line-clamp-1 mb-1">{item.title}</h3>
                <p className="text-main font-bold text-xl mb-3">{item.price} EGP</p>
                
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={isProcessing === item._id}
                  className="text-red-500 cursor-pointer hover:text-red-700 font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  <i className={`fa-solid ${isProcessing === item._id ? "fa-spinner fa-spin" : "fa-trash-can"}`}></i>
                  {isProcessing === item._id ? "Removing..." : "Remove"}
                </button>
              </div>

              <div className="w-full md:w-56">
                <AddCartBtn id={item._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}