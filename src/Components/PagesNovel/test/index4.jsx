import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Pagination,
    Navigation,
    HashNavigation,
    Autoplay,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import action
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';

export default function CCarousel() {
    const dispatch = useDispatch();

    // Lấy danh sách novels từ Redux store
    const novels = useSelector((state) => state.novel.novels);

    useEffect(() => {
        // Gọi API fetchNovels khi component render
        dispatch(fetchNovels());
    }, [dispatch]);

    return (
        <div className="h-screen bg-gray-100 flex justify-center items-center">
            <Swiper
                spaceBetween={30}
                hashNavigation={{
                    watchState: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                autoplay={{
                    delay: 5000, // Thời gian giữa các lần chuyển slide (5 giây)
                    disableOnInteraction: false, // Tự động tiếp tục sau khi người dùng tương tác
                }}
                loop={true} // Tính năng lặp vòng
                modules={[Pagination, Navigation, HashNavigation, Autoplay]}
                className="w-full h-full"
            >
                {novels && novels.length > 0 ? (
                    novels.map((novel) => (
                        <SwiperSlide
                            key={novel.idNovel}
                            data-hash={`novel-${novel.idNovel}`}
                            className="flex justify-center items-center bg-white"
                        >
                            <img
                                src={novel.imageNovel}
                                alt={novel.nameNovel}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="text-center">Loading...</div>
                )}
            </Swiper>
        </div>
    );
}
