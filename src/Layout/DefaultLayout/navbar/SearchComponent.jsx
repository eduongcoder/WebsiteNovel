import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';
import { Link } from 'react-router-dom';
const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux store
    const { novels, status } = useSelector((state) => state.novel);

    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

    // Kiểm tra trạng thái loading
    if (status === 'loading') {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium">Loading novel details...</p>
            </div>
        );
    }

    // Kiểm tra nếu không có novel nào
    if (!novels || !Array.isArray(novels)) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium">No novels available.</p>
            </div>
        );
    }

    // Filter novels based on searchTerm
    const filteredNovels = novels.filter((novel) =>
        novel.nameNovel.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="relative">
            <input
                type="text"
                id="search-navbar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                
            />

            {/* Display the matching novels if there is a search term */}
            {searchTerm && (
                <div className="mt-2 max-h-60 overflow-y-auto bg-black shadow-lg absolute w-full rounded-lg z-10">
                    {filteredNovels.length > 0 ? (
                        filteredNovels.map((novel) => (
                            <Link to={`/Customer/:${novel.idNovel}`} className="w-full">
                            <div
                                key={novel.idNovel}
                                className="p-2 cursor-pointer hover:bg-blue-900"
                            >
                                {novel.nameNovel}
                            </div>
                            </Link>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
