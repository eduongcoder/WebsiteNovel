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

    const dispatch = useDispatch();
    const { novels, loading, error } = useSelector((state) => state.novel);

    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

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
            }
        } else {
            clearForm();
        }
    };

    const clearForm = () => {
        setNameNovel('');
        setDescriptionNovel('');
        setStatusNovel('');
        setTotalChapter(0);
        setFile(null);
        setFilePdf(null);
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
    const validateupdateForm = () => {
        if (
          
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

    const prepareFormData = () => {
        const formData = new FormData();
        formData.append('image', file); // Đúng tên field mà API yêu cầu
        formData.append('originalNovel', filePdf); // Sửa lại tên đúng theo yêu cầu API

        const payload = {
            idNovel: selectedNovelId || '',
            nameNovel,
            descriptionNovel,
            statusNovel,
            totalChapter: parseInt(totalChapter, 10),
        };

        // Đảm bảo tên `request` phù hợp với API
        formData.append(
            'request',
            new Blob([JSON.stringify(payload)], { type: 'application/json' }),
        );

        // In ra từng phần trong formData
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        return formData;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = prepareFormData();
        try {
            await dispatch(createNovel(formData)).unwrap();
            alert('Novel created successfully!');
            clearForm();
        } catch (error) {
            alert('Failed to create novel. Please try again.');
            console.error(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!selectedNovelId) {
            alert('Please select a novel to update.');
            return;
        }
        if (!validateupdateForm()) return;

        const formData = prepareFormData();

        // Debug: Log all formData content
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        try {
            await dispatch(updateNovel(formData)).unwrap();
            alert('Novel updated successfully!');
        } catch (error) {
            alert('Failed to update novel. Please try again.');
            console.error(error);
        }
    };

    return (
        <form className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            {loading && <p className="text-blue-500">Loading...</p>}
            {error && (
                <p className="text-red-500">Error: {error.message || error}</p>
            )}

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
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
