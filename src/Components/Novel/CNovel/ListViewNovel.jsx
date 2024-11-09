import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovels } from '@/Redux/ReduxSlice/novelSlice';

const TABLE_HEADS = [
    'id_Novel',
    'name_Novel',
    'description_Novel',
    'status_Novel',
    'file',
    'action',
];

function ProductList() {
    const dispatch = useDispatch();
    const { novels, loading, error } = useSelector((state) => state.novel);

    useEffect(() => {
        dispatch(fetchNovels());
    }, [dispatch]);

    return (
        <div>
            <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
                <div className="mb-3">
                    <h4 className="text-[18px] text-sky-400">Novel</h4>
                </div>
                {/* Displaying loading or error state */}
                {loading && (
                    <div className="text-center text-blue-500">Loading...</div>
                )}
                {error && (
                    <div className="text-center text-red-500">
                        Error: {error}
                    </div>
                )}
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
                            {novels?.map((novel) => (
                                <tr key={novel.idNovel}>
                                    <td className="px-3 py-3">
                                        {novel.idNovel}
                                    </td>
                                    <td className="px-3 py-3">
                                        {novel.nameNovel}
                                    </td>
                                    <td className="px-3 py-3">
                                        {novel.descriptionNovel}
                                    </td>
                                    <td className="px-3 py-3">
                                        {novel.statusNovel}
                                    </td>
                                    <td className="px-3 py-3">
                                        <img
                                            src={novel.imageNovel}
                                            alt={`Novel ${novel.idNovel}`}
                                            className="w-20 h-auto"
                                        />
                                    </td>
                                    <td className="px-3 py-3">
                                        {' '}
                                        {/* Placeholder for action column */}
                                        {/* Add any action buttons or links here */}
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

export default ProductList;
