import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAuthor } from '@/Redux/ReduxSlice/authorSlice';

const InputAuthor = () => {
    const [idAuthor, setIdAuthor] = useState('');
    const [descriptionAuthor, setDescriptionAuthor] = useState('');
    const [nameAuthor, setNameAuthor] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the createAuthor thunk action with the input data
        dispatch(createAuthor({ idAuthor, nameAuthor, descriptionAuthor }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={idAuthor}
                onChange={(e) => setIdAuthor(e.target.value)}
                placeholder="Author ID"
                required
            />

            <textarea
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={descriptionAuthor}
                onChange={(e) => setDescriptionAuthor(e.target.value)}
                placeholder="Description"
                required
            />
            
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={nameAuthor}
                onChange={(e) => setNameAuthor(e.target.value)}
                placeholder="Author Name"
                required
            />

            <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
            >
                Submit
            </button>
        </form>
    );
};

export default InputAuthor;
