import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelOnlyName } from '@/Redux/ReduxSlice/novelSlice';
import { fetchChapters, updateChapter } from '@/Redux/ReduxSlice/chapterSlice';
import { chapter, novel } from '@/Redux/ReduxSlice/Seletor';

function UpdateChapter() {
    const dispatch = useDispatch();
    const novels = useSelector(novel); // Các tiểu thuyết từ Redux
    const chapters = useSelector(chapter); // Các chương từ Redux

    const [selectedNovel, setSelectedNovel] = useState(''); // Tiểu thuyết được chọn
    const [chaptersState, setChapters] = useState([]); // State lưu trữ các chương

    // Lấy danh sách tiểu thuyết khi component mount
    useEffect(() => {
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    // Xử lý thay đổi tiểu thuyết
    const handleNovelChange = async (e) => {
        const idNovel = e.target.value;
        setSelectedNovel(idNovel);

        if (idNovel) {
            const response = await dispatch(fetchChapters(idNovel));
            const fetchedChapters = response.payload;

            if (fetchedChapters.length > 0) {
                setChapters(fetchedChapters); // Lưu danh sách chương vào state
            } else {
                setChapters([]); // Nếu không có chương nào
            }
        } else {
            setChapters([]); // Reset nếu không chọn tiểu thuyết nào
        }
    };

    // Xử lý thay đổi dữ liệu chương (input fields)
    const handleInputChange = (e, idChapter) => {
        const { name, value } = e.target;
        setChapters((prevChapters) =>
            prevChapters.map((chapter) =>
                chapter.idChapter === idChapter
                    ? { ...chapter, [name]: value } // Cập nhật trường đã thay đổi
                    : chapter,
            ),
        );
    };

    // Xử lý thay đổi file (nội dung chương)
    const handleFileChange = (e, idChapter) => {
        const file = e.target.files[0];
        if (file) {
            setChapters((prevChapters) =>
                prevChapters.map((chapter) =>
                    chapter.idChapter === idChapter
                        ? { ...chapter, contentChapter: file } // Cập nhật file PDF
                        : chapter,
                ),
            );
        }
    };

    // Cập nhật chương
    const handleUpdateChapter = async (idChapter) => {
        const updatedChapter = chaptersState.find(
            (chapter) => chapter.idChapter === idChapter,
        );

        try {
            const formData = new FormData();
            formData.append('titleChapter', updatedChapter.titleChapter);
            formData.append('startPage', updatedChapter.startPage);
            formData.append('endPage', updatedChapter.endPage);

            if (updatedChapter.contentChapter instanceof File) {
                formData.append(
                    'contentChapter',
                    updatedChapter.contentChapter,
                ); // Đính kèm file PDF
            }

            // Thực hiện dispatch cập nhật chương, gửi formData
            await dispatch(updateChapter(formData));
            alert(
                `Chapter ${updatedChapter.titleChapter} đã được cập nhật thành công!`,
            );
        } catch (error) {
            console.error('Lỗi khi cập nhật chương:', error);
            alert('Không thể cập nhật chương. Vui lòng thử lại.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Update Chapters
            </h2>

            {/* Combobox chọn tiểu thuyết */}
            <div className="mb-4">
                <label className="block text-lg text-gray-700 mb-2">
                    Chọn tiểu thuyết
                </label>
                <select
                    onChange={handleNovelChange}
                    value={selectedNovel}
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

            {/* Hiển thị danh sách chương */}
            {chaptersState.length > 0 ? (
                <div className="space-y-4">
                    {chaptersState.map((chapter) => (
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
                                    value={chapter.titleChapter}
                                    onChange={(e) =>
                                        handleInputChange(e, chapter.idChapter)
                                    }
                                    className="block w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">
                                        Trang bắt đầu
                                    </label>
                                    <input
                                        type="number"
                                        name="startPage"
                                        value={chapter.startPage || 0}
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                chapter.idChapter,
                                            )
                                        }
                                        className="block w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">
                                        Trang kết thúc
                                    </label>
                                    <input
                                        type="number"
                                        name="endPage"
                                        value={chapter.endPage || 0}
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                chapter.idChapter,
                                            )
                                        }
                                        className="block w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 mb-1">
                                    Tải lên nội dung (PDF)
                                </label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                        handleFileChange(e, chapter.idChapter)
                                    }
                                    className="block w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
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
