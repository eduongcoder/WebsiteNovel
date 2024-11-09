import React, { useState } from 'react';
import { createNovel } from '@/Redux/ReduxSlice/novelSlice';
import { useDispatch } from 'react-redux';

const NovelForm = () => {
    const [file, setFile] = useState(null);
    const [name_Novel, setName_Novel] = useState('');
    const [description_Novel, setDescription_Novel] = useState('');
    const [status_Novel, setStatus_Novel] = useState('');
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file');
            return;
        }

        // Dispatch the createNovel thunk action with the form data
        dispatch(createNovel({
            file,
            name_Novel,
            description_Novel,
            status_Novel,
        }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            <input
                type="file"
                onChange={handleFileChange}
                required
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
            
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={name_Novel}
                onChange={(e) => setName_Novel(e.target.value)}
                placeholder="Novel Name"
                required
            />
            <textarea
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={description_Novel}
                onChange={(e) => setDescription_Novel(e.target.value)}
                placeholder="Description"
                required
            />
            <select
                className="block px-8 py-2.5 mt-2 leading-5 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={status_Novel}
                onChange={(e) => setStatus_Novel(e.target.value)}
                required
            >
                <option value="" disabled>Select Status</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CONTINUE">CONTINUE</option>
                <option value="DROP">DROP</option>
            </select>
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
