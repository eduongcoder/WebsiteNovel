import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';

const NovelCard = ({ idNovel }) => {
    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux store
    const { novels, status } = useSelector((state) => state.novel);
    useEffect(() => {
        const fetchCard = async() => {
           await dispatch(fetchNovels());
        }
        fetchCard(); // Fetch novels on component mounting
    }, []);

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

    // Tìm novel theo id, loại bỏ dấu ":" nếu có
    const novel = novels.find(
        (item) => item.idNovel.toString() === idNovel.replace(':', ''),
    );

    if (!novel) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium">Novel not found.</p>
                
            </div>
        );
    }

    // Hiển thị thông tin của novel
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <img
                        src={novel.imageNovel}
                        alt={novel.nameNovel}
                        className="mt-6 rounded-lg shadow-lg px-6 w-[300px] h-[400px]"
                    />

                    <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
                        <p className="text-5xl font-semibold text-blue-500">
                            “
                        </p>

                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                        {novel.nameNovel}
                        </h1>

                        <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
                            {novel.descriptionNovel}
                        </p>

                        <h3 className="mt-6 text-lg font-medium text-blue-500">
                            Mia Brown
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Marketing Manager at Stech
                        </p>

                        <div className="flex items-center justify-between mt-12 lg:justify-start">
                            <button
                                title="left arrow"
                                className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                            >
                            </button>

                            <button
                                title="right arrow"
                                className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6 hover:bg-gray-100"
                            >
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NovelCard;
