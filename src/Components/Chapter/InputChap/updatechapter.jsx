import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelOnlyName } from '@/Redux/ReduxSlice/novelSlice';
import { fetchChapters, updateChapter } from '@/Redux/ReduxSlice/chapterSlice';
import { chapter, novel } from '@/Redux/ReduxSlice/Seletor';

function UpdateChapter() {
    const dispatch = useDispatch();
    const novels = useSelector(novel);
    const chapters = useSelector(chapter);

    // Lưu trạng thái của các chương đã thay đổi
    const [updatedChapters, setUpdatedChapters] = useState([]);
    const [selectedNovel, setSelectedNovel] = useState('');

    useEffect(() => {
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    const handleNovelChange = async (e) => {
        const idNovel = e.target.value;
        setSelectedNovel(idNovel);

        if (idNovel) {
            const response = await dispatch(fetchChapters(idNovel));
            const fetchedChapters = response.payload;

            if (fetchedChapters.length > 0) {
                // Khi tải các chương, lưu lại thông tin đã thay đổi trong state `updatedChapters`
                setUpdatedChapters(fetchedChapters.map(chapter => ({
                    ...chapter,
                    titleChapter: chapter.titleChapter || '',
                    startPage: chapter.startPage || 0,
                    endPage: chapter.endPage || 0,
                    contentChapter: chapter.contentChapter || null,
                })));
            } else {
                setUpdatedChapters([]); // Không có chương nào
            }
        } else {
            setUpdatedChapters([]); // Reset nếu không chọn tiểu thuyết nào
        }
    };

    const handleInputChange = (e, idChapter) => {
        const { name, value } = e.target;

        setUpdatedChapters(prevChapters =>
            prevChapters.map(chapter =>
                chapter.idChapter === idChapter
                    ? { ...chapter, [name]: value }
                    : chapter
            )
        );
    };

    const handleFileChange = (e, idChapter) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedChapters(prevChapters =>
                prevChapters.map(chapter =>
                    chapter.idChapter === idChapter
                        ? { ...chapter, contentChapter: file }
                        : chapter
                )
            );
        }
    };

    const handleUpdateChapter = async (idChapter) => {
        const updatedChapter = updatedChapters.find(
            (chapter) => chapter.idChapter === idChapter
        );

        if (!updatedChapter) {
            console.error('Không tìm thấy chapter cần cập nhật.');
            return;
        }

        const formData = new FormData();
        formData.append('titleChapter', updatedChapter.titleChapter);
        formData.append('startPage', updatedChapter.startPage);
        formData.append('endPage', updatedChapter.endPage);

        if (updatedChapter.contentChapter instanceof File) {
            formData.append('contentChapter', updatedChapter.contentChapter); // Thêm file PDF nếu có
        }

        try {
            await dispatch(updateChapter(formData)); // Thực hiện update
            alert(`Chapter ${updatedChapter.titleChapter} đã được cập nhật thành công!`);
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

            {/* Combobox for selecting novel */}
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

            {/* Chapter details list */}
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
                                    defaultValue={chapter.titleChapter || ''} // Sử dụng defaultValue thay vì value
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
                                        defaultValue={chapter.startPage || 0} // Sử dụng defaultValue thay vì value
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                chapter.idChapter
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
                                        defaultValue={chapter.endPage || 0} // Sử dụng defaultValue thay vì value
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                chapter.idChapter
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
