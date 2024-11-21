// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     createAuthor,
//     updateAuthor,
//     fetchAuthors,
// } from '@/Redux/ReduxSlice/authorSlice';

// const InputAuthor = () => {
//     const [file, setFile] = useState(null);
//     const [descriptionAuthor, setDescriptionAuthor] = useState('');
//     const [nameAuthor, setNameAuthor] = useState('');
//     const [nationalityauthor, setNationality] = useState('');
//     const [dobAuthor, setDobAuthor] = useState('');
//     const [dodAuthor, setDodAuthor] = useState('');
//     const [selectedAuthorId, setSelectedAuthorId] = useState(''); // Lưu id tác giả đang chọn

//     const dispatch = useDispatch();

//     // Lấy danh sách tác giả để hiển thị trong combobox
//     useEffect(() => {
//         dispatch(fetchAuthors());
//     }, [dispatch]);

//     const authors = useSelector((state) => state.author.authors); // Giả sử state có danh sách tác giả

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];

//         // Kiểm tra xem có file được chọn không
//         if (selectedFile) {
//             setFile(selectedFile);
//             console.log('Selected file:', selectedFile); // Hiển thị file hiện tại để kiểm tra
//         } else {
//             setFile(null);
//             console.log('No file selected');
//         }
//     };

//     const handleCreate = (e) => {
//         e.preventDefault();

//         // Kiểm tra nếu file hình ảnh không được chọn
//         if (!file) {
//             alert('Please select an image file');
//             return;
//         }

//         // Thực hiện tạo tác giả mới
//         dispatch(
//             createAuthor({
//                 nameAuthor,
//                 descriptionAuthor,
//                 nationality: nationalityauthor,
//                 dobAuthor,
//                 dodAuthor,
//                 file,
//             }),
//         );
//     };

//     const handleUpdate = (e) => {
//         e.preventDefault();

//         // Tạo FormData
//         const formData = new FormData();

//         // Thêm file vào FormData nếu tồn tại
//         if (file) {
//             formData.append('image', file); // Thêm trường 'image' với tệp đã chọn
//         }

//         // Thêm các trường khác vào FormData
//         const authorData = {
//             idAuthor: selectedAuthorId,
//             nameAuthor,
//             descriptionAuthor,
//             nationality: nationalityauthor,
//             dobAuthor,
//             dodAuthor,
//         };

//         formData.append(
//             'request',
//             new Blob([JSON.stringify(authorData)], { type: 'application/json' })
//         );

//         // Gửi FormData thông qua action creator
//         dispatch(updateAuthor(formData));
//     };

//     const handleAuthorChange = (e) => {
//         const selectedAuthorId = e.target.value;
//         setSelectedAuthorId(selectedAuthorId); // Cập nhật ID tác giả đã chọn

//         // Tìm tác giả đã chọn từ danh sách tác giả
//         const selectedAuthor = authors.find(
//             (author) => author.idAuthor === selectedAuthorId,
//         );

//         // Nếu tìm thấy tác giả, điền dữ liệu vào các trường tương ứng
//         if (selectedAuthor) {
//             setNameAuthor(selectedAuthor.nameAuthor);
//             setDescriptionAuthor(selectedAuthor.descriptionAuthor);
//             setNationality(selectedAuthor.nationality);
//             setDobAuthor(selectedAuthor.dobAuthor);
//             setDodAuthor(selectedAuthor.dodAuthor);
//         } else {
//             // Xóa các trường nhập liệu khi không tìm thấy
//             setNameAuthor('');
//             setDescriptionAuthor('');
//             setNationality('');
//             setDobAuthor('');
//             setDodAuthor('');
//         }
//     };

//     return (
//         <form className="max-w-4xl p-6 mx-auto bg-indigo-800 rounded-md shadow-md dark:bg-gray-800">
//             <select
//                 onChange={handleAuthorChange}
//                 value={selectedAuthorId}
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//             >
//                 <option value="">Chọn tác giả</option>
//                 {authors.map((author) => (
//                     <option key={author.idAuthor} value={author.idAuthor}>
//                         {author.nameAuthor}
//                     </option>
//                 ))}
//             </select>

//             <input
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//                 type="text"
//                 value={nameAuthor}
//                 onChange={(e) => setNameAuthor(e.target.value)}
//                 placeholder="Tên tác giả"
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
//                 value={nationalityauthor}
//                 onChange={(e) => setNationality(e.target.value)}
//                 placeholder="Quốc tịch"
//             />
//             <input
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//                 type="date"
//                 value={dobAuthor}
//                 onChange={(e) => setDobAuthor(e.target.value)}
//                 placeholder="Ngày sinh"
//             />
//             <input
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//                 type="date"
//                 value={dodAuthor}
//                 onChange={(e) => setDodAuthor(e.target.value)}
//                 placeholder="Ngày mất"
//             />
//             <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//             />
//             <div className="flex space-x-4">
//                 <button
//                     type="button"
//                     onClick={handleCreate}
//                     className="px-8 py-2.5 leading-5 text-white bg-green-600 rounded-md hover:bg-green-500"
//                 >
//                     Create
//                 </button>
//                 <button
//                     type="button"
//                     onClick={handleUpdate}
//                     className="px-8 py-2.5 leading-5 text-white bg-blue-600 rounded-md hover:bg-blue-500"
//                 >
//                     Update
//                 </button>
//             </div>
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
} from '@/Redux/ReduxSlice/authorSlice';
import DateAuthor from '../ActionAuthors';

const InputAuthor = () => {
    const [file, setFile] = useState(null);
    const [descriptionAuthor, setDescriptionAuthor] = useState('');
    const [nameAuthor, setNameAuthor] = useState('');
    const [nationalityauthor, setNationality] = useState('');
    const [dobAuthor, setDobAuthor] = useState('');
    const [dodAuthor, setDodAuthor] = useState('');
    const [selectedAuthorId, setSelectedAuthorId] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    const authors = useSelector((state) => state.author.authors);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleDateChange = (startDate, endDate) => {
        setDobAuthor(startDate);
        setDodAuthor(endDate);
    };

    const handleCreate = (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select an image file');
            return;
        }

        dispatch(
            createAuthor({
                nameAuthor,
                descriptionAuthor,
                nationality: nationalityauthor,
                dobAuthor,
                dodAuthor,
                file,
            }),
        );
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) {
            formData.append('image', file);
        }

        const authorData = {
            idAuthor: selectedAuthorId,
            nameAuthor,
            descriptionAuthor,
            nationality: nationalityauthor,
            dobAuthor,
            dodAuthor,
        };

        formData.append(
            'request',
            new Blob([JSON.stringify(authorData)], {
                type: 'application/json',
            }),
        );

        dispatch(updateAuthor(formData));
    };

    const handleAuthorChange = (e) => {
        const selectedAuthorId = e.target.value;
        setSelectedAuthorId(selectedAuthorId);

        const selectedAuthor = authors.find(
            (author) => author.idAuthor === selectedAuthorId,
        );

        if (selectedAuthor) {
            setNameAuthor(selectedAuthor.nameAuthor);
            setDescriptionAuthor(selectedAuthor.descriptionAuthor);
            setNationality(selectedAuthor.nationality);
            setDobAuthor(selectedAuthor.dobAuthor);
            setDodAuthor(selectedAuthor.dodAuthor);
        } else {
            setNameAuthor('');
            setDescriptionAuthor('');
            setNationality('');
            setDobAuthor('');
            setDodAuthor('');
        }
    };

    return (
        <form className="max-w-4xl p-6 mx-auto bg-indigo-800 rounded-md shadow-md">
            <select
                onChange={handleAuthorChange}
                value={selectedAuthorId}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
            >
                <option value="">Chọn tác giả</option>
                {authors.map((author) => (
                    <option key={author.idAuthor} value={author.idAuthor}>
                        {author.nameAuthor}
                    </option>
                ))}
            </select>

            <input
                type="text"
                value={nameAuthor}
                onChange={(e) => setNameAuthor(e.target.value)}
                placeholder="Tên tác giả"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
            />

            <textarea
                value={descriptionAuthor}
                onChange={(e) => setDescriptionAuthor(e.target.value)}
                placeholder="Description"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
            />

            <input
                type="text"
                value={nationalityauthor}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="Quốc tịch"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
            />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">
                    Select Author's Life Span
                </h1>
                <DateAuthor
                    initialStartDate={dobAuthor || '2024-01-01'}
                    initialEndDate={dodAuthor || '2024-12-31'}
                    onDateChange={handleDateChange}
                />
                <div className="mt-4">
                    <p>
                        <strong>Date of Birth (DOB):</strong>{' '}
                        {dobAuthor || 'Not selected'}
                    </p>
                    <p>
                        <strong>Date of Death (DOD):</strong>{' '}
                        {dodAuthor || 'Not selected'}
                    </p>
                </div>
            </div>

            <input
                type="file"
                onChange={handleFileChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
            />

            <div className="flex space-x-4 mt-4">
                <button
                    type="button"
                    onClick={handleCreate}
                    className="px-8 py-2.5 text-white bg-green-600 rounded-md hover:bg-green-500"
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="px-8 py-2.5 text-white bg-blue-600 rounded-md hover:bg-blue-500"
                >
                    Update
                </button>
            </div>
        </form>
    );
};

export default InputAuthor;
