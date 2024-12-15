import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelOnlyName } from '@/Redux/ReduxSlice/novelSlice';
import { fetchChapters, updateChapter } from '@/Redux/ReduxSlice/chapterSlice';
import { chapter, novel } from '@/Redux/ReduxSlice/Seletor';

function UpdateChapter() {
    const dispatch = useDispatch();
    const novels = useSelector(novel);
    const chapters = useSelector(chapter);

    const [selectedNovel, setSelectedNovel] = useState('');
    const [updatedChapters, setUpdatedChapters] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    const handleNovelChange = async (e) => {
        const idNovel = e.target.value;
        setSelectedNovel(idNovel);

        if (idNovel) {
            await dispatch(fetchChapters(idNovel));
        }
    };

    // const handleInputChange = (e, idChapter) => {
    //     const { name, value } = e.target;

    //     setUpdatedChapters({
    //         [idChapter]: {
    //             [name]: value,
    //         },
    //     });
    //     setUpdatedChapters(newUpdatedChapters);

    //     // Validate startPage and endPage
    //     if (name === 'startPage' || name === 'endPage') {
    //         validateChapterOrder(idChapter);
    //     }
    // };

    const handleInputChange = (e, idChapter, otherName, otherPage) => {
        const { name, value } = e.target;
        const newUpdatedChapters = {
            ...updatedChapters,
            [idChapter]: {
                ...updatedChapters[idChapter],
                [name]: value,
                [otherName]: otherPage,
            },
        };

        // Cập nhật updatedChapters
        setUpdatedChapters(newUpdatedChapters);

        // Gọi validate với giá trị mới
        if (name === 'startPage' || name === 'endPage') {
            validateChapterOrder(idChapter, newUpdatedChapters); // Truyền giá trị mới
        }
    };

    const validateChapterOrder = (idChapter, updatedChapters) => {
        // Lấy thông tin chương hiện tại từ updatedChapters
        const updatedChapter = updatedChapters[idChapter];

        // Tìm chỉ số chương trong danh sách chapters
        const chapterIndex = chapters.findIndex(
            (chapter) => chapter.idChapter === idChapter,
        );

        // Lấy chương trước và chương sau
        const previousChapter = chapters[chapterIndex - 1];
        const nextChapter = chapters[chapterIndex + 1];

        // Sao chép errors để chỉnh sửa
        let newErrors = { ...errors };

        // Kiểm tra startPage < endPage
        if (updatedChapter.startPage >= updatedChapter.endPage) {
            newErrors[idChapter] = {
                ...newErrors[idChapter],
                pageError: 'Trang bắt đầu phải nhỏ hơn trang kết thúc.',
            };
        } else {
            delete newErrors[idChapter]?.pageError;
        }

        // Kiểm tra thứ tự với chương trước
        if (
            previousChapter &&
            updatedChapter.startPage <= previousChapter.endPage
        ) {
            newErrors[idChapter] = {
                ...newErrors[idChapter],
                orderError:
                    'Trang bắt đầu của chương này phải lớn hơn trang kết thúc của chương trước.',
            };
        } else {
            delete newErrors[idChapter]?.orderError;
        }

        // Kiểm tra thứ tự với chương sau
        if (nextChapter && updatedChapter.endPage >= nextChapter.startPage) {
            newErrors[idChapter] = {
                ...newErrors[idChapter],
                nextOrderError:
                    'Trang kết thúc của chương này phải nhỏ hơn trang bắt đầu của chương sau.',
            };
        } else {
            delete newErrors[idChapter]?.nextOrderError;
        }

        // Cập nhật lại errors
        setErrors(newErrors);
    };

    const handleUpdateChapter = async (idChapter) => {
        const chapter = chapters.find(
            (chapter) => chapter.idChapter === idChapter,
        );

        if (!chapter) {
            alert('Chương không tồn tại hoặc không có thay đổi.');
            return;
        }

        // Check if there are any validation errors
        if (errors[idChapter] && Object.keys(errors[idChapter]).length > 0) {
            alert('Vui lòng sửa lỗi trước khi cập nhật.');
            return;
        }

        const updatedChapter = updatedChapters[idChapter];
        const formData = new FormData();
        formData.append('idChapter', chapter.idChapter);
        formData.append('idNovel', chapter.idNovel);
        formData.append(
            'titleChapter',
            updatedChapter.titleChapter || chapter.titleChapter,
        );
        formData.append(
            'startPage',
            updatedChapter.startPage || chapter.startPage,
        );
        formData.append('endPage', updatedChapter.endPage || chapter.endPage);
        formData.append('contentChapter', ''); // Empty when updating

        try {
            await dispatch(updateChapter(formData));
            alert(`Chapter ${chapter.titleChapter} đã cập nhật thành công!`);
            setUpdatedChapters((prevState) => {
                const newState = { ...prevState };
                delete newState[idChapter];
                return newState;
            });
        } catch (error) {
            console.error('Cập nhật thất bại:', error);
            alert('Có lỗi xảy ra.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Update Chapters
            </h2>

            <div className="mb-4">
                <label className="block text-lg text-gray-700 mb-2">
                    Chọn tiểu thuyết
                </label>
                <select
                    onChange={handleNovelChange}
                    defaultValue={selectedNovel}
                    className="block w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Chọn tiểu thuyết</option>
                    {novels.map((novel) => (
                        <option key={novel.idNovel} value={novel.idNovel}>
                            {novel.nameNovel}
                        </option>
                    ))}
                </select>
            </div>

            {chapters.length > 0 ? (
                <div className="space-y-4">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.idChapter}
                            className="p-4 border rounded-lg shadow-sm"
                        >
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Chương: {chapter.titleChapter}
                            </h3>
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Tiêu đề chương
                                </label>
                                <input
                                    type="text"
                                    name="titleChapter"
                                    defaultValue={chapter.titleChapter}
                                    onChange={(e) =>
                                        handleInputChange(e, chapter.idChapter)
                                    }
                                    className="block w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Trang bắt đầu
                                </label>
                                <input
                                    type="number"
                                    name="startPage"
                                    defaultValue={chapter.startPage}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e,
                                            chapter.idChapter,
                                            'endPage',
                                            chapter.endPage,
                                        )
                                    }
                                    className={`block w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        errors[chapter.idChapter]?.pageError
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                {errors[chapter.idChapter]?.pageError && (
                                    <p className="text-red-500 text-sm">
                                        {errors[chapter.idChapter].pageError}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Trang kết thúc
                                </label>
                                <input
                                    type="number"
                                    name="endPage"
                                    defaultValue={chapter.endPage}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e,
                                            chapter.idChapter,
                                            'startPage',
                                            chapter.startPage,
                                        )
                                    }
                                    className={`block w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        errors[chapter.idChapter]?.pageError
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                {errors[chapter.idChapter]?.pageError && (
                                    <p className="text-red-500 text-sm">
                                        {errors[chapter.idChapter].pageError}
                                    </p>
                                )}
                            </div>

                            {errors[chapter.idChapter]?.orderError && (
                                <p className="text-red-500 text-sm">
                                    {errors[chapter.idChapter].orderError}
                                </p>
                            )}
                            {errors[chapter.idChapter]?.nextOrderError && (
                                <p className="text-red-500 text-sm">
                                    {errors[chapter.idChapter].nextOrderError}
                                </p>
                            )}

                            <div className="text-center mt-4">
                                <button
                                    onClick={() =>
                                        handleUpdateChapter(chapter.idChapter)
                                    }
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Cập nhật chương
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : selectedNovel ? (
                <div className="text-center text-lg text-gray-500">
                    Không có chương nào trong tiểu thuyết này.
                </div>
            ) : null}
        </div>
    );
}

export default UpdateChapter;
