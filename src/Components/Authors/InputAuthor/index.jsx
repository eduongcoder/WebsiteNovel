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
        const inauthor = async () => {
            try {
                dispatch(fetchAuthors());
            } catch (error) {
                console.error(' inauthor' + error);
            }
        };
        inauthor();
    }, []);

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

        const isDefaultDate = (date) =>
            date.getTime() === new Date('').getTime();

        if (dodDate && isDefaultDate(dodDate)) {
            if (dobDate > dodDate) {
                setError('Ngày sinh phải nhỏ hơn ngày mất.');
                return false;
            }
        }

        if (dobDate > today || dodDate > today) {
            setError('Ngày không được vượt quá ngày hiện tại.');
            return false;
        }

        setError('');
        return true;
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!isValidDateRange(dobAuthor, dodAuthor)) {
            return;
        }

        // if (!file) {
        //     alert('Vui lòng chọn file ảnh.');
        //     return;
        // }
        try {
            await dispatch(
                createAuthor({
                    nameAuthor,
                    descriptionAuthor,
                    nationality: nationalityauthor,
                    dobAuthor,
                    dodAuthor,
                    file,
                }),
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (e) => {
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
            new Blob([JSON.stringify(authorData)], {
                type: 'application/json',
            }),
        );
        try {
            await dispatch(updateAuthor(formData));
        } catch (error) {
            console.error('Error updating');
        }
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
            (author) => author.idAuthor === selectedAuthorId,
        );

        if (selectedAuthor) {
            setNameAuthor(selectedAuthor.nameAuthor);
            setDescriptionAuthor(selectedAuthor.descriptionAuthor);
            setNationality(selectedAuthor.nationality);
            console.log('dob', selectedAuthor.dobAuthor);
            console.log('dod', selectedAuthor.dodAuthor);
            // setDobAuthor(selectedAuthor.dobAuthor);
            try {
                if (selectedAuthor.dobAuthor) {
                    const [day, month, year] =
                        selectedAuthor.dobAuthor.split('/'); // Tách ngày, tháng, năm
                    const formattedDate = `${year}-${month.padStart(
                        2,
                        '0',
                    )}-${day.padStart(2, '0')}`; // Định dạng yyyy-MM-dd
                    setDobAuthor(formattedDate);
                }
            } catch (error) {
                console.error('Invalid date format:', error);
            }

            try {
                if (selectedAuthor.dodAuthor) {
                    const [day, month, year] =
                        selectedAuthor.dodAuthor.split('/'); // Tách ngày, tháng, năm
                    const formattedDate = `${year}-${month.padStart(
                        2,
                        '0',
                    )}-${day.padStart(2, '0')}`; // Định dạng yyyy-MM-dd
                    setDodAuthor(formattedDate);
                }
            } catch (error) {
                console.error('Invalid date format:', error);
            }
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
            <p>Tên tác giả</p>
            <input
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={nameAuthor}
                onChange={(e) => setNameAuthor(e.target.value)}
                placeholder="Tên tác giả"
                required
            />
            <p>Thông tin tác giả </p>
            <textarea
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                value={descriptionAuthor}
                onChange={(e) => setDescriptionAuthor(e.target.value)}
                placeholder="Description"
                required
            />
            <p>Quốc tịch </p>
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
            <p>ngày sinh tác giả </p>
            <input
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="date"
                value={dobAuthor}
                onChange={(e) => setDobAuthor(e.target.value)}
                placeholder="Ngày sinh"
            />
            <p>ngày mất tác giả </p>
            <input
                className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="date"
                value={dodAuthor}
                onChange={(e) => setDodAuthor(e.target.value)}
                placeholder="Ngày mất"
            />
            <p>ảnh tác giả </p>
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
