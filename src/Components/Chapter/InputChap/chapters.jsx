import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChapters, fetchChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { fetchNovelOnlyName } from '@/Redux/ReduxSlice/novelSlice';

const CreateChapterForm = () => {
    const [idNovel, setIdNovel] = useState('');
    const [totalChapter, setTotalChapter] = useState('');
    const [tilteChapters, setTitleChapters] = useState(['']);
    const [chapterPagesArray, setChapterPagesArray] = useState([
        { startPage: '', endPage: '' },
    ]);
    const [selectedidNovel, setSelectedidNovel] = useState('');
    const [errors, setErrors] = useState({});
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

    const validate = () => {
        const newErrors = {};

        // Validate for novel, chapter count, and chapter titles
        if (!idNovel) newErrors.idNovel = 'Vui lòng xác nhận tiểu thuyết.';
        if (!totalChapter)
            newErrors.totalChapter = 'Vui lòng nhập tổng số chương.';
        if (tilteChapters.some((title) => !title))
            newErrors.tilteChapters = 'Mỗi chương cần có tiêu đề.';

        // Validate chapter pages
        for (let i = 0; i < chapterPagesArray.length; i++) {
            const { startPage, endPage } = chapterPagesArray[i];
            if (!startPage || !endPage)
                newErrors.chapterPagesArray = 'Vui lòng nhập đầy đủ các trang.';
            if (parseInt(startPage, 10) >= parseInt(endPage, 10))
                newErrors.chapterPagesArray =
                    'Trang bắt đầu phải nhỏ hơn trang kết thúc.';

            // Check if the next chapter starts after the previous chapter ends
            if (i > 0) {
                const prevChapter = chapterPagesArray[i - 1];
                if (
                    parseInt(startPage, 10) <= parseInt(prevChapter.endPage, 10)
                )
                    newErrors.chapterPagesArray =
                        'Trang bắt đầu của chương này phải lớn hơn trang kết thúc của chương trước.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNovelChange = (e) => {
        setSelectedidNovel(e.target.value);
    };

    const handleConfirmNovel = () => {
        if (!selectedidNovel) {
            setErrors({
                idNovel: 'Vui lòng chọn một tiểu thuyết trước khi xác nhận.',
            });
            return;
        }
        setIdNovel(selectedidNovel);
        setErrors((prev) => ({ ...prev, idNovel: '' })); // Xóa lỗi nếu có
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
        setChapterPagesArray([
            ...chapterPagesArray,
            { startPage: '', endPage: '' },
        ]);
        setTitleChapters([...tilteChapters, '']);
    };

    const handleRemoveChapter = (index) => {
        setChapterPagesArray((prev) => prev.filter((_, i) => i !== index));
        setTitleChapters((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const array = chapterPagesArray.flatMap((item) => [
            parseInt(item.startPage, 10),
            parseInt(item.endPage, 10),
        ]);

        const payload = {
            idNovel,
            totalChapter: parseInt(totalChapter, 10),
            tilteChapters,
            array,
        };

        const formData = new FormData();
        formData.append(
            'request',
            new Blob([JSON.stringify(payload)], { type: 'application/json' }),
        );

        dispatch(createChapters(formData));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto"
        >
            <div className="mb-4">
                <label
                    htmlFor="idNovel"
                    className="block text-sm font-medium text-gray-700"
                >
                    Chọn Tiểu Thuyết
                </label>
                {loading ? (
                    <p>Đang tải danh sách tiểu thuyết...</p>
                ) : (
                    <select
                        onChange={handleNovelChange}
                        value={selectedidNovel}
                        className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    >
                        <option value="">Chọn tác giả</option>
                        {novels.map((novel) => (
                            <option key={novel.idNovel} value={novel.idNovel}>
                                {novel.nameNovel}
                            </option>
                        ))}
                    </select>
                )}
                <button
                    type="button"
                    onClick={handleConfirmNovel}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Xác Nhận Tiểu Thuyết
                </button>
                {errors.idNovel && (
                    <p className="text-red-500 text-sm mt-2">
                        {errors.idNovel}
                    </p>
                )}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {idNovel && (
                <div className="mb-4">
                    <p>
                        <strong>Tiểu thuyết đã chọn:</strong>{' '}
                        {
                            novels.find((novel) => novel.idNovel === idNovel)
                                ?.nameNovel
                        }
                    </p>
                </div>
            )}

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
                {errors.totalChapter && (
                    <p className="text-red-500 text-sm">
                        {errors.totalChapter}
                    </p>
                )}
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
                    <button
                        type="button"
                        onClick={() => handleRemoveChapter(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        Xóa Chương
                    </button>
                    {errors.chapterPagesArray && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.chapterPagesArray}
                        </p>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={handleAddChapter}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
                Thêm Chương
            </button>

            <div className="mt-6">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200 w-full"
                >
                    Tạo Chương
                </button>
            </div>
        </form>
    );
};

export default CreateChapterForm;
