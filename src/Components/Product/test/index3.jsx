import React, { useState } from 'react';
import axios from 'axios';

const NovelForm = () => {
    const [file, setFile] = useState(null);
    const [id_Novel, setId_Novel] = useState('');
    const [name_Novel, setName_Novel] = useState('');
    const [description_Novel, setDescription_Novel] = useState('');
    const [status_Novel, setStatus_Novel] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', file);
        formData.append(
            'request',
            new Blob(
                [
                    JSON.stringify({
                        id_Novel,
                        name_Novel,
                        description_Novel,
                        status_Novel,
                    }),
                ],
                { type: 'application/json' },
            ),
        );

        try {
            const response = await axios.post(
                'http://26.232.136.42:8080/api/novel/createNovel',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error uploading novel:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            <input type="file" onChange={handleFileChange} required />
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={id_Novel}
                onChange={(e) => setId_Novel(e.target.value)}
                placeholder="Novel ID"
                required
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
                className="block px-8 py-2.5 leading-5 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={status_Novel}
                onChange={(e) => setStatus_Novel(e.target.value)}
                required
            >
                <option value="COMPLETED">COMPLETED</option>
                <option value="CONTINUE">CONTINUE</option>
                <option value="DROP">DROP</option>
            </select>
            <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
            >
                Submit
            </button>
        </form>
    );
};

export default NovelForm;
