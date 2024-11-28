import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChapters, deleteChapters } from '@/Redux/ReduxSlice/chapterSlice';

const TABLE_HEADS = [
    'idChapter',
    'titleChapter',
    'numberChapter',
    'viewChapter',
    'Action',
];

function ViewChapters({ idNovel }) {
    const dispatch = useDispatch();

    const {
        chapters = [],
        loading,
        error,
    } = useSelector((state) => state.chapter);

    // State cho tìm kiếm, phân trang và sắp xếp
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredChapters, setFilteredChapters] = useState(chapters);
    const [currentPage, setCurrentPage] = useState(1);
    const [chaptersPerPage, setChaptersPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        if (idNovel) dispatch(fetchChapters(idNovel));
    }, [dispatch, idNovel]);

    // Lọc chương dựa trên từ khóa tìm kiếm
    useEffect(() => {
        setFilteredChapters(
            chapters.filter((chapter) =>
                chapter.titleChapter
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            ),
        );
    }, [chapters, searchQuery]);

    // Sắp xếp danh sách chương
    const handleSort = (column) => {
        const sortedChapters = [...filteredChapters].sort((a, b) => {
            if (
                column === 'idChapter' ||
                column === 'numberChapter' ||
                column === 'viewChapter'
            ) {
                return sortOrder === 'asc'
                    ? a[column] - b[column]
                    : b[column] - a[column];
            } else if (column === 'titleChapter') {
                return sortOrder === 'asc'
                    ? a[column].localeCompare(b[column])
                    : b[column].localeCompare(a[column]);
            }
            return 0;
        });

        setFilteredChapters(sortedChapters);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Phân trang
    const indexOfLastChapter = currentPage * chaptersPerPage;
    const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
    const currentChapters = filteredChapters.slice(
        indexOfFirstChapter,
        indexOfLastChapter,
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChaptersPerPageChange = (e) => {
        setChaptersPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[18px] text-sky-400">
                        Danh sách chương anh
                    </h4>
                    <div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm chương..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mt-2 p-2 w-full md:w-64 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="text-sm">Chương mỗi trang: </label>
                    <select
                        value={chaptersPerPage}
                        onChange={handleChaptersPerPageChange}
                        className="ml-2 p-2 border border-gray-300 rounded"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                <div className="rounded-lg border border-gray-950 overflow-x-auto">
                    <table className="min-w-[900px] w-full border-collapse text-zinc-900">
                        <thead className="text-left text-[17px] bg-slate-400">
                            <tr>
                                {TABLE_HEADS.map((th, index) => (
                                    <th
                                        key={index}
                                        className="px-3 py-3 cursor-pointer"
                                        onClick={() => handleSort(th)}
                                    >
                                        {th}
                                        {sortOrder === 'asc' ? ' ↑' : ' ↓'}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentChapters.length > 0 ? (
                                currentChapters.map((chapter) => (
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

                {/* Pagination */}
                <div className="mt-4">
                    <nav>
                        <ul className="flex justify-center space-x-2">
                            {Array.from(
                                {
                                    length: Math.ceil(
                                        filteredChapters.length /
                                            chaptersPerPage,
                                    ),
                                },
                                (_, index) => (
                                    <li key={index + 1}>
                                        <button
                                            onClick={() => paginate(index + 1)}
                                            className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-500 hover:text-white"
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ),
                            )}
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    );
}

export default ViewChapters;
