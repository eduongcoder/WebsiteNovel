
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors, deleteAuthor } from '@/Redux/ReduxSlice/authorSlice';

const TABLE_HEADS = [
    'ID Author',
    'Description Author',
    'Name Author',
    'Action',
];

function ListViewAuthors() {
    const dispatch = useDispatch();
    const { authors, loading, error } = useSelector((state) => state.author);

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    const handleDelete = (authorId) => {
        dispatch(deleteAuthor(authorId));
    };

    return (
        <div>
            <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3">
                    <h4 className="text-[18px] text-sky-400">Author List</h4>
                </div>
                <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-track-[var(--scroll-track-bg-color)] scrollbar-thumb-gray-200">
                    <table className="min-w-[900px] w-full border-collapse text-zinc-900">
                        <thead className="text-left text-[17px] bg-slate-400">
                            <tr>
                                {TABLE_HEADS.map((th, index) => (
                                    <th key={index} className="px-3 py-3">
                                        {th}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((author) => (
                                <tr key={author.idAuthor}>
                                    <td className="px-3 py-3">
                                        {author.idAuthor}
                                    </td>
                                    <td className="px-3 py-3">
                                        {author.descriptionAuthor}
                                    </td>
                                    <td className="px-3 py-3">
                                        {author.nameAuthor}
                                    </td>
                                    <td className="px-3 py-3">
                                        <button
                                            onClick={() =>
                                                handleDelete(author.idAuthor)
                                            }
                                            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ListViewAuthors;
