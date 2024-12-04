import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';
import ANCP from './AreaANCP';
const TABLE_HEADS = [
    'id_Novel',
    'name_Novel',
    'description_Novel',
    'images_Novel',
    'file',
    'action',
];

function ProductList() {
    const dispatch = useDispatch();
    const { novels, loading, error } = useSelector((state) => state.novel);

    // State for filtering, search, pagination, sorting
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNovels, setFilteredNovels] = useState(novels);
    const [currentPage, setCurrentPage] = useState(1);
    const [novelsPerPage, setNovelsPerPage] = useState(5); // Default 5 novels per page
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

    // Fetch novels when the component mounts
    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

    // Filter novels based on search query
    useEffect(() => {
        setFilteredNovels(
            novels.filter((novel) =>
                novel.nameNovel
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            ),
        );
    }, [novels, searchQuery]);

    // Handle delete novel action (you can add your logic here)
    const handleDelete = (novelId) => {
        if (window.confirm('Are you sure you want to delete this novel?')) {
            // Add your delete action logic here
        }
    };

    // Handle sorting based on column
    const handleSort = (column) => {
        const sortedNovels = [...filteredNovels].sort((a, b) => {
            if (column === 'id_Novel') {
                return sortOrder === 'asc'
                    ? a.idNovel - b.idNovel
                    : b.idNovel - a.idNovel;
            } else if (column === 'name_Novel') {
                return sortOrder === 'asc'
                    ? a.nameNovel.localeCompare(b.nameNovel)
                    : b.nameNovel.localeCompare(a.nameNovel);
            }
            return 0;
        });

        setFilteredNovels(sortedNovels);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Pagination Logic
    const indexOfLastNovel = currentPage * novelsPerPage;
    const indexOfFirstNovel = indexOfLastNovel - novelsPerPage;
    const currentNovels = filteredNovels.slice(
        indexOfFirstNovel,
        indexOfLastNovel,
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleNovelsPerPageChange = (e) => {
        setNovelsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    if (loading)
        return <div className="text-center text-blue-500">Loading...</div>;
    if (error)
        return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div>
            <section className="bg-sky-400 rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[18px] text-purple-700">Novel List</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="Search Novel..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mt-2 p-2 w-full md:w-64 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="text-sm">Novels per page: </label>
                    <select
                        value={novelsPerPage}
                        onChange={handleNovelsPerPageChange}
                        className="ml-2 p-2 border border-gray-300 rounded"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-track-[var(--scroll-track-bg-color)] scrollbar-thumb-gray-200">
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
                            {currentNovels.length > 0 ? (
                                currentNovels.map((novel) => (
                                    <tr key={novel.idNovel}>
                                        <td className="px-3 py-3">
                                            {novel.idNovel}
                                        </td>
                                        <td className="px-3 py-3">
                                            {novel.nameNovel}
                                        </td>
                                        <td className="px-3 py-3">
                                            {novel.descriptionNovel}
                                        </td>
                                        <td className="px-3 py-3">
                                            <img
                                                src={novel.imageNovel}
                                                alt={`Novel ${novel.idNovel}`}
                                                className="w-20 h-auto"
                                            />
                                        </td>
                                        <td className="px-3 py-3">
                                            <button
                                                onClick={() =>
                                                    handleDelete(novel.idNovel)
                                                }
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-3"
                                    >
                                        No novels available.
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
                                        filteredNovels.length / novelsPerPage,
                                    ),
                                },
                                (_, index) => (
                                    <li key={index + 1}>
                                        <button
                                            onClick={() => paginate(index + 1)}
                                            className="px-3 py-2  border rounded text-sm focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-500 hover:text-black"
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

export default ProductList;
