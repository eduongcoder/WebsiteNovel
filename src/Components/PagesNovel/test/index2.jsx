import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapters, deleteChapters } from '@/Redux/ReduxSlice/chapterSlice';

const TABLE_HEADS = ['idChapter', 'titleChapter', 'viewChapter', 'Action'];

function ViewChapters({ idNovel }) {
    const dispatch = useDispatch();

    // Get chapters, loading, and error from the Redux state
    const { chapters, loading, error } = useSelector((state) => state.chapter);

    useEffect(() => {
       
        // Fetch chapters when idNovel changes
        if (idNovel) {
            dispatch(fetchChapters(idNovel));
            console.log(" idNovel",idNovel);
        }
    }, [dispatch, idNovel]);

    // Log chapters data for debugging
    console.log("chapters",chapters);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error)
        return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div>
            <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3">
                    <h4 className="text-[18px] text-sky-400">
                        Danh sách chương
                    </h4>
                </div>
                <div className="rounded-lg border border-gray-950 overflow-x-auto">
                    <table className="min-w-[900px] w-full border-collapse text-zinc-900">
                        <thead className="text-left text-[17px] bg-slate-400">
                            <tr>
                                {TABLE_HEADS.map((th, index) => (
                                    <th key={index} className="px-3 py-3">
                                        {th}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {chapters && chapters.length > 0 ? (
                                chapters.map((chapter) => (
                                    <tr key={chapter.idChapter}>
                                        <td className="px-3 py-3">
                                            {chapter.idChapter}
                                        </td>
                                        <td className="px-3 py-3">
                                            {chapter.titleChapter}
                                        </td>
                                        <td className="px-3 py-3">
                                            {chapter.viewChapter}
                                        </td>
                                        <td className="px-3 py-3">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        deleteChapters(
                                                            chapter.idChapter,
                                                        ),
                                                    )
                                                }
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={TABLE_HEADS.length}
                                        className="px-3 py-3 text-center text-gray-500"
                                    >
                                        Không có chương nào được tìm thấy
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ViewChapters;
