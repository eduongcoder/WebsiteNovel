import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InputCategory = ({
    createCategoryAction,
    updateCategoryAction,
    fetchCategoriesAction,
}) => {
    const [idCategory, setIdCategory] = useState('');
    const [nameCategory, setNameCategory] = useState('');
    const dispatch = useDispatch();

    // Lấy danh sách danh mục từ Redux store
    useEffect(() => {
        dispatch(fetchCategoriesAction());
    }, [dispatch, fetchCategoriesAction]);

    const categories = useSelector((state) => state.category.categories);
    const loading = useSelector((state) => state.category.loading);
    const error = useSelector((state) => state.category.error);

    // Hàm xử lý khi chọn danh mục
    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setIdCategory(selectedCategoryId);

        const selectedCategory = categories.find(
            (category) => category.idCategory === selectedCategoryId,
        );

        if (selectedCategory) {
            setNameCategory(selectedCategory.nameCategory);
        } else {
            setNameCategory('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (idCategory) {
            dispatch(
                updateCategoryAction({
                    idCategory,
                    updatedCategory: { nameCategory },
                }),
            );
        } else {
            // Nếu chưa có idCategory, thực hiện tạo mới
            dispatch(createCategoryAction({ nameCategory }));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-cyan-600 rounded-md shadow-md dark:bg-gray-800"
        >
            {error && <div className="text-blue-500">{error}</div>}

            <select
                value={idCategory}
                onChange={handleCategoryChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
                <option value="">Chọn thể loại</option>
                {categories.map((category) => (
                    <option
                        key={category.idCategory}
                        value={category.idCategory}
                    >
                        {category.nameCategory}
                    </option>
                ))}
            </select>

            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
                placeholder="Category Name"
                required
            />

            <button
                type="submit"
                className="px-4 py-2 mt-2 leading-5 text-white bg-blue-700 rounded-md hover:bg-rose-600"
                disabled={loading}
            >
                {loading
                    ? 'Đang xử lý...'
                    : idCategory
                    ? 'Cập nhật danh mục'
                    : 'Tạo danh mục'}
            </button>
        </form>
    );
};

export default InputCategory;
