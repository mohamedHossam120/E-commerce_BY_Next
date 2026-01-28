import React from "react";
import { productItem } from "src/types/productDetails.type";
import ProductSlider from "../ProductSlider/ProductSlider";
import AddCartBtn from "../ProductCard/AddCartBtn";

export default function ProductDetailsCard({ product }: { product: productItem }) {

    const { title, ratingsAverage, price, category, description,images,_id } = product;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                <div className="md:col-span-4 lg:col-span-4 bg-gray-50 rounded-xl overflow-hidden group">
                    <div className="md:col-span-4 bg-gray-50 rounded-xl overflow-hidden group border border-gray-100 flex items-center justify-center p-4">
                    <ProductSlider images={images}/>
                    </div>
                </div>

                <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-4">
                    <div className="space-y-2">
                        <span className="text-main font-semibold text-sm uppercase tracking-wider">
                            {category?.name}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                            {title}
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-sm font-bold flex items-center">
                                ★ {ratingsAverage}
                            </span>
                            <span className="text-gray-400 text-sm">(Rating)</span>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-4xl font-bold text-gray-900">
                            {price} <span className="text-lg font-normal">EGP</span>
                        </span>
                    </div>

                    <AddCartBtn id={_id} />
                </div>

            </div>
        </div>
    );
}