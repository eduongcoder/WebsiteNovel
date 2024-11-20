import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCategories,
    deleteCategory,
} from '@/Redux/ReduxSlice/categorySlice';

const TABLE_HEADS = ['ID Category', 'Name Category', 'Action'];

function ListViewCategory() {
    const dispatch = useDispatch();
    const { categories = [], loading, error } = useSelector(
        (state) => state.category
    );

    // State for filtering and search
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage, setCategoriesPerPage] = useState(5); // Default 5 categories per page
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

    // Fetch categories when the component mounts
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Filter categories based on search query
    useEffect(() => {
        if (categories && categories.length > 0) {
            setFilteredCategories(
                categories.filter((category) =>
                    category.nameCategory
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredCategories([]); // Nếu không có danh mục, trả về mảng rỗng
        }
    }, [categories, searchQuery]);

    // Handle delete category
    const handleDelete = (categoryId) => {
        dispatch(deleteCategory(categoryId));
    };

    // Handle sorting based on column
    const handleSort = (column) => {
        const sortedCategories = [...filteredCategories].sort((a, b) => {
            if (column === 'ID Category') {
                return sortOrder === 'asc'
                    ? a.idCategory - b.idCategory
                    : b.idCategory - a.idCategory;
            } else if (column === 'Name Category') {
                return sortOrder === 'asc'
                    ? a.nameCategory.localeCompare(b.nameCategory)
                    : b.nameCategory.localeCompare(a.nameCategory);
            }
            return 0;
        });

        setFilteredCategories(sortedCategories);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Pagination Logic
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCategoriesPerPageChange = (e) => {
        setCategoriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    if (loading) return <div className="text-center text-blue-500">Loading...</div>;
    if (error)
        return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div>
            <section className="bg-purple-800 rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[18px] text-sky-400">Category List</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mt-2 p-2 w-full md:w-64 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="text-sm">Categories per page: </label>
                    <select
                        value={categoriesPerPage}
                        onChange={handleCategoriesPerPageChange}
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
                            {currentCategories.length > 0 ? (
                                currentCategories.map((category) => (
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
                                                    handleDelete(category.idCategory)
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
                                    <td colSpan="3" className="text-center py-3">
                                        No categories available.
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
                                    length: Math.ceil(filteredCategories.length / categoriesPerPage),
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
                                )
                            )}
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    );
}

export default ListViewCategory;
