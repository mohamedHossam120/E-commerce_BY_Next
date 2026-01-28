'use client'
import React, { useEffect, useState } from "react";
import MainSlider from "src/app/_Component/MainSlider/MainSlider";
import ProductCard from "src/app/_Component/ProductCard/ProductCard";
import { product } from "src/types/products.type";

export default function Page() {
    const [productList, setProductList] = useState<product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
                const data = await res.json();
                setProductList(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <>
            <MainSlider/>
            <section className="py-10 max-w-full overflow-x-hidden"> 
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-10 text-slate-800 border-s-4 border-main ps-4">
                        Our Products
                    </h1>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-xl font-medium text-gray-600">Loading products...</p>
                        </div>
                    ) : productList.length === 0 ? (
                        <p className="text-black text-lg text-center py-32">No products found</p>
                    ) : (
                        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                            {productList.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
