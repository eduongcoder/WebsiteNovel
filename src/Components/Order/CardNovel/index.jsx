import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CardNovel() {
    const [novels, setNovels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await axios.get('http://26.232.136.42:8080/api/novel/getNovelsNoChapter');
                setNovels(response.data.result);
            } catch (error) {
                setError('Lỗi khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchNovels();
    }, []);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="grid grid-cols-2 mb-4 md:grid-cols-3 gap-4"> 
            {novels.map((novel) => (
                <div
                    key={novel.idNovel}
                    className=" h-auto max-w-full  flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-400px" // Đặt chiều cao là 400px
                    style={{ height: '400px' }}                >
                    <img
                         className="rounded-t-lg h-3/5 w-full object-cover" 
                        src={novel.imageNovel}
                        alt={`Novel ${novel.idNovel}`}
                    />
                    <div className="px-5 pb-5 flex flex-col flex-grow">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {novel.nameNovel}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {novel.descriptionNovel}
                            {}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                Chapter 100
                            </span>
                            <a
                                href="#"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Đọc thêm
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardNovel;
