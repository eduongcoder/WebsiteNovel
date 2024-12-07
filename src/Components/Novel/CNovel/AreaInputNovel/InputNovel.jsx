import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createNovel,
    fetchNovels,
    updateNovel,
} from '@/Redux/ReduxSlice/novelSlice';

const NovelForm = () => {
    const [file, setFile] = useState(null); // Image file
    const [filePdf, setFilePdf] = useState(null); // PDF file
    const [nameNovel, setNameNovel] = useState('');
    const [descriptionNovel, setDescriptionNovel] = useState('');
    const [statusNovel, setStatusNovel] = useState('');
    const [totalChapter, setTotalChapter] = useState(0);
    const [selectedNovelId, setSelectedNovelId] = useState('');
    const [originalNovel, setOriginalNovel] = useState(''); // State for originalNovel

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

    const novels = useSelector((state) => state.novel.novels);

    const handleFileChange = (e) => {
        setFile(e.target.files[0] || null);
    };

    const handlePdfChange = (e) => {
        setFilePdf(e.target.files[0] || null);
    };

    const handleNovelChange = (e) => {
        const novelId = e.target.value;
        setSelectedNovelId(novelId);

        if (novelId) {
            const selectedNovel = novels.find(
                (novel) => novel.idNovel === novelId,
            );
            if (selectedNovel) {
                setNameNovel(selectedNovel.nameNovel);
                setDescriptionNovel(selectedNovel.descriptionNovel);
                setStatusNovel(selectedNovel.statusNovel);
                setTotalChapter(selectedNovel.totalChapter);
                // Optionally set `file` and `filePdf` if you have URL references
            }
        } else {
            // Clear form fields if no novel is selected
            setNameNovel('');
            setDescriptionNovel('');
            setStatusNovel('');
            setTotalChapter(0);
            setFile(null);
            setFilePdf(null);
        }
    };

    const validateForm = () => {
        if (
            !file ||
            !filePdf ||
            !nameNovel ||
            !descriptionNovel ||
            !statusNovel ||
            totalChapter <= 0
        ) {
            alert('Please fill in all required fields and attach files.');
            return false;
        }
        return true;
    };

    const handleOriginalNovelChange = (e) => {
        setOriginalNovel(e.target.value);
    };

    const logFormData = (formData) => {
        // Duyệt qua tất cả các entry trong FormData và log chúng
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    };

    const prepareFormData = () => {
        const formData = new FormData();
        formData.append('image', file, file.name);
        formData.append('originalFile', filePdf, filePdf.name);

        // Nếu có giá trị trong originalNovel
        originalNovelValues.forEach((novel) => {
            formData.append('originalNovel[]', novel); // Thêm mỗi phần tử vào FormData
        });

        // Payload của bạn
        const payload = {
            idNovel: selectedNovelId || '', // Nếu chưa có ID, hãy để trống hoặc thêm giá trị mặc định
            nameNovel,
            descriptionNovel,
            statusNovel,
            totalChapter: parseInt(totalChapter, 10),
            originalNovel: originalNovelValues, // Truyền dữ liệu hợp lệ
        };
        console.log(' gia tri payload:', payload);
        // Thêm request dưới dạng Blob
        formData.append(
            'request',
            new Blob([JSON.stringify(payload)], { type: 'application/json' }),
        );

        console.log('Prepared FormData:', formData);

        return formData;
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(createNovel(payload)); // Gửi yêu cầu API để tạo tiểu thuyết mới
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!selectedNovelId) {
            alert('Please select a novel to update.');
            return;
        }

        if (!validateForm()) return;

        const formData = prepareFormData();
        dispatch(updateNovel(formData)); // Gửi yêu cầu API để cập nhật tiểu thuyết
    };

    return (
        <form className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <select
                onChange={handleNovelChange}
                value={selectedNovelId}
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
                <option value="">Select Novel</option>
                {novels.map((novel) => (
                    <option key={novel.idNovel} value={novel.idNovel}>
                        {novel.nameNovel}
                    </option>
                ))}
            </select>

            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Image
            </label>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload PDF
            </label>
            <input
                type="file"
                onChange={handlePdfChange}
                accept="application/pdf"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Original Novel (comma-separated)
            </label>
            <input
                type="text"
                value={originalNovel}
                onChange={handleOriginalNovelChange}
                placeholder="e.g., Novel 1, Novel 2"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />

            <input
                type="text"
                value={nameNovel}
                onChange={(e) => setNameNovel(e.target.value)}
                placeholder="Novel Name"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />

            <textarea
                value={descriptionNovel}
                onChange={(e) => setDescriptionNovel(e.target.value)}
                placeholder="Description"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />

            <select
                value={statusNovel}
                onChange={(e) => setStatusNovel(e.target.value)}
                className="block px-8 py-2.5 mt-2 leading-5 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
                <option value="" disabled>
                    Select Status
                </option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CONTINUE">CONTINUE</option>
                <option value="DROP">DROP</option>
            </select>

            <input
                type="number"
                value={totalChapter}
                onChange={(e) => setTotalChapter(e.target.value)}
                placeholder="Total Chapters"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />

            <div className="flex justify-between gap-4">
                <button
                    onClick={handleCreate}
                    className="block w-full px-8 py-2.5 mt-2 text-white bg-blue-600 border border-transparent rounded-md dark:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Create Novel
                </button>
                <button
                    onClick={handleUpdate}
                    className="block w-full px-8 py-2.5 mt-2 text-white bg-yellow-600 border border-transparent rounded-md dark:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                    Update Novel
                </button>
            </div>
        </form>
    );
};

export default NovelForm;
