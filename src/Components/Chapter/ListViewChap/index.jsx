import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';
const TABLE_HEADS = ['idChapter', 'titleChapter','numberChapter','viewChapter', 'Action'];

function ListViewChpters() {
  const novels = useSelector((state) => state.novel.novels);
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector(
        (state) => state.chapters,
    );
    const handleChooseChapterofNameNovel = async (itemId) => {
        if (confirmDelete) {
            dispatch(fetchChapters(itemId));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const handleNovelChange = (e) => {
        setIdNovel(e.target.value);
    };
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
                        value={idNovel}
                        onChange={handleNovelChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40"
                    >
                        <option value="">Chọn Tiểu Thuyết</option>
                        {loading ? (
                            <option value="">Đang tải...</option>
                        ) : novels && novels.length > 0 ? (
                            novels.map((novel) => (
                                <option
                                    key={novel.idNovel}
                                    value={novel.idNovel}
                                >
                                    {novel.idNovel}
                                </option>
                            ))
                        ) : (
                            <option value="">Không có tiểu thuyết nào</option>
                        )}
                    </select>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </div>
                <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-track-[var(--scroll-track-bg-color)] scrollbar-thumb-gray-200">
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
                            {chapters.map((chapter) => (
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
                                    {/* <td className="px-3 py-3">
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    category.idCategory,
                                                )
                                            }
                                            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                                        >
                                            Xóa
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ListViewChpters;
