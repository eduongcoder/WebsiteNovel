import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors, deleteAuthor } from '@/Redux/ReduxSlice/authorSlice';

const TABLE_HEADS = [
    'ID Author',
    'Description Author',
    'Name Author',
    'Nationality Author',
    'ảnh',
    'Date of Birth',
    'Date of Death',
    'Action',
];

function ListViewAuthors() {
    const dispatch = useDispatch();
    const { authors, loading, error } = useSelector((state) => state.author);

    // State cho tìm kiếm, lọc, phân trang, và sắp xếp
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage, setAuthorsPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('ID Author');

    // Lấy danh sách tác giả
    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    // Lọc dữ liệu theo tìm kiếm
    useEffect(() => {
        const filterData = authors.filter(
            (author) =>
                author.nameAuthor
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                author.descriptionAuthor
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                author.nationality
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        );
        setFilteredAuthors(filterData);
    }, [authors, searchQuery]);

    // Sắp xếp dữ liệu
    const handleSort = (column) => {
        const sortedAuthors = [...filteredAuthors].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[column] > b[column] ? 1 : -1;
            }
            return a[column] < b[column] ? 1 : -1;
        });
        setFilteredAuthors(sortedAuthors);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortColumn(column);
    };

    // Phân trang
    const indexOfLastAuthor = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
    const currentAuthors = filteredAuthors.slice(
        indexOfFirstAuthor,
        indexOfLastAuthor,
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAuthorsPerPageChange = (e) => {
        setAuthorsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <section className="bg-sky-400 rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[18px] text-gray-950">Author List</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="Search authors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mt-2 p-2 w-full md:w-64 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="text-sm">Authors per page: </label>
                    <select
                        value={authorsPerPage}
                        onChange={handleAuthorsPerPageChange}
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
                                        {th}{' '}
                                        {sortColumn === th &&
                                            (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentAuthors.length > 0 ? (
                                currentAuthors.map((author) => (
                                    <tr key={author.idAuthor}>
                                        <td className="px-3 py-3">
                                            {author.idAuthor}
                                        </td>
                                        <td className="px-3 py-3">
                                            {author.descriptionAuthor}
                                        </td>
                                        <td className="px-3 py-3">
                                            {author.nameAuthor}
                                        </td>
                                        <td className="px-3 py-3">
                                            {author.nationality}
                                        </td>
                                        <td className="px-3 py-3">
                                            <img
                                                src={author.imageAuthor}
                                                alt={`Novel ${author.idAuthor}`}
                                                className="w-20 h-auto"
                                            />
                                        </td>
                                        <td className="px-3 py-3">
                                            {author.dobAuthor}
                                        </td>
                                        <td className="px-3 py-3">
                                            {author.dodAuthor}
                                        </td>
                                      
                                        <td className="px-3 py-3">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        deleteAuthor(
                                                            author.idAuthor,
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
                                        colSpan="7"
                                        className="px-3 py-3 text-center text-gray-500"
                                    >
                                        No authors found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="mt-4">
                    <nav>
                        <ul className="flex justify-center space-x-2">
                            {Array.from({
                                length: Math.ceil(
                                    filteredAuthors.length / authorsPerPage,
                                ),
                            }).map((_, index) => (
                                <li key={index + 1}>
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`px-3 py-2 border rounded text-sm focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-500 hover:text-white ${
                                            currentPage === index + 1
                                                ? 'bg-blue-500 text-white'
                                                : ''
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    );
}

export default ListViewAuthors;
