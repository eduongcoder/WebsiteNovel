// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createCategory } from '@/Redux/ReduxSlice/categorySlice';

// const InputCategory = () => {
//     const [nameCategory, setNameCategory] = useState('');
//     const dispatch = useDispatch();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Dispatch the createCategory thunk action with the input data
//         dispatch(createCategory({ nameCategory }));
//     };
//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
//         >
//             <input
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//                 type="text"
//                 value={nameCategory}
//                 onChange={(e) => setNameCategory(e.target.value)}
//                 placeholder="Category Name"
//                 required
//             />

//             <button
//                 type="submit"
//                 className="px-4 py-2 mt-2 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default InputCategory;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCategory,
    updateCategory,
    fetchCategories,
} from '@/Redux/ReduxSlice/categorySlice';

const InputCategory = () => {
    const [idCategory, setIdCategory] = useState('');
    const [nameCategory, setNameCategory] = useState('');
    const dispatch = useDispatch();

    // Lấy danh sách danh mục từ Redux store
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const categories = useSelector((state) => state.category.categories);

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
            // Nếu có idCategory, thực hiện cập nhật
            dispatch(
                updateCategory({
                    idCategory,
                    updatedCategory: { nameCategory },
                }),
            );
        } else {
            // Nếu chưa có idCategory, thực hiện tạo mới
            dispatch(createCategory({ nameCategory }));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            <select
                value={idCategory}
                onChange={handleCategoryChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                    <option
                        key={category.idCategory}
                        value={category.idCategory}
                    >
                        {category.idCategory}
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
                className="px-4 py-2 mt-2 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
            >
                {idCategory ? 'Cập nhật danh mục' : 'Tạo danh mục'}
            </button>
        </form>
    );
};

export default InputCategory;
