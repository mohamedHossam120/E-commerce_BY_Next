"use client"
import { RemoveWish } from "src/WishlistActions/wIshlistActions"; 
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RemoveWishBtnProps {
    productId: string;
}

export default function RemoveWishBtn({ productId }: RemoveWishBtnProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRemove = async () => {
        setIsDeleting(true);
        try {
            const res = await RemoveWish(productId);
            if (res.status === "success") {
                toast.success("Removed from wishlist");
                router.refresh(); 
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove item");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button 
            onClick={handleRemove}
            disabled={isDeleting}
            className={`group flex items-center gap-2 transition-colors duration-200 cursor-pointer py-1 mt-2 ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : 'text-gray-500 hover:text-red-600'
            }`}
        >
            <div className={`p-2 rounded-full transition-colors ${
                isDeleting ? 'bg-gray-200' : 'bg-gray-100 group-hover:bg-red-50'
            }`}>
                {isDeleting ? (
                    <div className="w-[18px] h-[18px] border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="group-hover:scale-110 transition-transform"
                    >
                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                )}
            </div>
            <span className="text-sm font-medium">
                {isDeleting ? "Removing..." : "Remove from list"}
            </span>
        </button>
    );
}