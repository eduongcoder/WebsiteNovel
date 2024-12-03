import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { Link } from 'react-router-dom';

export default function ChapterList({ idNovel }) {
    const dispatch = useDispatch();
    const { chapters, loading } = useSelector((state) => state.chapter);

    useEffect(() => {
        if (idNovel) {
            const cleanedIdNovel = idNovel.replace(/^:/, ''); // Loại bỏ dấu `:`
            dispatch(fetchChapters(cleanedIdNovel));
        }
    }, [dispatch, idNovel]);

    return (
        <section className="bg-gray-900 text-white p-6 rounded-md">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Latest Chapter</h2>
                    <p className="text-sm text-gray-300">
                        Chapter{' '}
                        {chapters.length > 0
                            ? chapters[chapters.length - 1].idChapter
                            : 'Loading...'}{' '}
                        a year ago
                    </p>
                </div>
                <button className="bg-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-600">
                    Oldest ▼
                </button>
            </div>

            {/* Danh sách các chương */}
            {loading ? (
                <p className="text-center text-gray-400">Loading chapters...</p>
            ) : (
                <div>
                    {chapters.map((chapter, index) => (
                        <Link
                            to={`/ViewChap/${chapter.idChapter}`}
                            className="w-full"
                            key={chapter.idChapter}
                        >
                            <div className="flex justify-between items-center bg-gray-800 p-4 mb-2 rounded cursor-pointer hover:bg-gray-700">
                                <div>
                                    <p className="text-sm font-medium">
                                        Book {index + 1} — {chapter.titleChapter}
                                    </p>
                                </div>
                                <button className="text-gray-400 hover:text-white">
                                    ▼
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
