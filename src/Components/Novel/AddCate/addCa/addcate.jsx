import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelOnlyName, addCategory } from '@/Redux/ReduxSlice/novelSlice';
import { fetchCategories } from '@/Redux/ReduxSlice/categorySlice';

function AddCategory() {
    const dispatch = useDispatch();

    const [nameCategory, setNameCategory] = useState('');
    const [idNovel, setIdNovel] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const categories = useSelector((state) => state.category.categories);
    const novels = useSelector((state) => state.novel.novels);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    const handleAddCategory = async () => {
        console.log(nameCategory, idNovel);
        if (nameCategory && idNovel) {
            setIsLoading(true);
            setMessage('');
            try {
                await dispatch(addCategory({ nameCategory, idNovel })).unwrap();
                setMessage('Failed to add category. Please try again.');
                setNameCategory('');
                setIdNovel('');
            } catch (error) {
                setMessage('Category added successfully!');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setMessage('Please select both a category and a novel.');
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Add Category to Novel
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="category"
                    className="block text-gray-600 font-medium mb-2"
                >
                    Category
                </label>
                <select
                    id="category"
                    value={nameCategory}
                    onChange={(e) => setNameCategory(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option
                            key={category.idCategory}
                            value={category.nameCategory}
                        >
                            {category.nameCategory}
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
                <p className="text-center text-red-500 mb-4">{message}</p>
            )}

            <button
                onClick={handleAddCategory}
                disabled={isLoading}
                className={`w-full py-3 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 ${
                    isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                }`}
            >
                {isLoading ? 'Adding...' : 'Add Category'}
            </button>
        </div>
    );
}

export default AddCategory;
