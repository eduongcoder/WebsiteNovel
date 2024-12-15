import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCategories,
    deleteCategory,
} from '@/Redux/ReduxSlice/categorySlice';
import { Category } from '@/Redux/ReduxSlice/Seletor';

const TABLE_HEADS = ['id category', 'Name category', 'Action'];

function ListViewCategory() {
    const dispatch = useDispatch();
    const categorys = useSelector(Category);

    // State for filtering and searchnameCategory
    const [searchQuery, setSearchQuery] = useState('');
    const [nameCategory, setnameCategory] = useState(categorys);
    const [currentPage, setCurrentPage] = useState(1);
    const [povsPerPage, setPovsPerPage] = useState(5); // Default 5 POV per page
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

    // Fetch POVs when the component mounts
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        setFilteredCategory(
            categorys.filter((category) =>
                category.nameCategory
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            ),
        );
    }, [categorys, searchQuery]);

    const handleDelete = (cateId) => {
        dispatch(deleteCategory(cateId));
    };

    const handleSort = (column) => {
        const sortedPovs = [...filteredCategory].sort((a, b) => {
            if (column === 'Id Point Of View') {
                return sortOrder === 'asc'
                    ? a.idPointOfView - b.idPointOfView
                    : b.idPointOfView - a.idPointOfView;
            } else if (column === 'Name Point Of View') {
                return sortOrder === 'asc'
                    ? a.namePointOfView.localeCompare(b.namePointOfView)
                    : b.namePointOfView.localeCompare(a.namePointOfView);
            }
            return 0;
        });

        setFilteredCategory(sortedPovs);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Pagination Logic
    const indexOfLastPov = currentPage * povsPerPage;
    const indexOfFirstPov = indexOfLastPov - povsPerPage;
    const currentPovs = filteredCategory.slice(indexOfFirstPov, indexOfLastPov);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePovsPerPageChange = (e) => {
        setPovsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    return (
        <div>
            <section className="bg-cyan-600 rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[18px] text-sky-100">
                        Point of View List
                    </h4>
                    <div>
                        <input
                            type="text"
                            placeholder="Search POV..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mt-2 p-2 w-full md:w-64 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="text-sm">Povs per page: </label>
                    <select
                        value={povsPerPage}
                        onChange={handlePovsPerPageChange}
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
                            {categorys.length > 0 ? (
                                categorys.map((category) => (
                                    <tr key={category.idCategory}>
                                        <td className="px-3 py-3">
                                            {category.idCategory}
                                        </td>
                                        <td className="px-3 py-3">
                                            {category.nameCategory}
                                        </td>
                                        <td className="px-3 py-3">
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        category.idCategory,
                                                    )
                                                }
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-3"
                                    >
                                        No POVs available.
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
                                        filteredCategory.length / povsPerPage,
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

export default ListViewCategory;