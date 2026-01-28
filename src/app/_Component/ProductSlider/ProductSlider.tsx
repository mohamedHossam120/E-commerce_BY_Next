'use client'
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ProductSlider({ images }: { images: string[] }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <section className="container mx-auto my-8 px-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <div className="slider-container rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                        <Slider {...settings}>
                            {images?.map((imgUrl, index) => (
                                <div key={index} className="outline-none">
                                    <Image 
                                        src={imgUrl} 
                                        alt={`slider-${index}`}
                                        width={1200} 
                                        height={500}
                                        priority={index === 0}
                                        className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}