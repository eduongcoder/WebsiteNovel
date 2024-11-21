import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapters,deleteChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { fetchNovelOnlyName } from '@/Redux/ReduxSlice/novelSlice';

const TABLE_HEADS = ['idChapter', 'titleChapter', 'numberChapter', 'viewChapter', 'Action'];

function ListViewChapters() {
    const [idNovel, setIdNovel] = useState(''); // State for the selected novel
    const dispatch = useDispatch();

    // Fetching novels and chapters data from Redux state
    const novels = useSelector((state) => state.novel.novels);
    const { chapters, loading, error } = useSelector((state) => state.chapter); // Adjust key here

    useEffect(() => {
        // Fetch novels when the component mounts
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    useEffect(() => {
        // Fetch chapters when idNovel changes
        if (idNovel) {
            dispatch(fetchChapters(idNovel));
        }
    }, [dispatch, idNovel]);

    const handleNovelChange = (e) => {
        setIdNovel(e.target.value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3">
                    <h4 className="text-[18px] text-sky-400">Category List</h4>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="idNovel"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Chọn Tiểu Thuyết
                    </label>
                    <select
                        id="idNovel"
                        value={idNovel}
                        onChange={handleNovelChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40"
                    >
                        <option value="">Chọn Tiểu Thuyết</option>
                        {novels && novels.length > 0 ? (
                            novels.map((novel) => (
                                <option
                                    key={novel.idNovel}
                                    value={novel.idNovel}
                                >
                                    {novel.nameNovel}
                                </option>
                            ))
                        ) : (
                            <option value="">Không có tiểu thuyết nào</option>
                        )}
                    </select>
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
                                            {chapter.numberChapter}
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

export default ListViewChapters;
