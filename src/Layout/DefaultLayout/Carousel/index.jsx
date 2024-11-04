// import React, { useEffect, useState } from 'react';

// function Carousel() {
//     const images = [
//         'https://media.vov.vn/sites/default/files/styles/large/public/2022-10/image_8.jpg',
//         'https://transviet.com.vn/images/Khuyen-Mai/Avatar/cam_nang_du_lich/mua%20thu_transviet%2005.jpg',
//         'https://pbs.twimg.com/media/DrruGTJXQAA1QHK.jpg',
//         'https://img.thuthuatphanmem.vn/uploads/2018/11/06/hinh-anh-mua-thu-la-do_043603618.jpg',
//         'https://pbs.twimg.com/media/Dnn8rqEXcAAHYWO.jpg',
//     ];

//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         // Kiểm tra hình ảnh
//         images.forEach((imgSrc, index) => {
//             const img = new Image();
//             img.src = imgSrc;

//             img.onload = () => {
//                 console.log(`Hình ảnh ${index + 1} đã được hiển thị: ${imgSrc}`);
//             };
//             img.onerror = () => {
//                 console.log(`Hình ảnh ${index + 1} không thể hiển thị: ${imgSrc}`);
//             };
//         });

//         // Tự động chuyển tiếp hình ảnh
//         const intervalId = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 10000); // 3000 milliseconds = 3 seconds

//         // Dọn dẹp interval khi component unmount
//         return () => clearInterval(intervalId);
//     }, [images]);

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     const handlePrev = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? images.length - 1 : prevIndex - 1
//         );
//     };

//     return (
//         <div id="default-carousel" className="relative w-full" data-carousel="slide">
//             <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//                 {images.map((imgSrc, index) => (
//                     <div
//                         key={index}
//                         className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
//                             index === currentIndex ? 'opacity-100' : 'opacity-0'
//                         }`}
//                         data-carousel-item={index === currentIndex ? 'active' : ''}
//                     >
//                         <img
//                             src={imgSrc}
//                             className="block w-full h-full object-cover"
//                             alt={`Slide ${index + 1}`}
//                         />
//                     </div>
//                 ))}
//             </div>

//             {/* Slider indicators */}
//             <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
//                 {images.map((_, index) => (
//                     <button
//                         key={index}
//                         type="button"
//                         className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'}`}
//                         aria-label={`Slide ${index + 1}`}
//                         onClick={() => setCurrentIndex(index)}
//                     ></button>
//                 ))}
//             </div>

//             {/* Slider controls */}
//             <button
//                 type="button"
//                 className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//                 onClick={handlePrev}
//             >
//                 <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                     <svg
//                         className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 6 10"
//                     >
//                         <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M5 1 1 5l4 4"
//                         />
//                     </svg>
//                     <span className="sr-only">Previous</span>
//                 </span>
//             </button>

//             <button
//                 type="button"
//                 className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//                 onClick={handleNext}
//             >
//                 <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                     <svg
//                         className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 6 10"
//                     >
//                         <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M1 9 5 5 1 1"
//                         />
//                     </svg>
//                     <span className="sr-only">Next</span>
//                 </span>
//             </button>
//         </div>
//     );
// }

// export default Carousel;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Carousel() {
    const [images, setImages] = useState([]); // Change from const images to useState
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await axios.get('http://26.232.136.42:8080/api/novel/getNovels');
                const novels = response.data.result;

                // Assuming that 'novels' contains an 'imageNovel' field for each item
                const imagesArray = novels.map(novel => novel.imageNovel);
                setImages(imagesArray);
                console.log('Fetched images:', imagesArray);
            } catch (error) {
                setError('Error fetching novels');
                console.error('Error fetching novels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNovels();
    }, []);

    useEffect(() => {
        // Automatically transition images if they are loaded
        const intervalId = setInterval(() => {
            if (images.length) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 10000); // Change duration as needed

        return () => clearInterval(intervalId);
    }, [images]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.map((imgSrc, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        data-carousel-item={index === currentIndex ? 'active' : ''}
                    >
                        <img
                            src={imgSrc}
                            className="block w-full h-full object-cover"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'}`}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>

            {/* Slider controls */}
            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handlePrev}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handleNext}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 9 5 5 1 1"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
}

export default Carousel;
