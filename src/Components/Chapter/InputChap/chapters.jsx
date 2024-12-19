import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChapters } from '@/Redux/ReduxSlice/chapterSlice';
import { fetchNovelOnlyName } from '@/Redux/ReduxSlice/novelSlice';

const CreateChapterForm = () => {
    const [idNovel, setIdNovel] = useState('');
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
    const [showChapters, setShowChapters] = useState(false);
    const novels = useSelector((state) => state.novel.novels);
    const loading = useSelector((state) => state.novel.loading);
    const error = useSelector((state) => state.novel.error);
    console.log(novels);
    const validateChapterPages = (chapters) => {
        const chapterErrors = [];

        for (let i = 0; i < chapters.length; i++) {
            const { startPage, endPage } = chapters[i];
            const prevChapter = chapters[i - 1] || null;

            // Nếu startPage hoặc endPage không có giá trị
            if (!startPage || !endPage) {
                chapterErrors.push('Vui lòng nhập đầy đủ các trang.');
                continue;
            }

            // Kiểm tra startPage nhỏ hơn endPage
            if (parseInt(startPage, 10) >= parseInt(endPage, 10)) {
                chapterErrors.push(
                    'Trang bắt đầu phải nhỏ hơn trang kết thúc.',
                );
                continue;
            }

            // Kiểm tra ràng buộc giữa chương hiện tại và chương trước đó
            if (
                prevChapter &&
                parseInt(startPage, 10) <= parseInt(prevChapter.endPage, 10)
            ) {
                chapterErrors.push(
                    'Trang bắt đầu của chương này phải lớn hơn trang kết thúc của chương trước.',
                );
                continue;
            }

            // Nếu không có lỗi
            chapterErrors.push(null);
        }

        return chapterErrors;
    };

    const validate = () => {
        const newErrors = {};

        if (!idNovel) newErrors.idNovel = 'Vui lòng xác nhận tiểu thuyết.';
        if (tilteChapters.some((title) => !title)) {
            newErrors.tilteChapters = 'Mỗi chương cần có tiêu đề.';
        }

        const chapterErrors = validateChapterPages(chapterPagesArray);
        if (chapterErrors.some((error) => error)) {
            newErrors.chapterPagesArray = chapterErrors;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const array = chapterPagesArray.flatMap((item) => [
            parseInt(item.startPage, 10),
            parseInt(item.endPage, 10),
        ]);

        const payload = {
            idNovel,
            tilteChapters,
            array,
        };
        try {
            await dispatch(createChapters(payload));
            alert(`Chapters đã tạo  thành công!`);
        } catch (error) {
            console.error('Cập nhật thất bại:', error);
            alert('Có lỗi xảy ra.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto"
        >
            {/* Novel Selection */}
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
                        onChange={(e) => setSelectedidNovel(e.target.value)}
                        value={selectedidNovel}
                        className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    >
                        <option value="">Chọn tiểu thuyết</option>
                        {novels.map((novel) => (
                            <option key={novel.idNovel} value={novel.idNovel}>
                                {novel.nameNovel}
                            </option>
                        ))}
                    </select>
                )}
                <button
                    type="button"
                    onClick={() => {
                        if (!selectedidNovel) {
                            setErrors({
                                idNovel:
                                    'Vui lòng chọn một tiểu thuyết trước khi xác nhận.',
                            });
                            return;
                        }
                        const selectedNovel = novels.find(
                            (novel) => novel.idNovel === selectedidNovel,
                        );

                        if (!selectedNovel) {
                            setErrors({
                                idNovel: 'Không tìm thấy tiểu thuyết đã chọn.',
                            });
                            return;
                        }

                        const { totalChapter } = selectedNovel;

                        if (!totalChapter || totalChapter <= 0) {
                            setErrors({
                                idNovel:
                                    'Tiểu thuyết này không có tổng số trang hợp lệ.',
                            });
                            return;
                        }

                        setIdNovel(selectedidNovel);
                        setErrors((prev) => ({ ...prev, idNovel: '' }));
                        setTitleChapters([...Array(totalChapter).fill('')]);
                        setChapterPagesArray([
                            ...Array(totalChapter).fill({
                                startPage: '',
                                endPage: '',
                            }),
                        ]);

                        // Hiển thị form chương
                        setShowChapters(true);
                    }}
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

            {showChapters &&
                chapterPagesArray.map((item, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-sm font-medium text-blue-500">
                            Tên Chương {index + 1}
                        </label>
                        <input
                            type="text"
                            value={tilteChapters[index]}
                            onChange={(e) => {
                                const newTitles = [...tilteChapters];
                                newTitles[index] = e.target.value;
                                setTitleChapters(newTitles);
                            }}
                            className="mt-1 block w-full p-2 border text-white rounded-md focus:outline-none mb-2"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-400">
                                    Trang Bắt Đầu
                                </label>
                                <input
                                    type="number"
                                    value={item.startPage}
                                    onChange={(e) =>
                                        setChapterPagesArray((prev) =>
                                            prev.map((chapter, i) =>
                                                i === index
                                                    ? {
                                                          ...chapter,
                                                          startPage:
                                                              e.target.value,
                                                      }
                                                    : chapter,
                                            ),
                                        )
                                    }
                                    className="mt-1 block w-full p-2 border text-white rounded-md focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-400">
                                    Trang Kết Thúc
                                </label>
                                <input
                                    type="number"
                                    value={item.endPage}
                                    onChange={(e) =>
                                        setChapterPagesArray((prev) =>
                                            prev.map((chapter, i) =>
                                                i === index
                                                    ? {
                                                          ...chapter,
                                                          endPage:
                                                              e.target.value,
                                                      }
                                                    : chapter,
                                            ),
                                        )
                                    }
                                    className="mt-1 block w-full p-2 border text-white rounded-md focus:outline-none"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                setChapterPagesArray((prev) =>
                                    prev.filter((_, i) => i !== index),
                                )
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Xóa Chương
                        </button>
                        {errors.chapterPagesArray &&
                            errors.chapterPagesArray[index] && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.chapterPagesArray[index]}
                                </p>
                            )}
                    </div>
                ))}

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

{
    /* <button
                type="button"
                onClick={() => {
                    setChapterPagesArray([
                        ...chapterPagesArray,
                        { startPage: '', endPage: '' },
                    ]);
                    setTitleChapters([...tilteChapters, '']);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
                Thêm Chương
            </button> */
}
