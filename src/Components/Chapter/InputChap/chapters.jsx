import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChapters, fetchChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { fetchNovelOnlyName } from '@/Redux/ReduxSlice/novelSlice';

const CreateChapterForm = () => {
    const [filePdf, setFilePdf] = useState(null);
    const [idNovel, setIdNovel] = useState('');
    const [totalChapter, setTotalChapter] = useState('');
    const [chapterPagesArray, setChapterPagesArray] = useState([
        { startPage: '', endPage: '' },
    ]);
    const dispatch = useDispatch();

    // Fetch novels on component mount
    useEffect(() => {
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    useEffect(() => {
        // Fetch chapters when idNovel changes
        if (idNovel) {
            dispatch(fetchChapters(idNovel));
        }
    }, [dispatch, idNovel]);

    // Retrieve novels data from Redux store
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

    const handleAddChapterPage = () => {
        setChapterPagesArray([
            ...chapterPagesArray,
            { startPage: '', endPage: '' },
        ]);
    };
    const { chapters } = useSelector((state) => state.chapter);
    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra các trường bắt buộc
        if (
            !filePdf ||
            !idNovel ||
            !totalChapter ||
            chapterPagesArray.some((item) => !item.startPage || !item.endPage)
        ) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Tạo FormData để gửi dữ liệu
        const formData = new FormData();

        // Thêm tệp PDF vào FormData
        formData.append('filePdf', filePdf, filePdf.name);

        // Tạo object JSON cho các thông tin khác
        const payload = {
            idNovel,
            totalChapter: parseInt(totalChapter, 10), // Chuyển đổi thành số nguyên
            array: chapterPagesArray.flatMap((item) => [
                item.startPage,
                item.endPage,
            ]), // Chuyển đổi thành mảng các số nguyên
        };

        // Kiểm tra kiểu dữ liệu của payload.array
        console.log(Array.isArray(payload.array)); // Kiểm tra xem payload.array có phải là mảng không

        // Thêm đối tượng JSON vào FormData
        formData.append(
            'request',
            new Blob([JSON.stringify(payload)], { type: 'application/json' }),
        );

        // Dispatch hành động tạo chương với FormData
        dispatch(createChapters(formData));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto"
        >
            <div className="mb-4">
                <label
                    htmlFor="fileInput"
                    className="block text-sm font-medium text-gray-700"
                >
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

            {/* <div className="mb-4">
                <label
                    htmlFor="idNovel"
                    className="block text-sm font-medium text-gray-700"
                >
                    Chọn Tiểu Thuyết
                </label>
                <select
                    value={idNovel}
                    onChange={handleNovelChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40"
                >
                    <option value="">Chọn Tiểu Thuyết</option>
                    {loading ? (
                        <option value="">Đang tải...</option>
                    ) : chapters && chapters.length > 0 ? (
                        chapters.map((chapter) => (
                            <option key={chapter.idNovel} value={chapter.idNovel}>
                                {chapter.nameNovel}
                            </option>
                        ))
                    ) : (
                        <option value="">Không có tiểu thuyết nào</option>
                    )}
                </select>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div> */}
            <div className="mb-4">
                <label
                    htmlFor="idNovel"
                    className="block text-sm font-medium text-gray-700"
                >
                    Chọn chương
                </label>
                <select
                    value={idNovel}
                    onChange={handleNovelChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40"
                >
                    <option value="">Chọn chương </option>
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
                <label
                    htmlFor="totalChapter"
                    className="block text-sm font-medium text-gray-700"
                >
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
                            onChange={(e) =>
                                handleInputChange(e, index, 'startPage')
                            }
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
                            onChange={(e) =>
                                handleInputChange(e, index, 'endPage')
                            }
                            className="mt-1 block w-full p-2 border rounded-md focus:outline-none"
                        />
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddChapterPage}
                className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
                Thêm Trang Chương
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
