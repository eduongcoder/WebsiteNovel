import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';

export default function CardN() {
    return (
        <div className="container mx-auto my-8 px-4">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className="bg-gray-200 p-4 rounded-lg shadow-md" >
                    <div className="max-w-sm bg-gradient-to-b from-blue-100 to-blue-500 rounded-lg overflow-hidden shadow-lg p-5">
                        <div className="relative">
                            <img
                                className="w-full h-64 object-cover rounded-md"
                                src="path_to_image" // replace with actual image source
                                alt="Unintended Immortality"
                            />
                            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded-br-lg">
                                <span>Ongoing</span>
                            </div>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-white">
                            Unintended Immortality
                        </h3>
                        <p className="mt-2 text-white text-sm">
                            I am but a traveler in a foreign land, with no
                            desire to become an immortal....
                        </p>
                        <div className="mt-3 flex items-center text-white">
                            <span className="text-xl">👍</span>
                            <span className="ml-2">100%</span>
                            <span className="ml-2">📖</span>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
