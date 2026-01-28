"use client";
import React, { useState } from "react"; // ضفنا useState هنا
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { product } from "src/types/products.type";
import Link from "next/link";
import AddCartBtn from "./AddCartBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { Createwish } from "src/WishlistActions/wIshlistActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: product }) {
  const {
    imageCover,
    title,
    ratingsAverage,
    price,
    category: { name },
    _id,
  } = product;

  const { data: session, status } = useSession();
  const router = useRouter();

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (status !== "authenticated" || !session) {
      toast.error("Please log in first");
      router.push("/login");
      return;
    }

    try {
      const res = await Createwish(_id);

      if (res?.status === "success") {
        toast.success(res.message || "Product added to wishlist");
        setIsWishlisted(true); 
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <Card className="bg-white hover:shadow-lg transition-shadow relative group h-full flex flex-col justify-between">
      <button
        onClick={handleWishlist}
        className={`absolute top-4 right-4 z-20 p-2 bg-white/90 rounded-full cursor-pointer transition-all active:scale-90 shadow-sm ${
          isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
        }`}
        aria-label="Add to wishlist"
      >
        <FontAwesomeIcon icon={faHeart} className="text-xl" />
      </button>

      <Link href={"/products/" + _id} className="flex flex-col flex-grow">
        <CardHeader className="p-0 overflow-hidden rounded-t-xl">
          <Image
            src={imageCover}
            alt={title}
            width={300}
            height={300}
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </CardHeader>

        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-main text-sm mb-1">{name}</CardTitle>
          <CardTitle className="text-lg font-bold mb-2 line-clamp-2">
            {title.split(" ").slice(0, 2).join(" ")}
          </CardTitle>

          <div className="flex justify-between items-center mt-auto">
            <span className="font-bold text-gray-700">{price} EGP</span>
            <span className="flex items-center gap-1 text-sm">
              <i className="fa-solid fa-star text-yellow-400"></i>
              {ratingsAverage}
            </span>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <AddCartBtn id={_id} />
      </CardFooter>
    </Card>
  );
}