'use client'
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { clearCart, getCartData, removeProduct, updateProductQuantity } from "src/CartAction/CartAction";
import { cart, CartData } from "src/types/cart.type";
import { toast } from "sonner";
import { Button } from "src/components/ui/button";
import { CountContext } from "src/CountProvider";
import Link from "next/link";

export default function Cart() {
  const { setCount } = useContext(CountContext) as {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
  };
  const [cart, setCart] = useState<cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantityLoadingId, setQuantityLoadingId] = useState<string | null>(null);
  const [countDisabled, setCountDisabled] = useState(false);

  async function getAllCart() {
    try {
      const response: CartData = await getCartData();
      setCart(response.data);
      console.log(response.data)

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCart();
  }, []);

  async function deleteProduct(id: string) {
    const data = await removeProduct(id);
    if (data.status === 'success') {
      toast.success("Product Deleted", { position: "top-center" });
      getAllCart();
      const sum = data.data.products.reduce((total: number, item: { count: number; }) => total += item.count, 0)
      setCount(sum)
    } else {
      toast.error("Delete Failed");
    }
  }

  async function clearCartData() {
    const data = await clearCart();
    if (data.message === "success") {
      getAllCart();
      setCount(0)
    }
  }

  async function updateProductCount(id: string, count: number) {
    if (count < 1) return;
    setQuantityLoadingId(id);
    setCountDisabled(true);
    const data = await updateProductQuantity(id, count);

    if (data.status === 'success') {
      await getAllCart();
      const sum = data.data.products.reduce((total: number, item: { count: number; }) => total += item.count, 0)
      setCount(sum)
    }
    setQuantityLoadingId(null);
    setCountDisabled(false);
  }

  return (
    <div className="container mx-auto py-12 px-4 ltr" dir="ltr">
      {loading ? (
        <div className="max-w-6xl mx-auto p-6 py-12 flex flex-col items-center justify-center min-h-[500px]">
          <span className="spinner"></span>
          <p className="mt-4 text-main font-bold text-lg animate-pulse">
            Loading...
          </p>
        </div>
      ) : cart?.products.length === 0 ? (
        <p className="text-center text-2xl font-semibold text-gray-500 py-32">
          Your cart is empty
        </p>
      ) : (
        <div className="max-w-6xl mx-auto space-y-8">

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b pb-6 gap-6">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Shop Cart</h1>
              <p className="text-gray-500 mt-2 font-medium">
                You have {cart?.products.length || 0} items in your basket
              </p>
            </div>
            <div className="text-left lg:text-right">
              <p className="text-xs uppercase font-bold text-gray-400 tracking-widest mb-1">Total Balance</p>
              <h2 className="text-3xl font-black text-green-600">
                ${cart?.totalCartPrice.toLocaleString()}
              </h2>
              <Button className="mt-4 cursor-pointer" onClick={clearCartData}>
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm text-left border-collapse">
              <thead className="text-xs uppercase bg-gray-50/50 text-gray-500 border-b">
                <tr>
                  <th className="px-6 py-5 font-bold">Product</th>
                  <th className="px-6 py-5 font-bold">Details</th>
                  <th className="px-6 py-5 font-bold text-center">Quantity</th>
                  <th className="px-6 py-5 font-bold text-center">Subtotal</th>
                  <th className="px-6 py-5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cart?.products.map((item) => (
                  <tr key={item._id} className="hover:bg-blue-50/30 transition-all duration-200">
                    <td className="p-4 w-40">
                      <div className="aspect-square relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-contain p-3"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                        {item.product.title}
                      </h3>
                      <p className="text-blue-500 font-semibold tracking-wide">
                        ${item.price} <span className="text-gray-900 font-normal">/ piece</span>
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 bg-gray-100/50 w-fit mx-auto p-1 rounded-full border border-gray-200">
                        <button
                          disabled={countDisabled}
                          onClick={() =>
                            updateProductCount(item.product._id, item.count - 1)
                          }
                          className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all"
                        >
                          <i className="fa-solid fa-minus text-[10px]"></i>
                        </button>

                        <div className="w-6 text-center font-bold text-gray-800">
                          {quantityLoadingId === item.product._id ? (
                            <i className="fa-solid fa-spinner fa-spin text-xs text-gray-500"></i>
                          ) : (
                            <input
                              type="number"
                              value={item.count}
                              min={1}
                              onChange={(e) => {
                                const newCount = Number(e.target.value);
                                if (newCount < 1) return;
                                updateProductCount(item.product._id, newCount);
                              }}
                              className="w-12 text-center font-bold text-gray-800 bg-transparent border-none focus:ring-0"
                            />

                          )}
                        </div>

                        <button
                          disabled={countDisabled}
                          onClick={() =>
                            updateProductCount(item.product._id, item.count + 1)
                          }
                          className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all"
                        >
                          <i className="fa-solid fa-plus text-[10px]"></i>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-black text-gray-900 text-lg">
                        ${(item.price * item.count).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        disabled={countDisabled}
                        onClick={() => deleteProduct(item.product._id)}
                        className="cursor-pointer group p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300"
                      >
                        <i className="fa-solid fa-trash-can text-xl group-hover:scale-110 transition-transform"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-6">
            <Link
              href={`/checkoutsession/${cart?._id}`}
              className="px-8 py-3 border border-green-600 text-blue-600 
               font-semibold rounded-xl 
               hover:bg-green-600 hover:text-white transition"
            >
              Continue to Checkout →
            </Link>
          </div>
        </div>
      )}


    </div>
  );
}
