import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';

const CreateChapterForm = () => {
    const [filePdf, setFilePdf] = useState(null);
    const [idNovel, setIdNovel] = useState('');
    const [totalChapter, setTotalChapter] = useState('');
    const [chapterPagesArray, setChapterPagesArray] = useState([{ startPage: '', endPage: '' }]);
    const dispatch = useDispatch();

    // Dispatch fetchNovels để lấy dữ liệu tiểu thuyết
    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

    // Lấy danh sách tiểu thuyết từ Redux store
    const novels = useSelector((state) => state.novel.novels);
    const loading = useSelector((state) => state.novel.loading);
    const error = useSelector((state) => state.novel.error);

    const handleFileChange = (e) => {
        setFilePdf(e.target.files[0]);
    };

    const handleNovelChange = (e) => {
        setIdNovel(e.target.value);
    };

    const handleInputChange = (e, index, field) => {
        const newArray = [...chapterPagesArray];
        newArray[index][field] = e.target.value;
        setChapterPagesArray(newArray);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!filePdf || !idNovel || !totalChapter || !chapterPagesArray.length) {
            alert('Please fill in all fields');
            return;
        }

        const formData = {
            filePdf,
            idNovel,
            totalChapter: parseInt(totalChapter, 10),
            chapterPagesArray,
        };

        dispatch(createChapters(formData));
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">
                    File PDF
                </label>
                <input
                    type="file"
                    id="fileInput"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="mt-1 block w-full p-2 border rounded-md focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="idNovel" className="block text-sm font-medium text-gray-700">
                    Chọn Tiểu Thuyết
                </label>
                <select
                    value={idNovel}
                    onChange={handleNovelChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                >
                    <option value="">Chọn Tiểu Thuyết</option>
                    {novels && novels.length > 0 ? (
                        novels.map((novel) => (
                            <option key={novel.idNovel} value={novel.idNovel}>
                                {novel.nameNovel} {/* Assuming 'title' is the name of the novel */}
                            </option>
                        ))
                    ) : (
                        <option value="">Không có tiểu thuyết nào</option>
                    )}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="totalChapter" className="block text-sm font-medium text-gray-700">
                    Tổng Số Chương
                </label>
                <input
                    type="number"
                    id="totalChapter"
                    value={totalChapter}
                    onChange={(e) => setTotalChapter(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md focus:outline-none"
                />
            </div>

            {chapterPagesArray.map((item, index) => (
                <div key={index} className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Trang Bắt Đầu
                        </label>
                        <input
                            type="number"
                            value={item.startPage}
                            onChange={(e) => handleInputChange(e, index, 'startPage')}
                            className="mt-1 block w-full p-2 border rounded-md focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Trang Kết Thúc
                        </label>
                        <input
                            type="number"
                            value={item.endPage}
                            onChange={(e) => handleInputChange(e, index, 'endPage')}
                            className="mt-1 block w-full p-2 border rounded-md focus:outline-none"
                        />
                    </div>
                </div>
            ))}

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Tạo Chương
            </button>
        </form>
    );
};

export default CreateChapterForm;
