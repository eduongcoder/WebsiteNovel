import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createAuthor,
    updateAuthor,
    fetchAuthors,
} from '@/Redux/ReduxSlice/authorSlice';

const InputAuthor = () => {
    const [file, setFile] = useState(null);
    const [descriptionAuthor, setDescriptionAuthor] = useState('');
    const [nameAuthor, setNameAuthor] = useState('');
    const [nationalityauthor, setNationality] = useState('');
    const [dobAuthor, setDobAuthor] = useState('');
    const [dodAuthor, setDodAuthor] = useState('');
    const [selectedAuthorId, setSelectedAuthorId] = useState('');
    const [error, setError] = useState(''); // State lưu lỗi

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

    const isValidDateRange = (dob, dod) => {
        const today = new Date();
        const dobDate = new Date(dob);
        const dodDate = new Date(dod);

        if (!dob || !dod) {
            setError('Ngày sinh và ngày mất không được để trống.');
            return false;
        }

        if (dobDate > dodDate) {
            setError('Ngày sinh phải nhỏ hơn ngày mất.');
            return false;
        }

        if (dobDate > today || dodDate > today) {
            setError('Ngày không được vượt quá ngày hiện tại.');
            return false;
        }

        setError('');
        return true;
    };

    const handleCreate = (e) => {
        e.preventDefault();

        if (!isValidDateRange(dobAuthor, dodAuthor)) {
            return;
        }

        if (!file) {
            alert('Vui lòng chọn file ảnh.');
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
            })
        );
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!isValidDateRange(dobAuthor, dodAuthor)) {
            return;
        }

        const formData = new FormData();

        if (file && typeof file !== 'string') {
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
            new Blob([JSON.stringify(authorData)], { type: 'application/json' })
        );

        dispatch(updateAuthor(formData));
    };

    const handleAuthorChange = (e) => {
        const selectedAuthorId = e.target.value;
        setSelectedAuthorId(selectedAuthorId);

        if (!selectedAuthorId) {
            setNameAuthor('');
            setDescriptionAuthor('');
            setNationality('');
            setDobAuthor('');
            setDodAuthor('');
            setFile(null);
            return;
        }

        const selectedAuthor = authors.find(
            (author) => author.idAuthor === selectedAuthorId
        );

        if (selectedAuthor) {
            setNameAuthor(selectedAuthor.nameAuthor);
            setDescriptionAuthor(selectedAuthor.descriptionAuthor);
            setNationality(selectedAuthor.nationality);
            setDobAuthor(selectedAuthor.dobAuthor);
            setDodAuthor(selectedAuthor.dodAuthor);
            setFile(selectedAuthor.imageUrl || null);
        }
    };

    return (
        <form className="max-w-4xl p-6 mx-auto bg-indigo-800 rounded-md shadow-md dark:bg-gray-800">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <select
                onChange={handleAuthorChange}
                value={selectedAuthorId}
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
                <option value="">Chọn tác giả</option>
                {authors.map((author) => (
                    <option key={author.idAuthor} value={author.idAuthor}>
                        {author.nameAuthor}
                    </option>
                ))}
            </select>

            <input
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={nameAuthor}
                onChange={(e) => setNameAuthor(e.target.value)}
                placeholder="Tên tác giả"
                required
            />
            <textarea
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={descriptionAuthor}
                onChange={(e) => setDescriptionAuthor(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={nationalityauthor}
                onChange={(e) => setNationality(e.target.value)}
                list="nationality-list"
                placeholder="Quốc tịch"
            />
            <datalist id="nationality-list">
                <option value="Vietnamese" />
                <option value="American" />
                <option value="French" />
                <option value="Japanese" />
            </datalist>
            <input
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="date"
                value={dobAuthor}
                onChange={(e) => setDobAuthor(e.target.value)}
                placeholder="Ngày sinh"
            />
            <input
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="date"
                value={dodAuthor}
                onChange={(e) => setDodAuthor(e.target.value)}
                placeholder="Ngày mất"
            />

            <div className="mb-4">
                {file && typeof file === 'string' && (
                    <div>
                        <p className="text-gray-300">Current Image:</p>
                        <img
                            src={file}
                            alt="Author"
                            className="w-32 h-32 object-cover mb-2"
                        />
                    </div>
                )}
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
            </div>

            <div className="flex justify-center mt-4 space-x-4">
                <button
                    type="button"
                    onClick={handleCreate}
                    className="px-8 py-2.5 leading-5 text-white bg-green-600 rounded-md hover:bg-green-500"
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="px-8 py-2.5 leading-5 text-white bg-blue-600 rounded-md hover:bg-blue-500"
                >
                    Update
                </button>
            </div>
        </form>
    );
};

export default InputAuthor;
