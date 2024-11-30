import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function CardN() {
    const dispatch = useDispatch();
    const novels = useSelector((state) => state.novel.novels); // Lấy danh sách novels từ Redux
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchNovels())
            .then(() => setLoading(false))
            .catch((err) => console.error(err));
    }, [dispatch]);

    if (loading) {
        return <p>Loading novels...</p>;
    }

    return (
        <div className="container mx-auto my-8 px-4 bg-gray-900 py-10">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
            First, The Top Series
        </h1>
        <p className="text-center text-gray-300 mb-8">
            Let’s read top stories by genre!
        </p>
        <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 50 },
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {novels.map((novel) => (
                <SwiperSlide
                    key={novel.idNovel}
                    className={`w-[300px] p-6  rounded-lg shadow-lg flex flex-col items-center bg-gradient-to-b ${
                        novel.genre === 'Slice of Life'
                            ? 'from-blue-200 to-blue-500'
                            : novel.genre === 'Sci-fi'
                            ? 'from-sky-200 to-sky-500'
                            : novel.genre === 'Cultivation'
                            ? 'from-green-200 to-red-500'
                            : 'from-yellow-200 to-blue-300'
                    }`}
                >
                    <h2 className="text-xl font-semibold text-white mb-4 text-center">
                        {novel.genre}
                    </h2>
                    <div className="relative w-full h-56 overflow-hidden rounded-lg shadow-md">
                        <img
                            src={novel.imageNovel}
                            alt={novel.nameNovel}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                            {novel.status || 'Ongoing'}
                        </div>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white text-center truncate">
                        {novel.nameNovel}
                    </h3>
                    <p className="text-sm text-gray-100 text-center mt-2 truncate">
                        {novel.descriptionNovel}
                    </p>
                    <div className="mt-4 flex items-center space-x-2 text-gray-100">
                        <span className="text-lg">👍</span>
                        <span>{novel.rating || 'N/A'}</span>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
    
    );
}
