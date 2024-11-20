import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels, setCurrentIndex } from '@/Redux/ReduxSlice/novelSlice';

function Carousel() {
    const dispatch = useDispatch();
    const { images = [], currentIndex } = useSelector((state) => state.novel); // Đảm bảo images là một mảng
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

    const handleNext = () => {
        if (images.length > 0) {
            dispatch(setCurrentIndex((currentIndex + 1) % images.length));
        }
    };

    const handlePrev = () => {
        if (images.length > 0) {
            dispatch(
                setCurrentIndex(
                    (currentIndex === 0 ? images.length : currentIndex) - 1,
                ),
            );
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const distance = e.pageX - startX;
        if (distance > 50) {
            handlePrev();
            setIsDragging(false);
        } else if (distance < -50) {
            handleNext();
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleMouseLeave = () => setIsDragging(false);

    return (
        <div
            id="default-carousel"
            className="relative mb-4 w-full"
            data-carousel="slide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.length > 0 ? (
                    images.map((imgSrc, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                                index === currentIndex
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                            data-carousel-item={
                                index === currentIndex ? 'active' : ''
                            }
                        >
                            <img
                                src={imgSrc}
                                className="block w-full h-full object-cover"
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p>Loading images...</p>
                        <h1>{images.length}</h1>
                    </div>
                )}
            </div>

            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index
                                ? 'bg-gray-800'
                                : 'bg-gray-300'
                        }`}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => dispatch(setCurrentIndex(index))}
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
