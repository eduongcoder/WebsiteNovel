import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { Link } from 'react-router-dom';
import { chapter as selectChapters } from '@/Redux/ReduxSlice/Seletor';

export default function ChapterList({ idNovel }) {
    const dispatch = useDispatch();
    const chapters = useSelector(selectChapters);
    const [loading, setLoading] = useState(false); // Quản lý trạng thái tải dữ liệu

    useEffect(() => {
        const fetchList = async (cleanedIdNovel) => {
            setLoading(true);
            try {
                await dispatch(fetchChapters(cleanedIdNovel));
            } catch (error) {
                console.error('Failed to fetch');
            }
        };

        if (idNovel) {
            const cleanedIdNovel = idNovel.replace(/^:/, '');
            const isChapterFetched = chapters.some(
                (ch) => ch.idNovel === cleanedIdNovel,
            );
            if (!isChapterFetched) {
                // Nếu chưa có thông tin, gọi API fetch chapters
                fetchList(cleanedIdNovel);
            }
        }
    }, [idNovel, chapters, dispatch]); // Thêm `idNovel` và `dispatch` vào danh sách phụ thuộc

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
                    {chapters
                        .filter(
                            (chapter) =>
                                chapter.idNovel === idNovel.replace(/^:/, ''),
                        )
                        .map((chapter) => (
                            <Link
                                to={`/ViewChap/${
                                    chapter.idChapter
                                }?startPage=${1}&totalPageChapter=${
                                    chapter.totalPageChapter
                                }&titleChapter=${chapter.titleChapter}`}
                                className="w-full"
                                key={chapter.idChapter}
                            >
                                <div className="flex justify-between items-center bg-gray-800 p-4 mb-2 rounded cursor-pointer hover:bg-gray-700">
                                    <div>
                                        <p className="text-sm font-medium">
                                            {chapter.titleChapter}
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
