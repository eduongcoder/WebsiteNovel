// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createAuthor } from '@/Redux/ReduxSlice/authorSlice';

// const InputAuthor = () => {
//     const [idAuthor, setIdAuthor] = useState('');
//     const [descriptionAuthor, setDescriptionAuthor] = useState('');
//     const [nameAuthor, setNameAuthor] = useState('');
//     const dispatch = useDispatch();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Dispatch the createAuthor thunk action with the input data
//         dispatch(createAuthor({ idAuthor, nameAuthor, descriptionAuthor }));
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
//         >
//             <input
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//                 type="text"
//                 value={idAuthor}
//                 onChange={(e) => setIdAuthor(e.target.value)}
//                 placeholder="Author ID"
//                 required
//             />

//             <textarea
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//                 value={descriptionAuthor}
//                 onChange={(e) => setDescriptionAuthor(e.target.value)}
//                 placeholder="Description"
//                 required
//             />

//             <input
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//                 type="text"
//                 value={nameAuthor}
//                 onChange={(e) => setNameAuthor(e.target.value)}
//                 placeholder="Author Name"
//                 required
//             />

//             <button
//                 type="submit"
//                 className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default InputAuthor;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createAuthor,
    updateAuthor,
    fetchAuthors,
} from '@/Redux/ReduxSlice/authorSlice'; // Giả sử bạn có action fetchAuthors

const InputAuthor = () => {
    const [idAuthor, setIdAuthor] = useState('');
    const [descriptionAuthor, setDescriptionAuthor] = useState('');
    const [nameAuthor, setNameAuthor] = useState('');
    const dispatch = useDispatch();

    // Lấy danh sách tác giả để hiển thị trong combobox
    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    const authors = useSelector((state) => state.author.authors); // Giả sử state có danh sách tác giả

    const handleSubmit = (e) => {
        e.preventDefault();

        if (idAuthor) {
            // Nếu đã có idAuthor, thực hiện cập nhật tác giả
            dispatch(
                updateAuthor({
                    idAuthor,
                    updatedAuthor: { nameAuthor, descriptionAuthor },
                }),
            );
        } else {
            // Nếu chưa có idAuthor, thực hiện tạo tác giả mới
            dispatch(createAuthor({ nameAuthor, descriptionAuthor }));
        }
    };

    const handleAuthorChange = (e) => {
        const selectedAuthorId = e.target.value; // Lấy id của tác giả được chọn
        setIdAuthor(selectedAuthorId);

        // Tìm tác giả đã chọn từ danh sách tác giả
        const selectedAuthor = authors.find(
            (author) => author.idAuthor === selectedAuthorId,
        );

        // Nếu tìm thấy tác giả, điền dữ liệu vào các trường tương ứng
        if (selectedAuthor) {
            setNameAuthor(selectedAuthor.nameAuthor);
            setDescriptionAuthor(selectedAuthor.descriptionAuthor);
        } else {
            // Nếu không tìm thấy tác giả (ví dụ khi xóa tác giả), xóa các trường nhập liệu
            setNameAuthor('');
            setDescriptionAuthor('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            <select
                value={idAuthor}
                onChange={handleAuthorChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
                <option value="">Chọn tác giả</option>
                {authors.map((author) => (
                    <option key={author.idAuthor} value={author.idAuthor}>
                        {author.idAuthor}
                    </option>
                ))}
            </select>

            <textarea
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={descriptionAuthor}
                onChange={(e) => setDescriptionAuthor(e.target.value)}
                placeholder="Mô tả"
                required
            />

            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={nameAuthor}
                onChange={(e) => setNameAuthor(e.target.value)}
                placeholder="Tên tác giả"
                required
            />

            <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
            >
                {idAuthor ? 'Cập nhật tác giả' : 'Tạo tác giả'}
            </button>
        </form>
    );
};

export default InputAuthor;
