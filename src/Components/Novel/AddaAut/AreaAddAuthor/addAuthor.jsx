import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelOnlyName, addAuthor } from '@/Redux/ReduxSlice/novelSlice';
import { fetchAuthors } from '@/Redux/ReduxSlice/authorSlice';

function AddAuthor() {
    const dispatch = useDispatch();

    const [idAuthor, setIdAuthor] = useState('');
    const [idNovel, setIdNovel] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { authors } = useSelector((state) => state.author);
    const novels = useSelector((state) => state.novel.novels);

    useEffect(() => {
        dispatch(fetchAuthors());
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    const handleAddAuthor = async () => {
        console.log(idAuthor, idNovel);
        if (idAuthor && idNovel) {
            setIsLoading(true);
            setMessage('');
            try {
                await dispatch(addAuthor({ idAuthor, idNovel })).unwrap();
                setMessage(' Failed to add author. Please try again. ');
                setIdAuthor('');
                setIdNovel('');
            } catch (error) {
                setMessage('Author added successfully!');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setMessage('Please select both an author and a novel.');
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Add Author to Novel
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="author"
                    className="block text-gray-600 font-medium mb-2"
                >
                    Author
                </label>
                <select
                    id="author"
                    value={idAuthor}
                    onChange={(e) => setIdAuthor(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select Author</option>
                    {authors.map((author) => (
                        <option key={author.idAuthor} value={author.idAuthor}>
                            {author.nameAuthor}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label
                    htmlFor="novel"
                    className="block text-gray-600 font-medium mb-2"
                >
                    Novel
                </label>
                <select
                    id="novel"
                    value={idNovel}
                    onChange={(e) => setIdNovel(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select Novel</option>
                    {novels.map((novel) => (
                        <option key={novel.idNovel} value={novel.idNovel}>
                            {novel.nameNovel}
                        </option>
                    ))}
                </select>
            </div>

            {message && (
                <p
                    className={`text-center mb-4 ${
                        message.includes('successfully')
                            ? 'text-green-500'
                            : 'text-red-500'
                    }`}
                >
                    {message}
                </p>
            )}

            <button
                onClick={handleAddAuthor}
                disabled={isLoading}
                className={`w-full py-3 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 ${
                    isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                }`}
            >
                {isLoading ? 'Adding...' : 'Add Author'}
            </button>
        </div>
    );
}

export default AddAuthor;
