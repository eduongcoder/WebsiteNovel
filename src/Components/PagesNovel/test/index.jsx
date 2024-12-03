import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';
import ViewChapters from './index2';

const TABLE_HEADS = [
    { label: 'ID Novel', key: 'idNovel' },
    { label: 'Name Novel', key: 'nameNovel' },
    { label: 'Description Novel', key: 'descriptionNovel' },
    { label: 'Status Novel', key: 'statusNovel' },
    { label: 'Action', key: null },
];

function ProList() {
    const dispatch = useDispatch();
    const { novels, loading, error } = useSelector((state) => state.novel);
    console.log('hehhe');
    // State
    const [openedId, setOpenedId] = useState(null); // State để lưu id của dòng đang mở
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [novelsPerPage, setNovelsPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState('idNovel');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

    // Hàm để mở/đóng phần nội dung của dòng khi click
    const toggleContent = (idNovel) => {
        if (openedId !== idNovel) {
            setOpenedId(idNovel); // Chỉ thay đổi nếu idNovel chưa được mở
        } else {
            setOpenedId(null); // Nếu đã mở rồi, thì đóng lại
        }
    };
    const handleSort = (column) => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortColumn(column);
    };

    const filteredNovels = novels.filter((novel) =>
        novel.nameNovel.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const sortedNovels = [...filteredNovels].sort((a, b) => {
        if (!sortColumn) return 0;
        if (sortOrder === 'asc') return a[sortColumn] > b[sortColumn] ? 1 : -1;
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
    });

    const indexOfLastNovel = currentPage * novelsPerPage;
    const indexOfFirstNovel = indexOfLastNovel - novelsPerPage;
    const currentNovels = sortedNovels.slice(
        indexOfFirstNovel,
        indexOfLastNovel,
    );

    const totalPages = Math.ceil(sortedNovels.length / novelsPerPage);

    if (loading)
        return <div className="text-center text-blue-500">Loading...</div>;
    if (error)
        return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div>
            <section className="bg-sky-400 rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <h4 className="text-[18px] text-purple-700 mb-3">Novel</h4>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search novels..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full max-w-md"
                    />
                </div>

                <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                    <table className="min-w-[900px] w-full border-collapse text-zinc-900">
                        <thead className="bg-slate-400 text-left text-[17px]">
                            <tr>
                                {TABLE_HEADS.map(({ label, key }, index) => (
                                    <th
                                        key={index}
                                        className={`px-3 py-3 ${
                                            key ? 'cursor-pointer' : ''
                                        }`}
                                        onClick={
                                            key
                                                ? () => handleSort(key)
                                                : undefined
                                        }
                                    >
                                        {label}{' '}
                                        {key &&
                                            (sortColumn === key
                                                ? sortOrder === 'asc'
                                                    ? '↑'
                                                    : '↓'
                                                : '')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentNovels.length > 0 ? (
                                currentNovels.map((novel) => (
                                    <React.Fragment key={novel.idNovel}>
                                        <tr
                                            className="cursor-pointer bg-gray-100 hover:bg-gray-200"
                                            onClick={() =>
                                                toggleContent(novel.idNovel)
                                            }
                                        >
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
                                                {novel.statusNovel}
                                            </td>
                                            <td className="px-3 py-3">
                                                <button
                                                    className="text-red-500 hover:underline"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Xóa novel (chưa xử lý)
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Hiển thị ViewChapters chỉ khi mở dòng */}
                                        {openedId === novel.idNovel && (
                                            <tr>
                                                <td
                                                    colSpan={TABLE_HEADS.length}
                                                    className="bg-white px-3 py-3"
                                                >
                                                    <ViewChapters
                                                        idNovel={openedId}
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={TABLE_HEADS.length}
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
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="px-4 py-2 border rounded bg-gray-200"
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-4 py-2 border rounded bg-gray-200"
                    >
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ProList;
