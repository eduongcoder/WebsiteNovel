import React, { useState } from 'react';
import { createNovel } from '@/Redux/ReduxSlice/novelSlice';
import { useDispatch } from 'react-redux';

const NovelForm = () => {
    const [file, setFile] = useState(null); // Tệp ảnh
    const [filePdf, setFilePdf] = useState(null); // Tệp PDF
    const [nameNovel, setNameNovel] = useState('');
    const [descriptionNovel, setDescriptionNovel] = useState('');
    const [statusNovel, setStatusNovel] = useState('');
    const [totalChapter, setTotalChapter] = useState(0); // Tổng số chương
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePdfChange = (e) => {
        setFilePdf(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Kiểm tra các trường bắt buộc
        if (!file || !filePdf || !nameNovel || !descriptionNovel || !statusNovel || totalChapter <= 0) {
            alert('Vui lòng điền đầy đủ thông tin và đính kèm tệp.');
            return;
        }
    
        // Tạo FormData để gửi dữ liệu
        const formData = new FormData();
        formData.append('image', file, file.name); // Sử dụng 'image' theo yêu cầu API
        formData.append('originalNovel', filePdf, filePdf.name); // Tệp PDF
    
        // Tạo object JSON
        const payload = {
            nameNovel,
            descriptionNovel,
            statusNovel,
            totalChapter: parseInt(totalChapter, 10),
        };
    
        // Thêm object JSON vào FormData
        formData.append(
            'request',
            new Blob([JSON.stringify(payload)], { type: 'application/json' })
        );
    
        // Gửi dữ liệu qua Redux
        dispatch(createNovel(formData));
    };
    

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Image
            </label>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload PDF
            </label>
            <input
                type="file"
                onChange={handlePdfChange}
                accept="application/pdf"
                required
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />

            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={nameNovel}
                onChange={(e) => setNameNovel(e.target.value)}
                placeholder="Novel Name"
                required
            />
            <textarea
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={descriptionNovel}
                onChange={(e) => setDescriptionNovel(e.target.value)}
                placeholder="Description"
                required
            />
            <select
                className="block px-8 py-2.5 mt-2 leading-5 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={statusNovel}
                onChange={(e) => setStatusNovel(e.target.value)}
                required
            >
                <option value="" disabled>Select Status</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CONTINUE">CONTINUE</option>
                <option value="DROP">DROP</option>
            </select>
            <input
                type="number"
                value={totalChapter}
                onChange={(e) => setTotalChapter(e.target.value)}
                placeholder="Total Chapters"
                min="1"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
            <button
                type="submit"
                className="px-8 py-2.5 mt-4 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Submit
            </button>
        </form>
    );
};

export default NovelForm;
