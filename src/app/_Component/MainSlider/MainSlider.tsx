'use client'
import React from "react";
import Slider from "react-slick";
import Image from "next/image";


export default function HomeSlider() {
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
                <div className="col-span-12 lg:col-span-8">
                    <div className="slider-container rounded-2xl overflow-hidden shadow-md">
                        <Slider {...settings}>
                            <div className="outline-none">
                                <Image 
                                    src="/images/slider-image-1.jpeg" 
                                    width={1000} height={450} 
                                    alt="Promotional Slide 1" 
                                    className="w-full h-[300px] md:h-[450px] object-cover" 
                                />
                            </div>
                            <div className="outline-none">
                                <Image 
                                    src="/images/slider-image-2.jpeg" 
                                    width={1000} height={450} 
                                    alt="Promotional Slide 2" 
                                    className="w-full h-[300px] md:h-[450px] object-cover" 
                                />
                            </div>
                            <div className="outline-none">
                                <Image 
                                    src="/images/slider-image-3.jpeg" 
                                    width={1000} height={450} 
                                    alt="Promotional Slide 3" 
                                    className="w-full h-[300px] md:h-[450px] object-cover" 
                                />
                            </div>
                        </Slider>
                    </div>
                </div>

                <div className="hidden lg:col-span-4 lg:flex flex-col gap-4">
                    <div className="h-[217px] rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.02]">
                        <Image 
                            src="/images/blog-img-1.jpeg" 
                            width={500} height={217} 
                            alt="Side Banner 1" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="h-[217px] rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.02]">
                        <Image 
                            src="/images/blog-img-2.jpeg" 
                            width={500} height={217} 
                            alt="Side Banner 2" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}