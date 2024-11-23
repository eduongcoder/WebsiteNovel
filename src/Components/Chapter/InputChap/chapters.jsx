import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChapters, fetchChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { fetchNovelOnlyName } from '@/Redux/ReduxSlice/novelSlice';

const CreateChapterForm = () => {
    const [idNovel, setIdNovel] = useState('');
    const [totalChapter, setTotalChapter] = useState('');
    const [tilteChapters, setTitleChapters] = useState(['']);
    const [chapterPagesArray, setChapterPagesArray] = useState([{ startPage: '', endPage: '' }]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    useEffect(() => {
        if (idNovel) {
            dispatch(fetchChapters(idNovel));
        }
    }, [dispatch, idNovel]);

    const novels = useSelector((state) => state.novel.novels);
    const loading = useSelector((state) => state.novel.loading);
    const error = useSelector((state) => state.novel.error);

    const handleNovelChange = (e) => {
        setIdNovel(e.target.value);
    };

    const handleInputChange = (e, index, field) => {
        const newArray = [...chapterPagesArray];
        newArray[index][field] = e.target.value;
        setChapterPagesArray(newArray);
    };

    const handleTitleChange = (e, index) => {
        const newTitles = [...tilteChapters];
        newTitles[index] = e.target.value;
        setTitleChapters(newTitles);
    };

    const handleAddChapter = () => {
        setChapterPagesArray([...chapterPagesArray, { startPage: '', endPage: '' }]);
        setTitleChapters([...tilteChapters, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (
            !idNovel ||
            !totalChapter ||
            tilteChapters.some((title) => !title) ||
            chapterPagesArray.some((item) => !item.startPage || !item.endPage)
        ) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
    
        // Tạo mảng `array` từ các giá trị trang bắt đầu và kết thúc
        const array = chapterPagesArray.flatMap((item) => [
            parseInt(item.startPage, 10),
            parseInt(item.endPage, 10),
        ]);
    
        // Tạo payload theo định dạng API yêu cầu
        const payload = {
            idNovel,
            totalChapter: parseInt(totalChapter, 10),
            tilteChapters,
            array,
        };
    
        // Tạo FormData và thêm 'request' với payload JSON
        const formData = new FormData();
        formData.append(
            'request',
            new Blob([JSON.stringify(payload)], { type: 'application/json' })
        );
    
        // Gửi FormData qua Redux
        dispatch(createChapters(formData));
    };
    

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="idNovel" className="block text-sm font-medium text-gray-700">
                    Chọn Tiểu Thuyết
                </label>
                <select
                    value={idNovel}
                    onChange={handleNovelChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40"
                >
                    <option value="">Chọn tiểu thuyết</option>
                    {loading ? (
                        <option value="">Đang tải...</option>
                    ) : novels && novels.length > 0 ? (
                        novels.map((novel) => (
                            <option key={novel.idNovel} value={novel.idNovel}>
                                {novel.nameNovel}
                            </option>
                        ))
                    ) : (
                        <option value="">Không có tiểu thuyết nào</option>
                    )}
                </select>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
                <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Tên Chương {index + 1}
                    </label>
                    <input
                        type="text"
                        value={tilteChapters[index]}
                        onChange={(e) => handleTitleChange(e, index)}
                        className="mt-1 block w-full p-2 border rounded-md focus:outline-none mb-2"
                    />
                    <div className="grid grid-cols-2 gap-4">
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
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddChapter}
                className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
                Thêm Chương
            </button>

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
